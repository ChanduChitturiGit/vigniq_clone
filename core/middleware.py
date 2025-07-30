# core/middleware.py
import threading
import logging

from django.conf import settings
from django.http import JsonResponse

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

from school.models import School

from core.common_modules.db_loader import DbLoader

# Flag to ensure dynamic DBs are loaded once
_db_initialized = threading.Event()

# Thread-local storage for request-scoped DB name
_db_context = threading.local()

def set_current_db(db_name):
    _db_context.db = db_name

def get_current_db():
    return getattr(_db_context, 'db', None)

class LoadDynamicDatabasesMiddleware:
    """
    Middleware to load all dynamic databases once at server startup.
    Should be placed high in the middleware order.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not _db_initialized.is_set():
            try:
                DbLoader().load_databases()
                _db_initialized.set()
            except Exception as e:
                logging.error(f"[DB INIT ERROR] Failed to load dynamic DBs: {e}")
                return JsonResponse({"error": "Internal server error during DB setup."}, status=500)

        return self.get_response(request)

                

class AuthenticationMiddleware:
    """
    Middleware to set current DB context based on authenticated user's school.
    Should be placed after authentication middleware.
    """
    def __init__(self, get_response):
        self.get_response = get_response

        self.exempt_paths = [
            "/",
            "/assets/",
            "/static/",
            "/favicon.ico",
            "/auth/login/",
            "/auth/token/refresh/",
            "/core/password_manager/reset_password",
            "/core/password_manager/verify_otp"
        ]

    def is_exempt(self, path):
        return (
            path in self.exempt_paths
            or path.startswith("/assets/")
            or path.startswith("/static/")
            or path == "/favicon.ico"
        )

    def __call__(self, request):
        path = request.path

        if self.is_exempt(path):
            return self.get_response(request)

        jwt_auth = JWTAuthentication()
        try:
            user_auth_tuple = jwt_auth.authenticate(request)
            if user_auth_tuple is None:
                return JsonResponse({"error": "Authentication credentials were not provided or are invalid."}, status=401)

            user, _ = user_auth_tuple
            request.user = user

            if not user.is_superuser:
                if not hasattr(user, 'school_id') or user.school_id is None:
                    return JsonResponse({"error": "User is not associated with any school. Please contact support."}, status=400)
                
                # school_id = user.school_id
                # school = School.objects.filter(id=school_id).first()

                # if not school:
                #     return JsonResponse({"error": "School not found."}, status=400)

                # db_name = f"{school.name.lower().replace(' ', '_')}_{school.id}_db"
                # set_current_db(db_name)

        except InvalidToken as e:
            return JsonResponse({"error":"Invalid or expired token. Please log in again."}, status=401)
        except AuthenticationFailed as e:
            return JsonResponse({"error": f"Authentication failed: {str(e)}"}, status=401)

        response = self.get_response(request)
        # set_current_db(None)
        return response

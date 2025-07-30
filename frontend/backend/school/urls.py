from django.urls import path
from .views import SchoolActionView

urlpatterns = [
    path('manage_school/<str:action>', SchoolActionView.as_view(), name='school_action'),
]

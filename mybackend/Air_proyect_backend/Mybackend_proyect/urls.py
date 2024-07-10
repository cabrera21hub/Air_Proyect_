from django.urls import path
from .views import CalidadAireView

urlpatterns = [
    path('calidad_aire/<str:date>/', CalidadAireView.as_view(), name='calidad_aire'),
]

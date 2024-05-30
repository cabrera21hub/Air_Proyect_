from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AirQualityViewSet

router = DefaultRouter()
router.register(r'airquality', AirQualityViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

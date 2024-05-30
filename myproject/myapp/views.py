from rest_framework import viewsets
from .models import AirQuality
from .serializers import AirQualitySerializer

class AirQualityViewSet(viewsets.ModelViewSet):
    queryset = AirQuality.objects.all()
    serializer_class = AirQualitySerializer

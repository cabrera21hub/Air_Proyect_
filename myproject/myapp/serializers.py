from rest_framework import serializers
from .models import AirQuality

class AirQualitySerializer(serializers.ModelSerializer):
    class Meta:
        model = AirQuality
        fields = '__all__'

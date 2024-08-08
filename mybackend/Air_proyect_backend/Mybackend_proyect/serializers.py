# serializers.py
from rest_framework import serializers
from .models import CalidadAire

class CalidadAireSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalidadAire
        fields = ['fecha', 'real_pm25', 'predicted_pm25']
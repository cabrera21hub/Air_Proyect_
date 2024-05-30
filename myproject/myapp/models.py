from django.db import models

class AirQuality(models.Model):
    location = models.CharField(max_length=100)
    pm25 = models.FloatField()
    pm10 = models.FloatField()
    no2 = models.FloatField()
    o3 = models.FloatField()
    co = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.location)

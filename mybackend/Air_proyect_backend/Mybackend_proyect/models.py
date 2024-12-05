from django.db import models

class CalidadAire(models.Model):
    fecha = models.DateField()
    real_pm25 = models.FloatField()
    predicted_pm25 = models.FloatField()

    def __str__(self):
        return f"{self.fecha} - Real: {self.real_pm25}, Predicha: {self.predicted_pm25}"

# urls.py

from django.urls import path
from .views import CalidadAireView, HistoricalDataView

urlpatterns = [
    path('calidad_aire/<str:date>/', CalidadAireView.as_view(), name='calidad_aire'),
    path('historical_data/<int:year>/', HistoricalDataView.as_view(), name='historical_data'),
]

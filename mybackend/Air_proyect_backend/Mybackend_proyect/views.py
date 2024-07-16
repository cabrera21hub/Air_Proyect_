# views.py

import os
import joblib
from django.http import JsonResponse
from rest_framework.views import APIView
import pandas as pd

class CalidadAireView(APIView):
    def get(self, request, date, format=None):
        try:
            base_dir = os.path.dirname(__file__)
            model_path = os.path.join(base_dir, 'models', 'modelo_entrenado.pkl')
            scaler_path = os.path.join(base_dir, 'models', 'scaler.pkl')
            csv_path = os.path.join(base_dir, 'models', 'predicciones_completas.csv')
            
            print(f"Model path: {model_path}")
            print(f"Scaler path: {scaler_path}")
            print(f"CSV path: {csv_path}")

            if not os.path.exists(model_path):
                return JsonResponse({'error': 'Model file not found: ' + model_path})
            if not os.path.exists(scaler_path):
                return JsonResponse({'error': 'Scaler file not found: ' + scaler_path})
            if not os.path.exists(csv_path):
                return JsonResponse({'error': 'CSV file not found: ' + csv_path})

            model = joblib.load(model_path)
            scaler = joblib.load(scaler_path)

            data = pd.read_csv(csv_path)
            data['Fecha'] = pd.to_datetime(data['Fecha'], format="%Y-%m-%d", errors='coerce')
            
            print("Data loaded and converted successfully")
            print(data.head())
            print(data.dtypes)

            try:
                date = pd.to_datetime(date, format="%Y-%m-%d")
                print(f"Converted date: {date}")
            except ValueError as ve:
                return JsonResponse({'error': f"Invalid date format: {date}. Error: {str(ve)}"})

            df = data[data['Fecha'] == date]
            print(f"Filtered data: {df}")

            if not df.empty:
                fecha = pd.Timestamp(df['Fecha'].values[0])
                result = {
                    'fecha': fecha.strftime("%Y-%m-%d"),
                    'predicted_pm25': df['Predicción_PM2.5'].values[0]
                }
            else:
                result = {'error': 'No data available for this date'}
        except Exception as e:
            result = {'error': str(e)}

        return JsonResponse(result)


class HistoricalDataView(APIView):
    def get(self, request, year, format=None):
        try:
            base_dir = os.path.dirname(__file__)
            csv_path = os.path.join(base_dir, 'models', 'predicciones_completas.csv')

            if not os.path.exists(csv_path):
                return JsonResponse({'error': 'CSV file not found: ' + csv_path})

            data = pd.read_csv(csv_path)
            data['Fecha'] = pd.to_datetime(data['Fecha'], errors='coerce')
            data = data[data['Fecha'].dt.year == year]

            # Filtrar solo las columnas de interés
            data = data[['Fecha', 'Predicción_PM2.5']]

            data_json = data.to_json(orient='records', date_format='iso')
            return JsonResponse(data_json, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)})
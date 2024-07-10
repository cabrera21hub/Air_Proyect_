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
            csv_path = os.path.join(base_dir, 'models', 'predicciones_2024.csv')
            
            # Imprimir rutas para depuración
            print(f"Model path: {model_path}")
            print(f"Scaler path: {scaler_path}")
            print(f"CSV path: {csv_path}")

            # Verificar si los archivos existen
            if not os.path.exists(model_path):
                return JsonResponse({'error': 'Model file not found: ' + model_path})
            if not os.path.exists(scaler_path):
                return JsonResponse({'error': 'Scaler file not found: ' + scaler_path})
            if not os.path.exists(csv_path):
                return JsonResponse({'error': 'CSV file not found: ' + csv_path})

            # Cargar modelo y escalador
            model = joblib.load(model_path)
            scaler = joblib.load(scaler_path)

            data = pd.read_csv(csv_path)
            data['Fecha'] = pd.to_datetime(data['Fecha'], format="%Y-%m-%d")
            
            print("Data loaded and converted successfully")
            print(data.head())
            print(data.dtypes)

            # Verificar y convertir la fecha del parámetro de la URL a datetime
            try:
                date = pd.to_datetime(date, format="%Y-%m-%d")
                print(f"Converted date: {date}")
            except ValueError as ve:
                return JsonResponse({'error': f"Invalid date format: {date}. Error: {str(ve)}"})

            # Filtrar la fecha en el DataFrame
            df = data[data['Fecha'] == date]
            print(f"Filtered data: {df}")

            if not df.empty:
                # Convertir fecha a pandas.Timestamp para usar strftime
                fecha = pd.Timestamp(df['Fecha'].values[0])
                result = {
                    'fecha': fecha.strftime("%Y-%m-%d"),
                    'predicted_pm25': df['Predicted_PM2.5'].values[0]
                }
            else:
                result = {'error': 'No data available for this date'}
        except Exception as e:
            result = {'error': str(e)}

        return JsonResponse(result)

FROM python:3.11-slim

# Ustawiamy folder roboczy
WORKDIR /app

# Instalujemy zależności systemowe potrzebne dla Postgresa
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Kopiujemy i instalujemy biblioteki Pythona
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiujemy resztę kodu
COPY . .

# Odpalamy serwer z przeładowywaniem kodu na żywo (reload)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
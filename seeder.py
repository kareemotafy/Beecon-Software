import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime, timedelta
import random

# Initialize Firebase/ Firestore
cred = credentials.Certificate("")  
firebase_admin.initialize_app(cred)
db = firestore.client()

# Variables
warmer_months_range = [4, 9] # April to September
humidity_soft_transition_limit = 5
temperature_soft_transition_limit = 1

# generating timestamps for the past year once every hour
def generate_hourly_timestamps():
    now = datetime.now()
    timestamps = []
    for i in range(24*365):  
        timestamp = now - timedelta(hours=i)
        timestamps.append(timestamp)
    return timestamps

timestamps = generate_hourly_timestamps()

# Ranges [0] for warmer months and [1] for colder months
# min_value and max_value [0] and [1] respectively
def generate_values(timestamp, previous_value, soft_transition_limit, ranges):
    month = timestamp.month
    if  warmer_months_range[0] <= month <= warmer_months_range[1]:  
        min_value = max(previous_value - soft_transition_limit, ranges[0][0])
        max_value = min(previous_value + soft_transition_limit, ranges[0][1])
        return random.randint(min_value, max_value)
    else:
        min_value = max(previous_value - soft_transition_limit, ranges[1][0])
        max_value = min(previous_value + soft_transition_limit, ranges[1][1])
        return random.randint(min_value, max_value)

# Functions to seed humidity/ temperature data based on 
# average beehive readings found in papers
# soft scaling implemented to ensure smooth transitions between values
def seed_humidity_data():
    previous_humidity = 0
    sensors_ref = db.collection("sensors")
    humidity_ref = sensors_ref.document("humidity").collection("data")
    for timestamp in timestamps:
        current_humidity = generate_values(timestamp, previous_humidity, humidity_soft_transition_limit, [[80, 95], [60, 75]]) 
        humidity_ref.add({
            "timestamp": timestamp,
            "value": current_humidity
        })
        previous_humidity = current_humidity

def seed_temperature_data():
    previous_temperature = 0
    sensors_ref = db.collection("sensors")
    temperature_ref = sensors_ref.document("temperature").collection("data")
    for timestamp in timestamps:
        current_temperature = generate_values(timestamp, previous_temperature, temperature_soft_transition_limit, [[30, 36], [28, 32]])
        temperature_ref.add({
            "timestamp": timestamp,
            "value": current_temperature
        })
        previous_temperature = current_temperature


#Begin Seeder
seed_temperature_data()

print("Humidity and temperature data seeded successfully!")

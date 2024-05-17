from google.cloud.firestore_v1 import DocumentReference
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime, timedelta
import random
from concurrent.futures import ThreadPoolExecutor


start_time = datetime.now()

cred = credentials.Certificate('./serviceAccountKey.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
  'databaseURL':
    "https://iotbeehive-9e6e7-default-rtdb.europe-west1.firebasedatabase.app",
})

# Initialize Firebase/ Firestore
db = firestore.client()

# def clear_collection(collection):
#     docs = collection.stream()
#     for doc in docs:
#         doc.reference.delete()
    
# def clear_all_collections():
#     sensors_ref = db.collection("sensors")
#     humidity_ref = sensors_ref.document("humidity").collection("data")
#     temperature_ref = sensors_ref.document("temperature").collection("data")
#     weight_ref = sensors_ref.document("weight").collection("data")
#     clear_collection(humidity_ref)
#     clear_collection(temperature_ref)
#     clear_collection(weight_ref)
#     print("All collections cleared successfully!")

#TODO: switch to classes 
#TODO: account for hour variance in data
# Variables
warmer_months_range = [4, 9] # April to September

humidity_soft_transition_limit = 5
temperature_soft_transition_limit = 1
weight_soft_transition_limit = 300

humidity_warm_range = [80, 95]
humidity_cold_range = [60, 75]
temperature_warm_range = [30, 36]
temperature_cold_range = [28, 32]
weight_warm_range = [0, 13000]
weight_cold_range = [7000, 16000]

days_to_seed = 30

# generating timestamps for the past year once every hour
def generate_timestamps(hour_factor = 1):
    now = datetime.now()
    timestamps = []
    for i in range(24*days_to_seed*hour_factor):  
        timestamp = now - timedelta(hours=i)
        timestamps.append(timestamp)
    return timestamps

hourly_timestamps = generate_timestamps()
every_ten_min_timestamps = generate_timestamps(6)

# Ranges [0] for warmer months and [1] for colder months
# min_value and max_value [0] and [1] respectively
def generate_values(timestamp, previous_value, soft_transition_limit, ranges):
    month = timestamp.month

    if previous_value is None:
        return random.randint(ranges[0][0], ranges[0][1])

    if  warmer_months_range[0] <= month <= warmer_months_range[1]:  
        min_value = max(previous_value - soft_transition_limit, ranges[0][0])
        max_value = min(previous_value + soft_transition_limit, ranges[0][1])
        return random.randint(min_value, max_value)
    
    min_value = max(previous_value - soft_transition_limit, ranges[1][0])
    max_value = min(previous_value + soft_transition_limit, ranges[1][1])
    return random.randint(min_value, max_value)
    
# Functions to seed humidity/ temperature data based on 
# average beehive readings found in papers
# soft scaling implemented to ensure smooth transitions between values
def seed_humidity_data():
    print("Seeding humidity data...\n")
    previous_humidity = None
    sensors_ref = db.collection("sensors")
    humidity_ref = sensors_ref.document("humidity").collection("data")
    humidity_range = [humidity_warm_range, humidity_cold_range]
    for timestamp in hourly_timestamps:
        current_humidity = generate_values(timestamp, previous_humidity, humidity_soft_transition_limit, humidity_range) 
        humidity_ref.add({
            "timestamp": timestamp,
            "value": current_humidity
        })
        previous_humidity = current_humidity


def seed_temperature_data():
    print("Seeding temperature data...\n")
    previous_temperature = None
    sensors_ref = db.collection("sensors")
    temperature_ref = sensors_ref.document("temperature").collection("data")
    temp_range = [temperature_warm_range, temperature_cold_range]
    for timestamp in hourly_timestamps:
        current_temperature = generate_values(timestamp, previous_temperature, temperature_soft_transition_limit, temp_range)
        temperature_ref.add({
            "timestamp": timestamp,
            "value": current_temperature
        })
        previous_temperature = current_temperature



def seed_weight_data():
    print("Seeding weight data...\n")
    previous_weight = None
    sensors_ref = db.collection("sensors")
    weight_ref = sensors_ref.document("weight").collection("data")
    weight_range = [weight_warm_range, weight_cold_range]
    for timestamp in every_ten_min_timestamps:
        current_weight = generate_values(timestamp, previous_weight, weight_soft_transition_limit, weight_range)
        weight_ref.add({
            "timestamp": timestamp,
            "value": current_weight
        })
        previous_weight = current_weight   


# Begin Seeder
# clear_all_collections()
with ThreadPoolExecutor(max_workers=3) as executor:
    executor.submit(seed_temperature_data)
    executor.submit(seed_humidity_data)
    executor.submit(seed_weight_data)


endtime = datetime.now()
print(f"Data seeding completed! {len(hourly_timestamps) * 2 + len(every_ten_min_timestamps)} documents added to Firestore in {endtime - start_time} seconds.")


# validate document count
sensors_ref = db.collection("sensors")
humidity_ref = sensors_ref.document("humidity").collection("data")
temperature_ref = sensors_ref.document("temperature").collection("data")
weight_ref = sensors_ref.document("weight").collection("data")

print(f"Seeded {len(list(humidity_ref.stream()))} humidity entries")
print(f"Seeded {len(list(temperature_ref.stream()))} temperature entries")
print(f"Seeded {len(list(weight_ref.stream()))} weight entries")



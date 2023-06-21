import json
import urllib.request

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

with urllib.request.urlopen(url) as response:
    json_data = response.read().decode()

data = json.loads(json_data)

min_magnitude = float('inf')
max_magnitude = float('-inf')

for feature in data['features']:
    magnitude = feature['properties']['mag']
    if magnitude < min_magnitude:
        min_magnitude = magnitude
    if magnitude > max_magnitude:
        max_magnitude = magnitude

print("Minimum Magnitude:", min_magnitude)
print("Maximum Magnitude:", max_magnitude)

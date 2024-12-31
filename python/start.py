import requests
import csv
import os

OUTPUT_DIR = "output"
QUERY_DATE = "31-12-2024"  # DD-MM-YYYY format
base_url = (
    "https://app-apdapi-prod-southeastasia-01.azurewebsites.net/results/past/latest-before/"
    + QUERY_DATE
    + "/9"
)

response = requests.get(base_url)
json_rep = dict(response.json())


past_results = json_rep["PastResultsRange"]["PastResults"]
headers = past_results[0].keys()

print(headers)

if not os.path.exists(OUTPUT_DIR):
    os.mkdir(OUTPUT_DIR)

with open(os.path.join(OUTPUT_DIR, QUERY_DATE + "-data.csv"), "w") as csvfile:
    # force quoting to wrap numbers as winning numbers can begin with 0 resulting
    # in undesired int-conversion by csv processors
    writer = csv.writer(csvfile, quoting=csv.QUOTE_ALL)
    writer.writerow(headers)
    for result in past_results:
        writer.writerow(result.values())

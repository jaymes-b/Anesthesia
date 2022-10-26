import requests
import json

class Airtable:
    def __init__(self):
        api_key = "put api key here"
        self.headers = {"Authorization": "Bearer " + api_key}
        self.table_names = ["body-part", "block", "surgery", "references", "surgeon-preference", "keywords", "surgeon"]
        self.base_id = "shrPk12YITH9VeP7j"
        self.url = "https://api.airtable.com/v0/" + self.base_id

    def getData(self): #returns data in form of a json
        response = requests.get(self.url, headers=self.headers)
        data = response.json()
        with open("airtable_data.txt", "w") as json_file:
            json_file.write(data)
        return data

    
if __name__ == "__main__":
    airtable = Airtable()
    print(airtable.getData())

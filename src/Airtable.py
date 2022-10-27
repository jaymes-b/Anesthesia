import requests
import json

class Airtable:
    def __init__(self):
        api_key = "key46Xfxr0liGO20W"
        self.headers = {"Authorization": "Bearer " + api_key}
        self.table_names = ["body-part", "block", "surgery", "references", "surgeon-preference", "keywords", "surgeon"]
        self.base_id = "appskv3EhFA9Bt8T7"
        self.url = "https://api.airtable.com/v0/" + self.base_id + "/" + self.table_names[1]

    def getData(self): #returns data in form of a json
        response = requests.get(self.url, headers=self.headers)
        data = response.json()
        return data

    
if __name__ == "__main__":
    airtable = Airtable()
    print(airtable.getData())

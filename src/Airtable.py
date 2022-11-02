import requests
import json

class Airtable:
    def __init__(self):
        api_key = "key46Xfxr0liGO20W"
        self.headers = {"Authorization": "Bearer " + api_key}
        self.table_names = ["body-part", "block", "surgery", "references", "surgeon-preference", "keywords", "surgeon"]
        self.base_id = "app96HBB0IV295BWj"
        self.url = "https://api.airtable.com/v0/" + self.base_id + "/"

    def getData(self): #returns data in form of a json
        url = self.url + self.table_names[0]
        response = requests.get(url, headers=self.headers)
        data = response.json()
        with open("airtable_data.txt", "w") as json_file:
            json_file.write(str(data))
        return data #returns json file

    def getBlocks(self): #returns all blocks 
        url = self.url + self.table_names[1]
        response = requests.get(url, headers=self.headers)
        data = response.json()
        return data #returns json file


    def getSurgeries(self): #returns all surgeries
        url = self.url + self.table_names[2]
        response = requests.get(url, headers=self.headers)
        data = response.json()
        return data #returns json file

    def getSurgeriesByQuery(self, query):
        output = {} #return type must be a dict
        output_rows = []
        surgery_json = self.getSurgeries() #returns json file 
        table_rows = surgery_json["records"]
        for row in table_rows:
            column_data = row["fields"]
            if query in column_data["Name"]:
                output_rows.append(column_data)
        output["rows"] = output_rows
        return output #return dictionary {rows: []}

    def getSurgeryByKey(self, key):
        key = key.lower()
        output = {} #return type must be a dict
        output_rows = []
        surgery_json = self.getSurgeries() #returns json file 
        table_rows = surgery_json["records"]
        for row in table_rows:
            column_data = row["fields"]
            if key in column_data["Name"]:
                output_rows.append(column_data)
        output["rows"] = output_rows
        return output #return dictionary {rows: []}

    def getBlocksbyBodyPart(self, body_part):
        output = {} #return type must be a dict
        output_rows = []
        surgery_json = self.getBlocks() #returns json file 
        table_rows = surgery_json["records"]
        for row in table_rows:
            column_data = row["fields"]
            if body_part in column_data["Name (from body-part)"]:
                output_rows.append(column_data)
        output["rows"] = output_rows
        return output #return dictionary {rows: []}
    
    def getBlocksbyQuery(self, query):
        return


    
if __name__ == "__main__":
    airtable = Airtable()
    print(airtable.getBlocks())

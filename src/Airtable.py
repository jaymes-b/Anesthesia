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
        surgeries_json = self.getSurgeries()
        table_rows = surgeries_json["records"]
        found = False
        for row in table_rows:
            found = False
            column_data = row["fields"]
            if "Name" in column_data:
                if query in column_data["Name"]:
                    output_rows.append(column_data)
                    print(query, column_data["Name"])
                    continue
            if "Name (from surgeries)" in column_data:
                for surgery_name in column_data["Name (from surgeries)"]:
                    if query in surgery_name:
                        output_rows.append(column_data)
                        print(query, column_data["Name (from surgeries)"])
                        found = True
                        break
            if found:
                continue
            if "Name (from body-part)" in column_data:
                for body_part in column_data["Name (from body-part)"]:
                    if query in body_part:
                        output_rows.append(column_data)
                        print(query, column_data["Name (from body-part)"])
                        break
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
        output = {} #return type must be a dict
        output_rows = []
        blocks_json = self.getBlocks()
        table_rows = blocks_json["records"]
        found = False
        for row in table_rows:
            found = False
            column_data = row["fields"]
            if "Name" in column_data:
                if query in column_data["Name"]:
                    output_rows.append(column_data)
                    print(query, column_data["Name"])
                    continue
            if "Name (from surgeries)" in column_data:
                for surgery_name in column_data["Name (from surgeries)"]:
                    if query in surgery_name:
                        output_rows.append(column_data)
                        print(query, column_data["Name (from surgeries)"])
                        found = True
                        break
            if found:
                continue
            if "Name (from body-part)" in column_data:
                for body_part in column_data["Name (from body-part)"]:
                    if query in body_part:
                        output_rows.append(column_data)
                        print(query, column_data["Name (from body-part)"])
                        break
        output["rows"] = output_rows
        return output #return dictionary {rows: []}




    
if __name__ == "__main__":
    airtable = Airtable()
    # print(airtable.getBlocksbyQuery("knee"))
    print(airtable.getSurgeriesByQuery("knee"))
    # airtable.getBlocksbyQuery("knee")
    # print(airtable.getBlocks())

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

    def getSurgeons(self): #returns names of surgeons
        url = self.url + self.table_names[6]
        response = requests.get(url, headers=self.headers)
        data = response.json()
        return data #returns json file

    def getSurgeonNames(self): #parses for a list of surgeon names
        output = {}
        names = []
        data = self.getSurgeons()
        table_rows = data["records"]
        for row in table_rows:
            column_data = row["fields"]
            if "Name" in column_data:
                name = column_data["Name"]
                names.append(name)
        output["surgeon_names"] = names
        return output

    def getBlockNames(self): #returns the names of all blocks
        output = {}
        block_names = []
        data = self.getSurgeons()
        table_rows = data["records"]
        for row in table_rows:
            column_data = row["fields"]
            if "Name" in column_data:
                name = column_data["Name"]
                block_names.append(name)
        output["surgeon_names"] = block_names
        return output

    def getSurgereonPreferences(self):
        url = self.url + self.table_names[4]
        response = requests.get(url, headers=self.headers)
        data = response.json()
        output = {} #return type must be a dict
        output_rows = []
        table_rows = data["records"]
        for row in table_rows:
            column_data = row["fields"]
            output_rows.append(column_data)
        output["rows"] = output_rows
        # print(type(output["rows"][0]["Index"]))
        return output #returns json file

    def getSurgeriesByQuery(self, query):
        query = query.lower()
        output = {} #return type must be a dict
        output_rows = []
        surgeries_json = self.getSurgeries()
        table_rows = surgeries_json["records"]
        found = False
        for row in table_rows:
            found = False
            column_data = row["fields"]
            if "Name" in column_data:
                if query in column_data["Name"].lower():
                    output_rows.append(column_data["Name"])
                    # print(query, column_data["Name"])
                    continue
            if "Name (from surgeries)" in column_data:
                for surgery_name in column_data["Name (from surgeries)"]:
                    if query in surgery_name.lower():
                        output_rows.append(column_data["Name"])
                        # print(query, column_data["Name (from surgeries)"])
                        found = True
                        break
            if found:
                continue
            if "Name (from body-part)" in column_data:
                for body_part in column_data["Name (from body-part)"]:
                    if query in body_part.lower():
                        output_rows.append(column_data["Name"])
                        # print(query, column_data["Name (from body-part)"])
                        found = True
                        break
            if found:
                continue
            if "Name (from keywords)" in column_data:
                for keyword in column_data["Name (from keywords)"]:
                    if query in keyword.lower():
                        output_rows.append(column_data["Name"])
                        # print(query, column_data["Name (from body-part)"])
                        found = True
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
            if ("Name" in column_data) and (key in column_data["Name"].lower()):
                output_rows.append(column_data)
        output["rows"] = output_rows
        return output #return dictionary {rows: []}

    def getBlocksbyBodyPart(self, body_part):
        body_part = body_part.lower()
        output = {} #return type must be a dict
        output_rows = []
        surgery_json = self.getBlocks() #returns json file 
        table_rows = surgery_json["records"]
        for row in table_rows:
            column_data = row["fields"]
            if body_part in column_data["Name (from body-part)"].lower():
                output_rows.append(column_data)
        output["rows"] = output_rows
        return output #return dictionary {rows: []}

    def getBlocksbySurgeon(self, surgeon_name):
        pass
    
    def getBlocksbyQuery(self, query):
        query = query.lower()
        output = {} #return type must be a dict
        output_rows = []
        blocks_json = self.getBlocks()
        table_rows = blocks_json["records"]
        found = False
        for row in table_rows:
            found = False
            column_data = row["fields"]
            if "Name" in column_data:
                if query in column_data["Name"].lower():
                    output_rows.append(column_data["Name"])
                    # print(query, column_data["Name"])
                    continue
            if "Name (from surgeries)" in column_data:
                for surgery_name in column_data["Name (from surgeries)"]:
                    if query in surgery_name.lower():
                        output_rows.append(column_data["Name"])
                        # print(query, column_data["Name (from surgeries)"])
                        found = True
                        break
            if found:
                continue
            if "Name (from body-part)" in column_data:
                for body_part in column_data["Name (from body-part)"]:
                    if query in body_part.lower():
                        output_rows.append(column_data["Name"])
                        # print(query, column_data["Name (from body-part)"])
                        found = True
                        break
            if found:
                continue
            if "Name (from keywords)" in column_data:
                for keyword in column_data["Name (from keywords)"]:
                    if query in keyword.lower():
                        output_rows.append(column_data["Name"])
                        # print(query, column_data["Name (from body-part)"])
                        found = True
                        break
        output["rows"] = output_rows
        return output #return dictionary {rows: []}

    def getSurgeonNamesByQuery(self, query):
        output_dict = {}
        output_names = []
        query = query.lower()
        surgeon_names = self.getSurgeonNames()["surgeon_names"]
        for name in surgeon_names:
            if query in name:
                output_names.append(name)
        output_dict["surgeon_names"] = output_names
        return output_dict

    def getBlockNamesBySurgeon(self, surgeon_name):
        surgeon_name = surgeon_name.lower()
        output_dict = dict()
        output_blocks = set()
        data = self.getSurgereonPreferences()
        table_rows = data["rows"]
        for row in table_rows:
            if "surgeon-name" in row and surgeon_name in row["surgeon-name"].lower():
                if "Name (from block)" in row:
                    block_names = row["Name (from block)"]
                    for block_name in block_names:
                        block_name.strip()
                        output_blocks.add(block_name)
        output_dict["block_names"] = list(output_blocks)
        return output_dict


    def getSurgeryNamesBySurgeon(self, surgeon_name):
        surgeon_name = surgeon_name.lower()
        output_dict = dict()
        output_surgeries= set()
        data = self.getSurgereonPreferences()
        table_rows = data["rows"]
        for row in table_rows:
            if "surgeon-name" in row and surgeon_name in row["surgeon-name"].lower():
                if "Name (from surgery)" in row:
                    surgery_names = row["Name (from surgery)"]
                    for surgery_name in surgery_names:
                        surgery_name.strip()
                        output_surgeries.add(surgery_name)
        output_dict["surgery_names"] = list(output_surgeries)
        return output_dict





        





    
if __name__ == "__main__":
    airtable = Airtable()
    # print(airtable.getBlocksbyQuery("knee"))
    print(airtable.getSurgeryNamesBySurgeon("Dean"))
    # airtable.getBlocksbyQuery("knee")
    # print(airtable.getBlocks())

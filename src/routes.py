from flask import Flask, request
from flask_cors import CORS
from Airtable import *
import json


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
airtable = Airtable()

@app.route("/")
def handle_start():
    return "hello"

@app.route("/api/home") #returns list of available surgeries for the home page
def handle_home():
    surgery_names = {}
    surgeries_list = []
    surgery_json =  airtable.getSurgeries()
    table_rows = surgery_json["records"]
    for row in table_rows:
        column_data = row["fields"]
        if "Name" in column_data:
            surgeries_list.append(column_data["Name"])
    surgery_names["surgeries"] = surgeries_list
    return surgery_names


@app.route("/api/surgeons") #returns list of available surgeries for the home page
def handle_surgeons():
    return airtable.getSurgeonNames()

@app.route("/api/blocks") #returns list of available surgeries for the home page
def handle_blocks():
    return airtable.getBlockNames()


@app.route('/api/search') # returns both names of blocks and surgeries relevant to query
def handle_search():
    output = {}
    query = request.args.get("query") #query = knee
    output["surgeries_data"] = airtable.getSurgeriesByQuery(query)
    output["blocks_data"] = airtable.getBlocksbyQuery(query)
    output["surgeons_data"] = airtable.getSurgeonNamesByQuery(query)
    return output

@app.route('/api/search/surgeon') # returns both names of blocks and surgeries basedo n surgeon name
def handle_surgeon_name():
    output = {}
    surgeon_name = request.args.get("surgeonName")
    output["block_names"] = airtable.getBlockNamesBySurgeon(surgeon_name)
    output["surgery_names"] = airtable.getSurgeryNamesBySurgeon(surgeon_name)
    return output

@app.route('/api/surgery') #handles getting surgery details
def handle_surgery():
    surgery_name = request.args.get("surgeryName") #SurgeryName = knee ACL repair
    surgery_data = airtable.getSurgeryByKey(surgery_name)
    surgeron_prefs = airtable.getSurgeonPreferences()
    refs_rows = airtable.getReferenceRows()
    for i in range(len(surgery_data["rows"])):
        print("starting rows loop")
        row = surgery_data["rows"][i]
        if ("Name (from references)" in row) and ("Name (from block)" in row):
            blocks = surgery_data["rows"][i]["Name (from block)"]
            references = surgery_data["rows"][i]["Name (from references)"]
            temp_list = []
            for i in range(len(references)):
                temp_list.append(blocks[i])
                temp_list.append(references[i])
                for row in refs_rows["rows"]:
                    if references[i] in row["Name"]:
                        temp_list.append(row["URL"])
            surgery_data["rows"][i]["linked_references"] = temp_list
        else:
            surgery_data["rows"][i]["linked_references"] = []
        if "surgeon-preference-text" in row:
            preferences = [] #list of preference indexes
            for char in row["surgeon-preference-text"]:
                if char.isnumeric():
                    preferences.append(int(char))
            print("going into prefere")
            #compiles list of preferences for surgeries
            for pref_index in preferences:
                print(pref_index)
                for surgeon_pref_row in surgeron_prefs["rows"]:
                    if surgeon_pref_row["Index"] == pref_index:
                        if "surgeon-pref-data" not in surgery_data["rows"][i]:
                            surgery_data["rows"][i]["surgeon-pref-data"] = []
                        surgery_data["rows"][i]["surgeon-pref-data"].append(surgeon_pref_row) #matches them with surgeon preference rows 
    # for i in range(len(surgery_data["rows"])):
    #     row = surgery_data["rows"][i]

    return surgery_data 



    

@app.route('/api/block') #handles bodypart --> block, only returns blocks
def handle_block():
    block_name = request.args.get("BlockName") #query = knee
    return airtable.getsBlocksByName(block_name)



if __name__ == "__main__":
    app.run()
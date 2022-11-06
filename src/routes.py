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

@app.route("/api/home")
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


@app.route('/api/search') # returns both names of blocks and surgeries relevant to query
def handle_search():
    output = {}
    query = request.args.get("query").lower() #query = knee
    output["surgeries_data"] = airtable.getSurgeriesByQuery(query)
    output["blocks_data"] = airtable.getBlocksbyQuery(query)
    return output

@app.route('/api/surgery') #handles getting surgery details
def handle_surgery():
    surgery_name = request.args.get("surgeryName").lower() #SurgeryName = knee ACL repair
    return airtable.getSurgeryByKey(surgery_name)

@app.route('/api/block') #handles bodypart --> block, only returns blocks
def handle_block():
    body_part = request.args.get("bodyPart").lower() #query = knee
    return airtable.getBlocksbyBodyPart(body_part)



if __name__ == "__main__":
    app.run(host='0.0.0.0')
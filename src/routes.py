from flask import Flask, request
from Airtable import *
import json


app = Flask(__name__)
airtable = Airtable()

@app.route("/")
def handle_home():
    return "hello"

@app.route('/search')
def handle_search():
    query = request.args.get("query") #query = knee
    return airtable.getDataByQuery(query)

@app.route('/surgery')
def handle_surgery():
    surgery_name = request.args.get("surgeryName") #SurgeryName = knee ACL repair
    return airtable.getSurgeryByKey(surgery_name)

@app.route('/block')
def handle_block():
    body_part = request.args.get("block") #query = knee
    return airtable.getSurgeryByBlock(body_part)



if __name__ == "__main__":
    app.run()
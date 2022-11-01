from flask import Flask, request
from Airtable import *
import json


app = Flask(__name__)
airtable = Airtable()

@app.route("/")
def handle_home():
    return "hello"

@app.route('/search') # returns both blocks and surgeries
def handle_search():
    output = {}
    query = request.args.get("query") #query = knee
    return airtable.getSurgeriesByQuery(query)

@app.route('/surgery') #handles getting surgery details
def handle_surgery():
    surgery_name = request.args.get("surgeryName") #SurgeryName = knee ACL repair
    return airtable.getSurgeryByKey(surgery_name)

@app.route('/block') #handles bodypart --> block, only returns blocks
def handle_block():
    body_part = request.args.get("bodyPart") #query = knee
    return airtable.getBlocksbyBodyPart(body_part)



if __name__ == "__main__":
    app.run()
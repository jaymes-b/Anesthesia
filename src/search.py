from flask import Flask
import request

app = Flask(__name__)


@app.route('/search')
def hello():
    query = request.args.get("query")
    
# Import necessary modules
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

# Initialize Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for allowing communication between different domains
CORS(app)

# Default route for the root URL
@app.route('/')
def index():
    # Returns a simple message when someone visits the root URL
    return 'Hello World'

# Route for getting access token via POST request
@app.route('/api/token', methods=['POST'])
def get_access_token():

    ## Get request parameter arguments. Not used in this method but placed here for example purposes.
    # arguments = request.args.get(<paramenter>)

    # Retrieve sensitive information (like client ID and secret) from environment variables
    client_id = os.getenv('VITE_DISCORD_CLIENT_ID')
    client_secret = os.getenv('DISCORD_CLIENT_SECRET')

    # Send a POST request to Discord API to get access token
    response = requests.post('https://discord.com/api/oauth2/token', data={
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'authorization_code',
        'code': request.json['code']  # Retrieve authorization code from the request
    })

    # Return the access token extracted from the response in JSON format
    return response.json()['access_token']

'''
    If you want to create more paths, simply follow the same format as the get_access_token function above:
 
    Decorate the function with @app.route(/api/path). The methods paramter isn't actually required but it is helpful to distinguish what methods you want to allow. 
    Create the actual function definition as well as any logic you want to implement. 
    If you pass parameters from the client to the here, and need to access those
    arguments, use request.args.get(<parameter_name>) in your code. 
  
'''
# Start the Flask server in debug mode
app.run(debug=True)

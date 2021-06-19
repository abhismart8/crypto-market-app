## INSTALLATION

First, you need to install Node.js, [download and install Node.js](https://nodejs.org/en/download/)

Once its done, just clone this repo using "git clone https://github.com/abhismart8/crypto-market-app.git"

Now, run "npm install" to install all the dependencies.


## INSTALL MONGODB

You need to install MongoDB, [download and install MongoDB](https://www.mongodb.com/try/download/community).

Note: Make sure to copy and paste the path of mongodb bin file in environment variables.


## START APPLICATION

I think you are good to go now, you just need to run your application now.

To run the application: "npm start".


## API's

Register API:-
path - /v1/register
method - POST
request(JSON) - {"name": "<name>", "email": "<email>", "password": "<password>"}
response(JSON) - {
    "success": true,
    "result": "Registration Successful",
    "apikey": your_api_key
}

All CryptoCurrencies API:-
path - /v1/currencies?apikey=your_api_key
method - GET
response(JSON) - all crypto data

Single CryptoCurrency API:-
path - /v1/currencies?apikey=your_api_key&id=BTC
method - GET
response(JSON) - specified id crypto data


## THANK YOU. ENJOY.
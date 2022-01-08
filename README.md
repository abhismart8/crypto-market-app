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

Register API:- <br>
path - /v1/register <br>
method - POST <br>
request(JSON) - { <br>
    "name": "Name", <br>
    "email": "Email Address", <br>
    "password": "Password" <br>
    } <br>
response(JSON) - { <br>
    "success": true, <br>
    "result": "Registration Successful", <br>
    "apikey": your_api_key <br>
} <br>

All CryptoCurrencies API:- <br>
path - /v1/currencies?apikey=your_api_key <br>
method - GET <br>
response(JSON) - all crypto data <br>

Single CryptoCurrency API:- <br>
path - /v1/currencies?apikey=your_api_key&id=BTC <br>
method - GET <br>
response(JSON) - specified id crypto data <br>


## WEBSITE LINK
https://cryptomarketapp88.herokuapp.com/


## THANK YOU. ENJOY.

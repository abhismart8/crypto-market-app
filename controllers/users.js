const User = require('../models/User');

exports.register = function(req, res, next) {
    const registerData = async () => {
        try{
            let bodyObject = req.body;
            if(typeof bodyObject == 'undefined' || bodyObject == null){
                res.send({"success": false, "error": "Missing or invalid POST body"})
            }else{
                if((typeof bodyObject.name == 'undefined' && !bodyObject.name)  || (typeof bodyObject.email == 'undefined' 
                && !bodyObject.email) || (typeof bodyObject.password == 'undefined' && !bodyObject.password)){
                    res.send({"success": false, "error": "Missing or invalid POST body"})
                }
            }

            let response = await checkifUserExists(req.body.email);
            if(response){
                return {"apikey": response};
            }else{
                const registerResponse = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })
                registerResponse.save();
                return registerResponse;
            }
        }catch(error){
            console.error(error)
        }
    }

    const getRegisterData = async () => {
        const response = await registerData();
        if (typeof response.apikey != 'undefined'){
            
            res.json({"success": true, "result": "Already Registered", "apikey": response.apikey});
        }
        else{
            res.json({"success": true, "result": "Registration Successful", "apikey": response._id});
        }
    }

    const checkifUserExists = async (email) => {
        let data = await User.find({"email": email});
        if(data.length > 0){
            return data[0]._id;
        }else{
            return false;
        }
    }

    if(req.params.version == 'v1'){
        getRegisterData();
    }
    else{
        res.send({"success": false, "error": "Invalid version"})
    }
}
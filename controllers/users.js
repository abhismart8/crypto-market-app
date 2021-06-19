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

            const registerResponse = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            registerResponse.save();
            return registerResponse;
        }catch(error){
            console.error(error)
        }
    }

    const getRegisterData = async () => {
        const response = await registerData();
        if (response){
            res.json({"success": true, "result": "Registration Successful", "apikey": response._id});
        }
    }

    if(req.params.version == 'v1'){
        getRegisterData();
    }
    else{
        res.send({"success": false, "error": "Invalid version"})
    }
}
const User = require('../models/userModel');

exports.createUser = async (req,res) =>{
    const {name_surname,phone,address,username,email,password,country} = req.body;

    if(!name_surname || !phone || !address || !username || !email || !password || !country){
        res.status(404).send({message:"Every field is Mandatory"});
    }

    try {
        
        const createUser = new User({name_surname,phone,address,username,email,password,country});
        await createUser.save();

        if(createUser){
            res.status(201).send(createUser)
        }else{
            res.status(500).send({message:"User not created"});
        }

    } catch (error) {
        res.send({message:error})
    }
}

exports.loginUser = async(req,res)=>{
    const email = req.params.email;

    const {username,password}= req.body;

    try {
        const isUserExist = await User.findOne({email:email});
        if(isUserExist && isUserExist.password == password && isUserExist.username == username){
            const token = await isUserExist.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2598000000),
                httpOnly: true,
            });
            res.status(200).send(isUserExist);
        }else{
            res.status(404).send({message:"User not found"});
        }
    } catch (error) {
        res.send({message:error})
    }
}

exports.getUserData = (req,res)=>{
    res.send(req.rootUser);
}

exports.logoutUser = (req,res) =>{
    res.clearCookie('jwtoken');
    res.status(200).send("user logged out");
  }
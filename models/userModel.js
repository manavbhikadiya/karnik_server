const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name_surname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    tokens: [
        { 
            token: { 
                type: String 
            } 
        }
    ]
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this._id},"karnik");
    try {
        this.tokens = this.tokens.concat({token:token});
        await this.save()
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('user',userSchema);

module.exports = User;
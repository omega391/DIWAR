const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrpyt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Please enter an email address'], 
        unique: true, 
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    name: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: [true, 'Please enter a password'], 
        minlength: [6, 'Password must be atleast 7 characters']
    },
    gender: {
        type: String, 
        required: true
    },
    department: {
        type: String, 
        required: true
    }
},
{collection: 'USERS'})

//fire a function before doc save too db
UserSchema.pre('save', async function (next) {
    const salt = await bcrpyt.genSalt();
    this.password = await bcrpyt.hash(this.password, salt);
    next();
});

//static method to login user
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrpyt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('email or password is incorrect');
    }
    throw Error('email or password is incorrect');
}

const model = mongoose.model('UserSchema', UserSchema)
module.exports = model

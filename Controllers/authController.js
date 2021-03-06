const User = require('../model/user');
const Diwar = require('../model/diwar');
const CIT = require('../model/deparrtment/cit');
const COE = require('../model/deparrtment/coe');
const COENG = require('../model/deparrtment/coeng');
const COS = require('../model/deparrtment/cos');

const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};
    
    //incorrect email or password
    if (err.message === 'email or password is incorrect') {
        errors.email = 'email or password is incorrect';
        errors.password = 'email or password is incorrect';
    }
    //duplicate email error
    if (err.code === 11000) {
        errors.email = 'email address is already registered try another email';
        return errors;
    }

    //validation errors
    if (err.message.includes('UserSchema validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
//jwtTokens
//Tokens Expiration
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'Classified', {
        expiresIn: maxAge
    });
}

//signup page
module.exports.signup_get = (req,res) => {
    res.render('signup', {title: 'Signup'});
}

// login page
module.exports.login_get = (req,res) => {
    res.render('login', {title: 'Login'});
}

//diwar search
module.exports.diwar_get = (req, res) => {

}

//register user to db
module.exports.signup_post = async (req,res) => {
    const {
        email,
        name,
        password,
        gender,
        department
    } = req.body;

    try{
        const user = await User.create({
            email,
            name,
            password,
            gender,
            department
        });
        //success
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id });   
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
    
}

//user login to page
module.exports.login_post = async (req,res) => {
    const {email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors});
    }
}

//diwar save to db
module.exports.diwar_post = async (req, res) => {
    const {
        email,
        date,
        time,
        output,
        details,
        verify,
        department
    } = req.body;

    try{
        if (department === 'CIT'){
            const cit = await CIT.create({
                email,
                date,
                time,
                output,
                details,
                verify,
                department
            })
            console.log('TRY', cit)
        }
        if (department === 'COE'){
            const coe = await COE.create({
                email,
                date,
                time,
                output,
                details,
                verify,
                department
            })
            console.log('TRY', coe)
        }
        if (department === 'COENG'){
            const coeng = await COENG.create({
                email,
                date,
                time,
                output,
                details,
                verify,
                department
            })
            console.log('TRY', coeng)
        }
        if (department === 'COS'){
            const cos = await COS.create({
                email,
                date,
                time,
                output,
                details,
                verify,
                department
            })
            console.log('TRY', cos)
        }
           
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

//logout user
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
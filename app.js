const express = require('express');
const mongoose = require('mongoose');
const authRoute =  require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/views'));
app.use(express.json());
app.use(cookieParser());

//view engone
app.set('view engine', 'ejs');

//database connection
//connection ni von link below
// const dbURI ='mongodb+srv://vctuciuk:test12@cluster0.gsket.mongodb.net/DIWAR?retryWrites=true&w=majority';

//connection sa DB ni Von link below
const dbURI ='mongodb+srv://omega391:omega391@cluster0.04nly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//pag ka sa network ni franz link below
// const dbURI ='mongodb+srv://vctuciuk:test123456@try.jetwc.mongodb.net/TRY?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true  })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//routes
app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home', {title: 'Home'}));
app.get('/', (req,res) => res.sendFile(__dirname + '/views/main.html'))

app.get('/account', requireAuth, (req, res) => res.render('account', {title: 'Home'}));
app.use(authRoute);

//if route not exist send 404 page
app.use((req, res) => res.status(404).render('404', {title: '404'}));
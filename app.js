const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
app.set('view engine' , 'ejs');
const { redirect, render } = require('express/lib/response');
const { allowedNodeEnvironmentFlags } = require('process');
const Port = process.env.PORT || 1000 ;
const exp = require('constants');
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
mongoose.connect('mongodb+srv://hassanR01:Hassan236@cluster0.txrmq.mongodb.net/Ask_me?retryWrites=true&w=majority' ,  { useNewUrlParser: true , useUnifiedTopology: true }).then(() => console.log('Connected')).catch((err) => console.log(err))

let askSchema = Schema({
    userName : String ,
    Ask : String , 
    answer : String ,
})

let Asks = mongoose.model('Asks' , askSchema)

app.post('/Asks' , (req , res) => {
    let newAsk = new Asks({
        userName : req.body.userName ,
        Ask : req.body.ask ,
        answer : '' ,
    })

    newAsk.save().then(result => console.log(result)).catch((err) => console.log(err))
    setTimeout(() => {
        res.redirect('/UserAsk')
    }, 500);
})

app.post('/UserAsk' , (req , res) => {
    Asks.findByIdAndUpdate(req.body.askId , {answer : req.body.answer}).then((result) => console.log(result)).catch(err => console.log(err))
    res.redirect('/UserAsk')
})

app.get('/' , (req , res) => {
    res.redirect('/Home')
})

app.get('/Home' , (req , res) => {
    res.render('main')
})

app.get('/Asks' , (req , res) => {
    res.render('asks')
})

app.get('/UserAsk' , (req , res) => {
    Asks.find().then((result) => {
        res.render('userAsk' , { toasks : result.reverse()})
    })
})

app.get('/Contact' , (req , res) => {
    res.render('contact')
})

app.listen(Port , (req , res) => {
    console.log(`your link to live server http://localhost:${Port}`)
})
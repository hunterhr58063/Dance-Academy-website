const express=require('express');
const path=require('path');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const port=8000 ;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/');
}

const contactSchema=new mongoose.Schema({
 Name:String,
 Phone:String,
 Email:String,
 Address:String,
 City:String
});

const Contact=mongoose.model('Contact',contactSchema);
// express stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded());

// pug stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// endpoint
app.get('/home',(req,res)=>{
 const params={};
 res.status(200).render('home.pug',params);

});
app.get('/',(req,res)=>{
  const params={};
  res.status(200).render('home.pug',params);
 
 });

app.get('/contact',(req,res)=>{
  const params={};
  res.status(200).render('contact.pug',params);
 
 });

 app.post('/contact',(req,res)=>{
  const formdata=new Contact(req.body);
  formdata.save().then(()=>{
    res.send("form has been submited");
  }).catch(()=>{
    res.status(400).send("error in submiting form");
  });
 
 });


 app.get('/about',(req,res)=>{
  const params={};
  res.status(200).render('about.pug',params);
 
 });
 app.get('/class-info',(req,res)=>{
  const params={};
  res.status(200).render('class-info.pug',params);
 
 });
 app.get('/services',(req,res)=>{
  const params={};
  res.status(200).render('services.pug',params);
 
 });

//start server
app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
});
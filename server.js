const express=require('express');
const bodyparser=require('body-parser');
const methodoverride=require('method-override');
const logger=require('morgan');

const session=require('express-session');
const path =require('path');
const cors =require('cors')

const PORT=process.env.PORT||4500;



const db=require('./models');


// intializing an instance of express
const app= express();
app.use(cors());

app.use(methodoverride("_method"));  
app.use(logger("dev"));
app.use(session({
    secret:'123456',
    // @ts-ignore
    resave:"true",
    // @ts-ignore
    saveUninitialized:"true"
}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
require('./controller/user')(app);


db.sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,function(err){
        if(!err){
            console.log(`application listening on port ${PORT}`);
        } else if(err){
            console.log(JSON.stringify(err))
        }   
    }  
    ) 
  
});  
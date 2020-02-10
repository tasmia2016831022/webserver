const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000;

/// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

/// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);

hbs.registerPartials(partialsPath);

/// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Linuxz'
    });
});

app.get('/help',(req,res) => {
   res.render('help',{
       title: "Help Page",
       message :'This is a help page!!',
       name:'Linuss'
   }); 
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Linuxs'
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }else{
            forecast(latitude,longitude,(error,data)=>{
                if(error){return res.send({error})}
                else{
                    res.send(data);
                }
            })
        }
    })
    
    
});

  app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        title: 'Error',
        error: "Help not found",
        name: 'ERRLin'
    });
})

app.get('*',(req,res)=>{
    res.render('errorPage',{
        title: 'Error',
        error: "Page not found",
        name: 'ERRLin'
    });
})

app.listen(port, () => {
    console.log(`Server started at ${port}`)
});

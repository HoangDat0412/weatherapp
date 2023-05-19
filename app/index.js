const asyncRequest = require("async-request")

const getWeather = async (location)=>{
    const access_key="fd3dc6dfa9e25ff018cc4d459751b04b"
    try{
        const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
        const res = await asyncRequest(url)
     //    console.log(res.headers);
        const data = JSON.parse(res.body)
         const weather ={
             region:data.location.region,
             country:data.location.country,
             temperature:data.current.temperature,
             wind_speed:data.current.wind_speed,
             precip:data.current.precip,
             cloudcover:data.current.cloudcover,
             weather_icons:data.current.weather_icons,
             isSuccess:true
         }
     
         return weather
    }catch(err){
        return {
            isSuccess:false,
            err
        }
    }


}


const express = require("express");
const app = express();



const path = require("path")
const pathPublic = path.join(__dirname,"../public")
app.use(express.static(pathPublic))

app.get('/',async (req, res) => {
    const params = req.query;
    const location = params.address;
   const weather = await getWeather(location)
   console.log(weather);
    if (location) {
        res.render("weather",{
            isSearch:true,
            region: weather.region,
            country:weather.country,
            temperature:weather.temperature,
            wind_speed:weather.wind_speed,
            precip:weather.precip,
            cloudcover:weather.cloudcover,
            weather_icons:weather.weather_icons,
    
        })
    }else{
        res.render("weather",{
            isSearch:false
        })
    }
  })

app.set("view engine","hbs")


const port = 7000;
app.listen(port,()=>{
    console.log(`Sever started on http://localhost:${port} `);
})




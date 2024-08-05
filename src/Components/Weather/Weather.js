import React, { useRef, useState } from 'react';
import "./Weather.css";
import searchicon from "../images/search.png";
import sunny from "../images/sunny.png";
import humidity from "../images/humidity.png";
import windspeed from "../images/wind.png";
import drizzle from "../images/drizzel.png";
import mist from "../images/heavy-rain.png";
import snow from "../images/snow.png";
import clouds from "../images/clouds.png";
import rain from "../images/rain.png";

export default function Weather() {
    const [state,setState]=useState({
        celicius:20,
        country:"london",
        humidity:"25%",
        windspeed:"48",
        image:sunny,
    })
    
    let apikey = "cfbda38b04141bfbbec72fb647313238";
    let inputref = useRef();
    async function showcity(city){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`);
        var data = await response.json();
     
        if(response.status === 404){
           document.querySelector(".display").style.display ="none";
           document.getElementById("valid").innerHTML="valid value";
        }
        else{
            document.querySelector(".display").style.display ="block";
            document.getElementById("valid").innerHTML="";

            let imageitems = "";
            if(data.weather[0].main === "Clear"){
                imageitems = sunny;
       
    
              
           }else if(data.weather[0].main === "Drizzle"){
           imageitems = drizzle;
        
           }
           else if(data.weather[0].main === "Mist"){
            imageitems = mist;
      
    
           }
           else if(data.weather[0].main === "Snow"){
            
            imageitems = snow;
    
    
            }
            else if(data.weather[0].main === "Clouds"){
            
                imageitems = clouds;
        
        
                }
                else if(data.weather[0].main === "Rain"){
            
                    imageitems = rain;
            
            
                    }
          
            setState({
                celicius :data.main.temp,
                country:data.name,
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                image:imageitems,
                
            })
           
        }

        }
       
    function showweather(){
        let city = inputref.current.value;
        showcity(city);
        inputref.current.value="";

    }
  return (
    <div className='container'>

    <div className='weather_content'>

    <div className='search'>
            <input type='text' placeholder='Search' ref={inputref} ></input>
            <img src={searchicon} alt='' width="40px" onClick={showweather}></img>
          
        </div>
        <p id="valid"></p>

    <div className='display'>

        <img src={state.image} alt='' className='weathericon' width="90px"></img>
        <div className='country'>
        <p>{Math.round(state.celicius)} °C</p>
        <h3>{state.country}</h3>

        </div>
       
        <div className='weatherinfo'>
            <div className='humidity'>
                <img src={humidity} alt='' ></img>
                <div >
                    <p>{state.humidity}%</p>
                    <p>humidity</p>
                </div>

            </div>
            <div className='windspeed'>
                <img src={windspeed} alt='' ></img>
                <div >
                    <p>{Math.round(state.windspeed)}%</p>
                    <p>wind speed</p>
                </div>

            </div>

        </div>
       
    </div>

    </div>

      
    </div>
  )
}

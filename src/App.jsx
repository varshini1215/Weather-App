import React,{ useEffect, useState } from 'react'
import './App.css'
import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/cloud.png'
import drizzleIcon from './assets/drizzle.png'
import humidityIcon from './assets/humidity.png'
import rainIcon from './assets/rain.png'
import windIcon from './assets/wind.png'
import snowIcon from './assets/snow.png'
 const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{
return(
  <>
   <div className="image">
    <img src={icon} alt='Image'/>
  </div>
  <div className="temp" >{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
    <span className="log">Longitude</span>
    <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <div className="humidity-icon">
        <img src={humidityIcon} style={{height:"50px",width:"50px"}} className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      </div>
      <div className="element">
        <div className="wind-icon">
          <img src={windIcon} alt="image" style={{height:"50px",width:"50px"}}className="icon" />
          <div className="data">
            <div className="wind-percent">{wind}km/hr</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
  </div>
  </>
)
 }
 
function App() {
  let api_key="c6b5f02609fac85396deb5a37881a30d";
  const [text,setText]=useState("Chennai");
  const [icon,setIcon]=useState(clearIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("CHENNAI");
  const[country,setCountry]=useState("IN");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[loading,setLoading]=useState(false);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[error,setError]=useState(null);
  const weatherIconMap ={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  };
  const search =async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      // console.log(data)
      if(data.cod === "404"){
        console.error("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode= data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    }
    catch(error){
       console.error("An error occured:",error.message);
       setError("Ann error occured")
    }
    finally{
      setLoading(false);
    }
   };
   const handleCity = (e) =>{
    setText(e.target.value);
   }
   const handleKeyDown = (e)=>{
      if(e.key === "Enter")
      search();
   }
   useEffect(function(){
    search();
   },[])
  return (
   <>
   <div className="container">
    <div className="inputContainer">
      <input className='city' type='text' placeholder='Search for location' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
      <div className="search icon">
        <img src={searchIcon} style={{height:"22px",width:"30px"}} onClick={()=>search()}/>
      </div>
    </div>
    {loading&&<div className="Loading-message">Loading....</div>}
    {error&&<div className="error-message">{error}</div>}
    {cityNotFound&&<div className="city-notfound">City not found</div>}
   {!loading && !cityNotFound && < WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}
    <p className='weather'>Weather App</p>
   </div>
   </>
  );
}

export default App

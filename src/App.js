import React, { useState, useEffect } from 'react';
import './App.css';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./service/data";
import MyInput from './components/MyInput/MyInput';
import Forecast from './components/Forecast/Forecast';
import Cards from './components/Cards/Cards';
import Header from './components/Header/Header';


function App() {

  const [forecast, setForecast] = useState(JSON.parse(localStorage.getItem('forecast'))||[]);
  const [NameCity, setNameCity] = useState(JSON.parse(localStorage.getItem('NameCity'))||[]);
  const [IsCardShowed, SetIsCardShowed] = useState(false);
  useEffect(()=>{
    localStorage.setItem('forecast', JSON.stringify(forecast))
  }, [forecast])
  useEffect(()=>{
    localStorage.setItem('NameCity', JSON.stringify(NameCity))
  }, [NameCity])
  const handleOnSearchChange = (city) => {
   
    
   
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    Promise.all([forecastFetch])
      .then(async (response) => {
       
          const forcastResponse = await response[0].json();
          const sityName = forcastResponse.city.name;
          const dailyData = forcastResponse.list.filter(reading => reading.dt_txt.includes("12:00:00"))
          console.log(forcastResponse)
          setForecast(dailyData);
          setNameCity(sityName);
      })
      .catch(error =>{
          alert("This city doesn't exist! Try again!")
      })
      localStorage.setItem('forecast', JSON.stringify(forecast))
      localStorage.setItem('NameCity', JSON.stringify(NameCity))
  };
 
  console.log(forecast);
  console.log(NameCity);
  
  return (
    <div className="App">
        <Header/>
        <MyInput setQuery={handleOnSearchChange} IsCardShowed={SetIsCardShowed}/>
        <div className='content'>
        <Cards setQuery={handleOnSearchChange} NameCity={NameCity} IsCardShowed={IsCardShowed}/>
     
      {(forecast  &&  NameCity) && (
        <div>
     
          <Forecast forecast={forecast} NameCity={NameCity}/>
        
        </div>
      )}
       </div>
    </div>
  );
}

export default App;

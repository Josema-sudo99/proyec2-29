import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import './App.css';
import imagenes from './utils/imagenes.json'; 
import getRandomElemArray from './utils/getRandomElemArray';

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const ApiKey = "fd88ed6a3fd44ec6016d411a8bc77d31";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${ApiKey}`;
      axios
        .get(url)
        .then(res => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.0).toFixed(1),
            farenheit: ((res.data.main.temp - 273.0) * 9/5 + 32).toFixed(1)
          }
          setTemp(obj);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 

    let currentSeason;
    if (currentMonth >= 3 && currentMonth <= 5) {
      currentSeason = "spring"; 
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      currentSeason = "summer"; 
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      currentSeason = "autumn";
    } else {
      currentSeason = "winter";
    }

    const seasonImages = imagenes[currentSeason];
    const randomImage = getRandomElemArray(seasonImages);
    setImage(randomImage.imagen);
  }, []);

  return (
    <div className="background-image" style={{ backgroundImage: `url(${image})` }}>
    <div className="container">
      
        <WeatherCard
          weather={weather}
          temp={temp} />
      </div>
    </div>
  );
}

export default App;
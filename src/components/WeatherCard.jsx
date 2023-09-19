import { useState } from "react";
import '../App.css'

const WeatherCard = ({ weather , temp}) => {

  const [isCelsius, setIsCelsius] = useState(true)

  const handleChangeTemp = () => setIsCelsius(!isCelsius)

  return (
    <article>
      <h1 className="titulo">Wearther App</h1>
      <h2 className="sub-titulo">
        {weather?.name},{weather?.sys.country}
      </h2>
      <div className="detalles">
        <div>
          <img className="img"
            src={
              weather &&
              `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
            }
            alt=""
          />
        </div>
        <section>
          <h3>{weather?.weather[0].descriptiom}</h3>
          <ul>
            <li className="detalles-1">
              <span>wind speed</span>
              <span>{weather?.wind.speed}m/s</span>
            </li>
            <li className="detalles-1">
              <span >Clouds</span>
              <span>{weather?.clouds.all}</span>
            </li>
            <li className="detalles-1">
              <span >Pressure</span>
              <span>{weather?.main.pressure} hPa</span>
            </li>
          </ul>
        </section>
      </div>
        <h2 className="numero">{isCelsius ?  `${temp?.celsius} °C` : `${temp?.farenheit} °F` }</h2>
        <button className="button" onClick={handleChangeTemp}>{isCelsius? 'change to °F' : 'change to °C'}</button>
    </article>
  );
};
 
export default WeatherCard;

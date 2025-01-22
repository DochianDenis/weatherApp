import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"
import { useState, useEffect } from "react"

const WeatherApp = () => {
    const [data, setData] = useState({ name: 'Bucharest' });
    const [location, setLocation] = useState('');
    const owm_key = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    }

    const search = async () => {
        try {
            const owm_url = `https://api.openweathermap.org/data/2.5/weather?q=${location || 'Bucharest'}&units=Metric&appid=${owm_key}`;
            const res = await fetch(owm_url);
            if (!res.ok) {
                throw new Error('Location not found');
            }
            const searchData = await res.json();
            setData(searchData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            alert('Could not fetch weather data. Please try again.');
        } finally {
            setLocation('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    useEffect(() => {
        search();
    }, []);

    return (
        <div className="container">
            <div className="weather-app">
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid location fa-location-dot"></i>
                        <div className="location">{data.name}</div>
                    </div>
                    <div className="search-bar">
                        <input value={location} onChange={handleInputChange} 
                        onKeyDown={handleKeyDown} type="text" placeholder="Enter Location:" />
                        <i className="fa-solid fa-magnifying-glass on" onClick={search}></i>
                    </div>
                </div>
                <div className="weather">
                    <div className="temp">{Math.floor(data.main?.temp ?? 0)}°C</div>
                    <div className="weather-type">{data.weather?.[0]?.description ?? "Not available"}</div>
                </div>
                <div className="weather-date">
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className="data-name">Humidity</div>
                        <i className="fa-solid fa-droplet"></i>
                        <div className="data">{data.main?.humidity ?? "N/A"}%</div>
                    </div>
                    <div className="wind">
                        <div className="data-name">Wind</div>
                        <i className="fa-solid fa-wind"></i>
                        <div className="data">{Math.floor(data.wind?.speed ?? 0)} km/h</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;

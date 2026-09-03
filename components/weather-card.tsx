"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Droplets, Moon, Sun, Wind } from "lucide-react";
import { weatherCities, type WeatherCityId, type WeatherCondition, type WeatherData } from "@/lib/weather";

function WeatherIcon({ condition, isDay }: { condition: WeatherCondition; isDay: boolean }) {
  if (condition === "rain") return <CloudRain aria-hidden="true" />;
  if (condition === "snow") return <CloudSnow aria-hidden="true" />;
  if (condition === "storm") return <CloudLightning aria-hidden="true" />;
  if (condition === "fog") return <CloudFog aria-hidden="true" />;
  if (condition === "cloudy") return <Cloud aria-hidden="true" />;
  return isDay ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />;
}

export function WeatherCard() {
  const [cityId, setCityId] = useState<WeatherCityId>("athens");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/weather?city=${cityId}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Weather unavailable");
        return response.json() as Promise<WeatherData>;
      })
      .then((data) => setWeather(data))
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [cityId]);

  return (
    <section className="weather-card" aria-busy={loading}>
      <div className="weather-heading">
        <label htmlFor="weather-city">ΚΑΙΡΟΣ ΤΩΡΑ</label>
        <select id="weather-city" value={cityId} onChange={(event) => {
          setLoading(true);
          setError(false);
          setCityId(event.target.value as WeatherCityId);
        }}>
          {Object.entries(weatherCities).map(([id, city]) => <option key={id} value={id}>{city.name}</option>)}
        </select>
      </div>

      {loading && !weather ? <div className="weather-loading"><CloudSun aria-hidden="true" /><span>Φόρτωση καιρού…</span></div> : error && !weather ? (
        <p className="weather-error">Ο καιρός δεν είναι διαθέσιμος αυτή τη στιγμή.</p>
      ) : weather ? (
        <>
          <div className="weather-current">
            <div><strong>{weather.temperature}°</strong><p>{weather.description}</p></div>
            <WeatherIcon condition={weather.condition} isDay={weather.isDay} />
          </div>
          <div className="weather-details">
            <span><b>{weather.minimumTemperature}° / {weather.maximumTemperature}°</b> Ελάχ. / Μέγ.</span>
            <span><Wind aria-hidden="true" /><b>{weather.windSpeed} km/h</b> Άνεμος</span>
            <span><Droplets aria-hidden="true" /><b>{weather.precipitationProbability}%</b> Βροχή</span>
          </div>
          <small>Αίσθηση {weather.apparentTemperature}° · Δεδομένα <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></small>
        </>
      ) : null}
    </section>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { describeWeatherCode, weatherCities, type WeatherCityId, type WeatherData } from "@/lib/weather";

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    is_day?: number;
  };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
  };
};

export async function GET(request: NextRequest) {
  const requestedCity = request.nextUrl.searchParams.get("city") ?? "athens";
  const cityId: WeatherCityId = requestedCity in weatherCities ? requestedCity as WeatherCityId : "athens";
  const city = weatherCities[cityId];

  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "Europe/Athens",
    forecast_days: "1",
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
      next: { revalidate: 900 },
      headers: { "User-Agent": "ElladaTora/1.0 (+https://www.elladatora.gr)" },
    });

    if (!response.ok) throw new Error(`Weather provider returned ${response.status}`);
    const payload = await response.json() as OpenMeteoResponse;
    const current = payload.current;
    const daily = payload.daily;
    if (!current || typeof current.temperature_2m !== "number" || typeof current.weather_code !== "number") {
      throw new Error("Weather provider returned incomplete data");
    }

    const weather: WeatherData = {
      cityId,
      city: city.name,
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature ?? current.temperature_2m),
      weatherCode: current.weather_code,
      isDay: current.is_day !== 0,
      windSpeed: Math.round(current.wind_speed_10m ?? 0),
      minimumTemperature: Math.round(daily?.temperature_2m_min?.[0] ?? current.temperature_2m),
      maximumTemperature: Math.round(daily?.temperature_2m_max?.[0] ?? current.temperature_2m),
      precipitationProbability: Math.round(daily?.precipitation_probability_max?.[0] ?? 0),
      observedAt: current.time ?? new Date().toISOString(),
      ...describeWeatherCode(current.weather_code),
    };

    return NextResponse.json(weather, {
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" },
    });
  } catch (error) {
    console.error("Weather request failed", error);
    return NextResponse.json({ error: "Ο καιρός δεν είναι διαθέσιμος αυτή τη στιγμή." }, { status: 502 });
  }
}

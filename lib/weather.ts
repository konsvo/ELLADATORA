export const weatherCities = {
  athens: { name: "Αθήνα", latitude: 37.9838, longitude: 23.7275 },
  thessaloniki: { name: "Θεσσαλονίκη", latitude: 40.6401, longitude: 22.9444 },
  patras: { name: "Πάτρα", latitude: 38.2466, longitude: 21.7346 },
  heraklion: { name: "Ηράκλειο", latitude: 35.3387, longitude: 25.1442 },
  larissa: { name: "Λάρισα", latitude: 39.639, longitude: 22.4191 },
  ioannina: { name: "Ιωάννινα", latitude: 39.665, longitude: 20.8537 },
  alexandroupoli: { name: "Αλεξανδρούπολη", latitude: 40.8457, longitude: 25.8739 },
  rhodes: { name: "Ρόδος", latitude: 36.4341, longitude: 28.2176 },
} as const;

export type WeatherCityId = keyof typeof weatherCities;

export type WeatherCondition = "clear" | "cloudy" | "fog" | "rain" | "snow" | "storm";

export type WeatherData = {
  cityId: WeatherCityId;
  city: string;
  temperature: number;
  apparentTemperature: number;
  condition: WeatherCondition;
  description: string;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  minimumTemperature: number;
  maximumTemperature: number;
  precipitationProbability: number;
  observedAt: string;
};

export function describeWeatherCode(code: number): Pick<WeatherData, "condition" | "description"> {
  if (code === 0) return { condition: "clear", description: "Αίθριος καιρός" };
  if (code === 1) return { condition: "clear", description: "Κυρίως αίθριος" };
  if (code === 2) return { condition: "cloudy", description: "Λίγες νεφώσεις" };
  if (code === 3) return { condition: "cloudy", description: "Νεφελώδης καιρός" };
  if (code === 45 || code === 48) return { condition: "fog", description: "Ομίχλη" };
  if ([51, 53, 55, 56, 57].includes(code)) return { condition: "rain", description: "Ψιλόβροχο" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { condition: "rain", description: "Βροχή" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { condition: "snow", description: "Χιονόπτωση" };
  if ([95, 96, 99].includes(code)) return { condition: "storm", description: "Καταιγίδα" };
  return { condition: "cloudy", description: "Μεταβλητός καιρός" };
}

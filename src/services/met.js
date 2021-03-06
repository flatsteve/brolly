import { get } from "lodash";
import { addMinutes, getHours, isSameDay, isBefore } from "date-fns";

const WEATHER_TYPES = {
  0: { class: "clear-night", description: "Clear night" },
  1: { class: "sunny", description: "Sunny day" },
  2: { class: "partly-cloudy", description: "Partly cloudy (night)" },
  3: { class: "partly-cloudy", description: "Partly cloudy (day)" },
  5: { class: "partly-cloudy", description: "Mist" },
  6: { class: "partly-cloudy", description: "Fog" },
  7: { class: "cloudy", description: "Cloudy" },
  8: { class: "cloudy", description: "Overcast" },
  9: { class: "light-rain", description: "Light rain shower (night)" },
  10: { class: "light-rain", description: "Light rain shower (day)" },
  11: { class: "light-rain", description: "Drizzle" },
  12: { class: "light-rain", description: "Light rain" },
  13: { class: "heavy-rain", description: "Heavy rain shower (night)" },
  14: { class: "heavy-rain", description: "Heavy rain shower (day)" },
  15: { class: "heavy-rain", description: "Heavy rain" },
  16: { class: "light-snow", description: "Sleet shower (night)" },
  17: { class: "light-snow", description: "Sleet shower (day)" },
  18: { class: "light-snow", description: "Sleet" },
  19: { class: "light-snow", description: "Hail shower (night)" },
  20: { class: "light-snow", description: "Hail shower (day)" },
  21: { class: "light-snow", description: "Hail" },
  22: { class: "light-snow", description: "Light snow shower (night)" },
  23: { class: "light-snow", description: "Light snow shower (day)" },
  24: { class: "light-snow", description: "Light snow" },
  25: { class: "heavy-snow", description: "Heavy snow shower (night)" },
  26: { class: "heavy-snow", description: "Heavy snow shower (day)" },
  27: { class: "heavy-snow", description: "Heavy snow" },
  28: { class: "thunder", description: "Thunder shower (night)" },
  29: { class: "thunder", description: "Thunder shower (day)" },
  30: { class: "thunder", description: "Thunder" }
};

export const getWindDirectionRotation = directionInwords => {
  const DEGREE_INCREMENT = 22.5; // 360 / 16 point compass

  switch (directionInwords) {
    case "N":
      return 0;
    case "NNE":
      return DEGREE_INCREMENT;
    case "NE":
      return DEGREE_INCREMENT * 2;
    case "ENE":
      return DEGREE_INCREMENT * 3;
    case "E":
      return DEGREE_INCREMENT * 4;
    case "ESE":
      return DEGREE_INCREMENT * 5;
    case "SE":
      return DEGREE_INCREMENT * 6;
    case "SSE":
      return DEGREE_INCREMENT * 7;
    case "S":
      return DEGREE_INCREMENT * 8;
    case "SSW":
      return DEGREE_INCREMENT * 9;
    case "SW":
      return DEGREE_INCREMENT * 10;
    case "WSW":
      return DEGREE_INCREMENT * 11;
    case "W":
      return DEGREE_INCREMENT * 12;
    case "WNW":
      return DEGREE_INCREMENT * 13;
    case "NW":
      return DEGREE_INCREMENT * 14;
    case "NNW":
      return DEGREE_INCREMENT * 15;
    default:
      return 0;
  }
};

export const extract5DayForecast = rawdata => {
  const rawForecast = get(rawdata, "data.SiteRep.DV.Location.Period", null);

  if (!rawForecast) {
    return;
  }

  const formattedForecast = rawForecast.map((day, i) => {
    return {
      date: day.value,
      hourlyForecast: day.Rep.map(forecast => {
        return {
          time: addMinutes(
            new Date(day.value).setHours(0, 0, 0, 0),
            forecast.$
          ),
          temperature: { value: forecast.T, unit: "°" },
          temperature_feel: { value: forecast.F, unit: "°" },
          precipitation: { value: forecast.Pp, unit: "%" },
          wind_speed: { value: forecast.S, unit: "mph" },
          wind_direction: { value: forecast.D, unit: null },
          type: WEATHER_TYPES[forecast.W]
        };
      })
    };
  });

  return formattedForecast;
};

export const getDailyForecasts = (forecast, date) => {
  if (!forecast) {
    return;
  }

  const daysForecast = forecast.find(dailyForecast => {
    return isSameDay(new Date(dailyForecast.date), new Date(date));
  });

  return daysForecast;
};

export const getForecastForTime = (
  forecast,
  date,
  currentTimeForecast = { time: new Date(2000, 1, 1, 9) } // Default to 9am - date doesn't matter
) => {
  if (!forecast) {
    return;
  }

  const daysForecast = getDailyForecasts(forecast, date);
  let forecastForTime;

  if (isSameDay(date, new Date())) {
    // If today then use current time
    forecastForTime = daysForecast.hourlyForecast.reduce((prev, curr) => {
      return isBefore(curr.time, date) ? curr : prev;
    });
  } else {
    // If not today then use the time of the currently viewed forecast
    forecastForTime = daysForecast.hourlyForecast.find(hoursForecast => {
      return (
        getHours(hoursForecast.time) === getHours(currentTimeForecast.time)
      );
    });
  }

  return forecastForTime;
};

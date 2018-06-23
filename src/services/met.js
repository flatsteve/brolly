import axios from "axios";
import get from "lodash-es/get";
import { addMinutes, isSameDay, isBefore } from "date-fns";

const API_KEY = "4f2d4f02-ef8c-43cb-a2ce-a96855b01ac7";
const BASE_URL = "//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/";
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

export const getWeatherForecast = locationID => {
  return axios(`${BASE_URL}${locationID}?res=3hourly&key=${API_KEY}`);
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
    return isSameDay(dailyForecast.date, date);
  });

  console.log("THE FORECAST FOR THE DAY", daysForecast);
  return daysForecast;
};

export const getForecastForTime = (forecast, date) => {
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
    // If not show the first time we have for that day
    forecastForTime = daysForecast.hourlyForecast[0];
  }

  console.log("CURRENT FORECAST FOR HOUR", forecastForTime);

  return forecastForTime;
};

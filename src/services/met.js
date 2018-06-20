import axios from "axios";
import { get } from "lodash-es/get";
import { addMinutes, isSameDay, isBefore } from "date-fns";
import { getItem } from "../services/storage";

const START_OF_DAY = new Date().setHours(0, 0, 0, 0);
const API_KEY = "4f2d4f02-ef8c-43cb-a2ce-a96855b01ac7";
const BASE_URL = "//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/";
const WEATHER_TYPES = {
  0: "Clear night",
  1: "Sunny day",
  2: "Partly cloudy (night)",
  3: "Partly cloudy (day)",
  5: "Mist",
  6: "Fog",
  7: "Cloudy",
  8: "Overcast",
  9: "Light rain shower (night)",
  10: "Light rain shower (day)",
  11: "Drizzle",
  12: "Light rain",
  13: "Heavy rain shower (night)",
  14: "Heavy rain shower (day)",
  15: "Heavy rain",
  16: "Sleet shower (night)",
  17: "Sleet shower (day)",
  18: "Sleet",
  19: "Hail shower (night)",
  20: "Hail shower (day)",
  21: "Hail",
  22: "Light snow shower (night)",
  23: "Light snow shower (day)",
  24: "Light snow",
  25: "Heavy snow shower (night)",
  26: "Heavy snow shower (day)",
  27: "Heavy snow",
  28: "Thunder shower (night)",
  29: "Thunder shower (day)",
  30: "Thunder"
};

export const getWeatherLocations = () => {
  if (getItem("locations")) {
    return Promise.resolve(getItem("brolly_locations"));
  }

  return axios(`${BASE_URL}sitelist?key=${API_KEY}`);
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
          time: addMinutes(START_OF_DAY, forecast.$),
          temperature: { value: forecast.T, unit: "°" },
          temperature_feel: { value: forecast.F, unit: "°" },
          precipitation: { value: forecast.Pp, unit: "%" },
          wind_speed: { value: forecast.S, unit: "mph" },
          wind_direction: { value: forecast.D, unit: null },
          type: { value: WEATHER_TYPES[forecast.W], unit: null }
        };
      })
    };
  });

  return formattedForecast;
};

export const getCurrentForecast = forecast => {
  if (!forecast) {
    return;
  }

  const currentDateTime = new Date();
  const currentDayForcast = forecast.find(dailyForecast => {
    return isSameDay(dailyForecast.date, currentDateTime);
  });

  console.log("CURRENT DAY FORECAST", currentDayForcast);

  const currentTimeForecast = currentDayForcast.hourlyForecast.reduce(
    (prev, curr) => {
      return isBefore(curr.time, currentDateTime) ? curr : prev;
    }
  );

  console.log("CURRENT", currentTimeForecast);

  return currentTimeForecast;
};

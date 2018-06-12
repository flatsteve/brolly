import axios from "axios";
import { addMinutes, isSameDay, isBefore } from "date-fns";
import { get } from "lodash";

const START_OF_DAY = new Date().setHours(0, 0, 0, 0);
const API_KEY = "4f2d4f02-ef8c-43cb-a2ce-a96855b01ac7";
const OBSERVATIONS_URL =
  "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/";

export const getWeatherForecast = locationID => {
  return axios(`${OBSERVATIONS_URL}${locationID}?res=3hourly&key=${API_KEY}`);
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
          temperature: { value: forecast.T, unit: "C" },
          temperature_feel: { value: forecast.F, unit: "C" },
          precipitation: { value: forecast.Pp, unit: "%" },
          wind_speed: { value: forecast.S, unit: "mph" },
          wind_direction: { value: forecast.D, unit: null },
          wind_direction: { value: forecast.D, unit: null }
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

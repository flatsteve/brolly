import axios from "axios";
import { addMinutes } from "date-fns";

const START_OF_DAY = new Date().setHours(0, 0, 0, 0);
const API_KEY = "4f2d4f02-ef8c-43cb-a2ce-a96855b01ac7";
const OBSERVATIONS_URL =
  "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/";

export const getWeatherForecast = locationID => {
  return axios(`${OBSERVATIONS_URL}${locationID}?res=3hourly&key=${API_KEY}`);
};

export const extract5DayForecast = rawdata => {
  const rawForecast = rawdata.data.SiteRep.DV.Location.Period;

  const formattedForecast = rawForecast.map((day, i) => {
    return {
      date: day.value,
      hourlyForecast: day.Rep.map(forecast => {
        return {
          time: addMinutes(START_OF_DAY, forecast.$),
          ...forecast
        };
      })
    };
  });

  return formattedForecast;
};

export const getCurrentForecast = forecast => {
  // return the forcast for the current day at the time closest to the current time
  return forecast;
};

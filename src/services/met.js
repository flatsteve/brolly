import axios from "axios";

const API_KEY = "4f2d4f02-ef8c-43cb-a2ce-a96855b01ac7";
const OBSERVATIONS_URL =
  "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/";

export const getWeatherObservation = locationID => {
  axios(`${OBSERVATIONS_URL}${locationID}?res=3hourly&key=${API_KEY}`)
    .then(res => {
      console.log(res.data.SiteRep);
    })
    .catch(error => {
      console.log(error);
    });
};

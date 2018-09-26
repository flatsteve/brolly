import axios from "axios";

const API_TOKEN =
  "ysRI-ercG6jUuvDKEoG3RoaSK0Ht3njBXZJY0qBeed0tbhMPTAs48oX1hnymIH9T";

const brollyAPI = axios.create({
  baseURL: "https://flatsteve.lib.id/brolly",
  headers: {
    common: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`
    }
  }
});

export const getWeatherForecast = locationID => {
  return brollyAPI.post("/forecast/", {
    locationID
  });
};

export const getLocation = (latitude, longitude) => {
  return brollyAPI.post("/location/", {
    targetLocation: JSON.stringify({ latitude, longitude })
  });
};

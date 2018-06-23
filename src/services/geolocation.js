import axios from "axios";
import { API_URL } from "./api";

export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    if (!"geolocation" in navigator) {
      return reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getClosestLocation = () => {
  return getGeoLocation().then(({ coords: { latitude, longitude } }) => {
    return axios.post(`${API_URL}/location/`, {
      targetLocation: JSON.stringify({ latitude, longitude })
    });
  });
};

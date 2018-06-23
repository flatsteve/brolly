import axios from "axios";

const API_URL = "https://flatsteve.lib.id/brolly";

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
    return axios(API_URL, {
      params: {
        targetLocation: JSON.stringify({ latitude, longitude })
      }
    });
  });
};

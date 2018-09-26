import { getLocation } from "./api";

export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    if (!"geolocation" in navigator) {
      return reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getClosestLocation = () => {
  return new Promise((resolve, reject) => {
    getGeoLocation()
      .then(({ coords: { latitude, longitude } }) => {
        getLocation(latitude, longitude).then(res => {
          resolve(res);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

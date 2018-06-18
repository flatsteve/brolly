import { get } from "lodash";
import { getWeatherLocations } from "./met";
import { setItem } from "./storage";

export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    if (!"geolocation" in navigator) {
      return reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getClosestLocation = targetLocation => {
  function vectorDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  function locationDistance(location1, location2) {
    const dx = location1.latitude - location2.latitude;
    const dy = location1.longitude - location2.longitude;

    return vectorDistance(dx, dy);
  }

  return new Promise((resolve, reject) => {
    getWeatherLocations()
      .then(res => {
        let locations;

        if (res.data) {
          locations = get(res, "data.Locations.Location", null);
          setItem("locations", locations);
        } else {
          locations = res;
        }

        resolve(
          locations.reduce((prev, curr) => {
            const prevDistance = locationDistance(targetLocation, prev);
            const currDistance = locationDistance(targetLocation, curr);

            return prevDistance < currDistance ? prev : curr;
          })
        );
      })
      .catch(error => {
        reject(error);
      });
  });
};

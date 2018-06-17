import { LOCATIONS } from "../data/raw_data";

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

  return LOCATIONS.reduce((prev, curr) => {
    const prevDistance = locationDistance(targetLocation, prev);
    const currDistance = locationDistance(targetLocation, curr);
    return prevDistance < currDistance ? prev : curr;
  });
};

const prefix = "brolly";

export const getItem = name => {
  return JSON.parse(window.localStorage.getItem(`${prefix}_${name}`));
};

export const setItem = (name, value) => {
  return window.localStorage.setItem(
    `${prefix}_${name}`,
    JSON.stringify(value)
  );
};

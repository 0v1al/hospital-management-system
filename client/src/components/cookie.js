import cookie from "react-cookies";

export const setCookie = (key, value, time) => {
  const expires = new Date();
  expires.setDate(Date.now() + time);
  cookie.save(`${key}`, `${value}`, { 
    path: "/",
    expires,
    secure: false
  });
};

export const getCookie = key => cookie.load(`${key}`);

export const getCookies = () => cookie.loadAll();

export const selectCookie = regex => cookie.select(regex);

export const removeCookie = key => {
  cookie.remove(`${key}`, { path: "/" });
};

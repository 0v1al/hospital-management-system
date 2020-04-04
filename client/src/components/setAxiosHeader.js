import axios from "axios";

const setAxiosHeader = token => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export default setAxiosHeader;
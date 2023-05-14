import axios from "axios";

const apiKey = "ovFtyrXw4vRM4nTdxzi2uKiefZicXxBc";
const config = {
  headers: {
    apikey: apiKey,
  },
};

export const api = axios.create({
  baseURL: "https://api.apilayer.com/fixer/",
  ...config,
});

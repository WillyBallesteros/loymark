import HttpClient from "../services/HttpClient";

const ACTIVITIES = '/activities';

export const getActivitiesAsync = () => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.get(`${ACTIVITIES}`, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};


import HttpClient from "../services/HttpClient";

const USERS = '/users';

export const getUsersAsync = () => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.get(`${USERS}`, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getUserByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.get(`${USERS}/${id}`, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const createUserAsync = (body) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.post(`${USERS}`, body, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const deleteUserAsync = (id) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.delete(`${USERS}/${id}`, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const updateUserAsync = (body) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.put(`${USERS}`, body, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

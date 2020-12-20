import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:5000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
    })
    .then((response) => {
      if (response.data.result) {
        return response.data.result.email;
      }
      return response.data.error;
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:5000/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      if (response.data.token) {
        if (response.data.blocked) {
          return response.data.blocked;
        } else {
          localStorage.setItem("usertoken", response.data.token);
          localStorage.setItem("useremail", response.data.email);
          localStorage.setItem("admin", response.data.admin);
          localStorage.setItem("welcomed", response.data.welcomed);
          localStorage.setItem("loggedIn", true);
          if (response.data.admin === true) {
            localStorage.setItem("profile", "admin");
          } else {
            localStorage.setItem("profile", "normal");
          }
          return response.data.token;
        }
      }
      return response.data.error;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

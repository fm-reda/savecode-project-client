import axios from "axios";
// import { resolve } from "path";

const url = "http://localhost:8000/";
export const getCategories = async () => {
  return await axios
    .get(url + "api/v1/categorie", {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.userToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
};

export const createCategory = (newCat) => {
  console.log(newCat);
  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/categorie", newCat, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.userToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateCategory = (categories) => {
  console.log(categories);
  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/updatecategories", categories, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.userToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err.response;
      console.log(err);
    });
};
export const getSingleCategory = (categories) => {
  // console.log(newCat);
  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/singleCategories", categories, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.userToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err.response;
      console.log(err);
    });
};

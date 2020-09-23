import axios from "axios";
// import { resolve } from "path";

const url = process.env.REACT_APP_URL;
export const createSubCategory = (newSub) => {
//   console.log(newSub);
  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/subcategories", newSub, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.userToken}`,
      },
    })
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      // console.log(err);
    });
};

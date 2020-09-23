import axios from "axios";
// import { resolve } from "path";

const url = process.env.REACT_APP_URL;
export const getCategories = async () => {
  return await axios
    .get(url + "api/v1/categorie", {
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
      return err.response;
    });
};

export const createCategory = (newCat) => {

  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/categorie", newCat, {
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
export const updateCategory = (categories) => {
 
  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/updatecategories", categories, {
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
      // console.log(res);
      return res;
    })
    .catch((err) => {
      return err.response;
      console.log(err);
    });
};
export const updateSingleCat = (category) => {
  // console.log(categories);
  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/update-category", category, {
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
      return err.response;
      console.log(err);
    });
};

export const categoryDelete = (id) => {
  // console.log(id);

  return axios
    .delete(url + `api/v1/categorie/${id}`, {
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
      return err.response;
      console.log(err);
    });
};

//Subcategory  function
export const getSubByCategory = (id) => {
  // console.log(newCat);
  // console.log(localStorage.userToken);
  return axios
    .post(
      url + "api/v1/allSub",
      { category_id: id },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.userToken}`,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      // console.log(err.response);
      return err.response;
    });
};
export const subCategoryDelete = (id) => {
 

  return axios
    .delete(url + `api/v1/subcategories/${id}`, {
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
      return err.response;
      console.log(err);
    });
};
export const updateSingleSub = (sub) => {
  // console.log(categories);
  // console.log(localStorage.userToken);
  return axios
    .post(url + "api/v1/update-sub", sub, {
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
      return err.response;
      console.log(err);
    });
};

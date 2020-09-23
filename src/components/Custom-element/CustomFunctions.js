import axios from "axios";
import { resolve } from "path";
const token = "Bearer " + localStorage.getItem("userToken");
const tokentest =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNTIyN2Q1N2U5NGM3YzQ5NzdlMmNjN2FjMDRmN2U3OTNiNDkyNzkxYTg0ZDY0Nzk1MTQyYzMxNGE3MDE5MWU2MmM5NDU0YjFlNzhlNGVhZWUiLCJpYXQiOjE1OTI5NzU1NDEsIm5iZiI6MTU5Mjk3NTU0MSwiZXhwIjoxNjI0NTExNTQxLCJzdWIiOiIxMzMiLCJzY29wZXMiOltdfQ.J_lr0TAUm5EFLSA-9B3RCJ3ZRNG07Pt1yMgB41T8tXaWNACsd1QFHntzpO-SUwZqVUnmFCktU6cck6a6bBkJl2F3g-IyJjtv_OkkHbgpgPuPYyOrJZQw--fr9EuLRThQxkP42AhR84jG4Oezw1pAzAcvrLZNgng6LqYZuofEsws3ndRTwTVQoBmuHcd-wnWHRwA7WIYdG8sZoWiCFH3Z4wmgA8xDn21NvFgUrKrqtp9futb6NR40t6-AcDdRzf6tWKKFX_RgFVop__nPzxy4JrELWZGD2s9U0TWi9mmdnTk2Nfa3zTDMUstxnAgXIrkc5yWIlrJiYU-OaPNm-e-ibD_m5fQKPxVsZRbPFdqzoy2Ug4z-H5CkQRLrcMim5uf6kpg-S8veo6amwPuIsYcjb-o6lIT6mcf4w2mNJNsMcPv5YLxC__wK60lN_EzWKq00sUWjv6LJ3UXNVkFRmIHPTH8CAR6pU_uWu3lcKp2F1Ctc3Qi8SCk3odmMcn9WZplWoZEqWqGJx-OY6uD2YoZ-piw9JaV-R_-pnmlIAjTPMywz1D3Kg9kc5Reo-pBGeSEh5tQSJlmpgT51ktTq9334tMerC53OQLyliJAjg09SUCNzWi0KKjGBI_whaSjySCUMu4NR6T3mOJINTXJQQjotdGCMIC8pCROaGnJIC2hnYRw";

const url = process.env.REACT_APP_URL;
export const createCustomStarted = (newCategory) => {


  // return localStorage.getItem("userToken");

  return axios
    .post(url + "api/v1/custom-started", newCategory, {
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
      // console.log(err.response);
      return err.response;
    });
};
export const customBycategory = (categories) => {
  return axios
    .post(url + "api/v1/custom-category", categories, {
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
export const singleElement = (id) => {
  console.log(id);
  return axios
    .get(url + `api/v1/elements/${id}`, {
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
export const customDelete = (id) => {


  return axios
    .delete(url + `api/v1/customs/${id}`, {
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

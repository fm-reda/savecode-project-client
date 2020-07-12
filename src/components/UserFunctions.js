import axios from "axios";
import { resolve } from "path";

const url = "http://localhost:8000/";
export const register = (newUser) => {
  return axios
    .post(url + "api/v1/register", newUser, {
      headers: { "content-type": "application/json" },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = (user) => {
  // console.log("login function");
  return axios
    .post(
      ` ${url}api/v1/login`,
      {
        email: user.email,
        password: user.password,
      },
      {
        headers: { "content-type": "application/json" },
      }
    )
    .then((res) => {
      localStorage.setItem("userToken", res.data.access_token);
      console.log(res);

      return res;
      // console.log(res);
      // if (res.status == 401) {
      //   console.log("not found");
      // }
    })
    .catch((err) => {
      return err.response;
      // console.log(err.response);
    });
};

export const profile = async () => {
  // console.log("in profile function");
  const token = "Bearer " + localStorage.getItem("userToken");
  // console.log(token);
  // console.log(token);
  return await axios
    .get(`${url}api/v1/details`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err.response;
      console.log(err.response);
    });
};

// download file function

// export const download = async () => {
//   const urlD = ` ${url}api/v1/file`;
//   await axios
//     .get(urlD)
//     .then((res) => {
//       const img64 = Buffer.from(res.data, "binary").toString("base64");
//       // console.log(img64);
//       return localStorage.setItem("userToken", res.data.access_token);
//       // console.log(res.data);

//       // console.log(res.headers.get('Con'));
//       // return res;
//     })

//     // .then((res) => res.json())
//     // .then((json) => {
//     //   console.log(json);
//     // })
//     .catch((err) => {
//       return err.response;
//       console.log(err.response);
//     });
// };

// const urlD = ` ${url}api/v1/file`;
//   const path = Path.resolve(__dirname, "images", "user.pnj");

//   const response = axios({
//     method: "GET",
//     url: urlD,
//     responseType: "blob",
//   });
//   // response.data.pipe(Fs.createWriteStream(path));

//   return new Promise((resolve, reject) => {
//     // resolve();
//     console.log(response);
//     response.data.on("end", () => {
//       resolve();
//       console.log(response.data);
//     });
//     // response.data.on("error", (err) => {
//     //   reject(err);
//     // });
//   });
//   console.log(response);

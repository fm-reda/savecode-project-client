import React, { useState, useEffect } from "react";
import { profile, download } from "./UserFunctions";
import {
  Text,
  Box,
  Stack,
  Heading,
  Avatar,
  Button,
  Image,
  Flex,
} from "@chakra-ui/core";
import { Router } from "react-router-dom";
import Axios from "axios";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    profile().then((res) => {
      // console.log(res.status);
      if (!res) {
        console.log(res);
        props.history.push("/login");
      } else if (localStorage.getItem("userToken")) {
        setStatus(true);
        setName(res.data.success.name);
        setAvatar(res.data.success.avatar);
        // console.log(res.data.success.avatar);
      } else if (res && res.status == 401) {
        props.history.push("/login");
      }
      // console.log(res.data.success.name);
    });
    // download().then((resu) => {
    //   console.log(resu);
    // });
  }, []);
  const download = () => {
    console.log("clicked");
    const urlD = `http://localhost:8000/api/v1/file`;
    Axios.get(urlD)
      .then((res) => {
        console.log(res.data);
        const img64 = Buffer.from(res.data, "binary").toString("base64");
        // console.log(img64);
        setAvatar(res);
      })

      .catch((err) => {
        return err.response;
        console.log(err.response);
      });
  };
  return (
    <>
      {status && (
        <Stack>
          <Flex mt="120px" bg="#12FFF6" p="20px" mx="auto">
            <Avatar
              fontSize="50px"
              mr={2}
              name="Dan Abrahmov"
              src={`http://localhost:8000/storage/${localStorage.getItem(
                "avatar"
              )}`}
            />
            <Heading>hello Mr. {name} </Heading>
            {/* {`data:image/jpeg;base64,${data}`} */}
          </Flex>
        </Stack>
      )}
    </>
  );
};

export default Profile;

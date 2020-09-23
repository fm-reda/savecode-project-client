import React, { useState } from "react";
import { Stack, Box, Flex, Heading, Text } from "@chakra-ui/core";
import Register from "../Register";
import { useContext } from "react";
import { UserContext } from "./../../App";
import { login } from "../UserFunctions";
import illus1 from "./../../images/Back-ground/laptop.jpg";
import logo from "./../../images/Logo/logo6.png";
import { Link } from "react-router-dom";

export const RegisterPage = (props) => {
  const { handleLogin, rendering } = props;
  // console.log(props);
  //   const user = useContext(UserContext);
  //   const { handleLogin } = props;
  //   console.log(user);
  const handleSubmit = (e, pass) => {
    // console.log("submit");
    const user = {
      email: e.success.email,
      password: pass,
    };
    // console.log(e);
    // console.log(pass);
    login(user).then((res) => {
      // console.log("test");
      // console.log(res);
      if (res && res.status == 200) {
        // handleLogin(res, pass, "register");
        // console.log(res);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("avatar", res.data.user.avatar);
        // setRender(!render);
        rendering();
        setTimeout(() => {
          props.history.push("/home");
        }, 1000);
        // setLoggedInStatus(localStorage.getItem("userToken"));
      }
    });
    // console.log(e);
    // handleLogin(e, { pass: pass, startedStatus: false });

    // props.history.push("/profile");
  };

  return (
    <>
      <Stack>
        <Box mt="130px" h="100vh">
          <Flex
            w="900px"
            mx="auto"
            // h="500px"
            align="center"
            borderWidth="1px"
            shadow="xl"
            rounded="lg"
          >
            <Box
              w="60%"
              h="100%"
              bgImage={`url('${illus1}')`}
              bgPos="center"
              bgSize="cover"
              bgRepeat="no-repeat"
            >
              <Box bg="#00000091" zIndex="2" w="100%" h="500px" roundedLeft="lg">
                {" "}
                <Heading
                  textAlign={["left", "center"]}
                  fontWeight="600"
                  p="50px"
                  color="#fff"
                  fontSize="50px"
                  pt="130px"
                >
                  Sign up
                </Heading>
                <Box color="#ccc" fontSize="20px" p={2} textAlign="center">
                  <Text>&ldquo; is much better when u have an account</Text>
                  <Text>Get yourself one &rdquo;</Text>
                  <Text p={5} fontSize="25px" textAlign="right">
                    - Save Code
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box bg="#FFF" align="center" w="60%" h="100%">
              <Box
                mx="auto"
                bgImage={`url('${logo}')`}
                bgPos="center"
                bgSize="50%"
                bgRepeat="no-repeat"
                w="20%"
                h="20%"
                rounded="lg"
              ></Box>
              <Register handleSubmit={handleSubmit} />
              <Flex justify="center">
                {" "}
                <Text mr="20px" textAlign="center">
                  Already have account?
                </Text>
                <Link to="/login">
                  <Text color="#0297e0" fontWeight="600" fontSize="15px">
                    Sign in
                  </Text>
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </>
  );
};

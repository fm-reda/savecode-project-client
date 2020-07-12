import React, { useState } from "react";
import { Stack, Box, Flex, Heading, Text, Button } from "@chakra-ui/core";
import Register from "../Register";
import { useContext } from "react";
import { UserContext } from "../../App";
import { login } from "../UserFunctions";
import illus1 from "./../../images/Back-ground/login2.jpg";
import logo from "./../../images/Logo/logo6.png";
import { Link } from "react-router-dom";
import Login from "../Login";

export const LoginPage = (props) => {
  // const [t, setT] = useState("");
  const { handleLogin, setLoggedInStatus } = props;
  // console.log(setLoggedInStatus);
  //   console.log(props);
  //   const user = useContext(UserContext);
  //   const { handleLogin } = props;
  //   console.log(user);
  const goRedirect = () => {
    setLoggedInStatus(true);
    // handleLogin();
    // const user = {
    //   email: e.success.email,
    //   password: pass,
    // };
    // console.log(e);
    // console.log(pass);
    //function login
    // login(user).then((res) => {
    //   if (res && res.status == 200) {
    //     // console.log(res);
    //     localStorage.setItem("name", res.data.user.name);
    //     localStorage.setItem("avatar", res.data.user.avatar);
    //     setTimeout(() => {
    //       props.history.push("/");
    //     }, 1000);
    //   }
    // });
    //redirect
    props.history.push("/home");
  };

  return (
    <>
      <Stack>
        <Box mt="200px" h="100vh">
          <Flex
            w="900px"
            mx="auto"
            h="500px"
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
              <Box bg="#0297e081" zIndex="2" w="100%" h="100%" roundedLeft="lg">
                {" "}
                <Heading
                  textAlign={["left", "center"]}
                  fontWeight="600"
                  p="50px"
                  color="#fff"
                  fontSize="50px"
                  pt="130px"
                >
                  Sign In
                </Heading>
                <Flex justify="center" align="center">
                  {" "}
                  <Text mr="20px" color="#fff" textAlign="center">
                    Don't have an account?
                  </Text>
                  <Link to="/register">
                    <Button
                      rounded="50px"
                      color="#ff9e00"
                      fontWeight="600"
                      fontSize="15px"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Flex>
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
              <Login goRedirect={goRedirect} />
              {/* <Flex justify="center">
                {" "}
                <Text mr="20px" textAlign="center">
                  Already have account?
                </Text>
                <Link to="/login">
                  <Text color="#0297e0" fontWeight="600" fontSize="15px">
                    Sign in
                  </Text>
                </Link>
              </Flex> */}
            </Box>
          </Flex>
        </Box>
      </Stack>
    </>
  );
};

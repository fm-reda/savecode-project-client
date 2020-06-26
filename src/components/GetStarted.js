import React, { useState } from "react";

import { profile, login } from "./UserFunctions";
import {
  Stack,
  Box,
  Text,
  Button,
  ButtonGroup,
  Heading,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Divider,
} from "@chakra-ui/core";

import illus1 from "./../images/Back-ground/testing-default.svg";
import { motion } from "framer-motion";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Register";
import FirstElement from "./Element/FirstElement";
import RegisterWelcom from "./RegisterWelcom";
import { RegisterStarted } from "./Register.started";
import { ElementStarted } from "./Element.started";
import { createElementFunc } from "./ElementFunctions";

const MotionBox = motion.custom(Box);
function GetStarted(props) {
  const { handleLogin } = props;

  //   const { loggedInStatus } = props;
  // console.log(loggedInStatus);
  const [tabIndex, setTabIndex] = useState(0);
  const [registerSuccess, setRegisterSuccess] = useState({
    status: false,
  });
  const [nextStatus, setNextStatus] = useState(true);
  const [backStatus, setBackStatus] = useState(false);
  const [element, setElement] = useState({});
  const [full, setFull] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [loadingSignUp, setLoadingSignUp] = useState(false);

  //******************************************function create element
  const createElement = async (e) => {
    setLoading(true);
    await createElementFunc(e).then((res) => {
      if (res) {
        console.log(res);
        setTimeout(() => {
          setLoading(false);
          setNextStatus(true);
        }, 2000);
      } else {
        console.log("no rees");
      }
    });
    // console.log(e);
  };
  // ******************************************function cheking for tab buttons
  const handleTab = (e) => {
    if (tabIndex == 1) {
      setNextStatus(false);
      setBackStatus(false);
    }
    switch (e) {
      case "next":
        setTabIndex(tabIndex + 1);
        if (!registerSuccess.status && !full) {
          setNextStatus(false);
        } else if (full && tabIndex != 1) {
          // console.log("full" + full);
          setNextStatus(true);
        }
        setBackStatus(true);
        break;
      case "back":
        setTabIndex(tabIndex - 1);
        setNextStatus(true);
        break;

      default:
        break;
    }
  };
  // **********************************function check form element full or not
  const checkNext = (e, element) => {
    // switch (e) {
    //   case "empty":
    //     setNextStatus(false);
    //     break;
    //   case "full":
    //     setFull(true);
    //     console.log("full switch" + full);
    //     setNextStatus(true);
    //     const newElement = {
    //       title: element.title,
    //       code: element.code,
    //       description: element.description,
    //     };
    //     setElement(newElement);
    //     break;
    //   default:
    //     break;
    // }
  };
  // **********************************function validate registration
  const handleSubmit = (e, pass) => {
    // console.log(localStorage);

    setRegisterSuccess({
      name: localStorage.getItem("name"),
      status: false,
    });
    const user = {
      email: localStorage.getItem("email"),
      password: pass,
    };
    login(user).then((res) => {
      // console.log("test");
      // console.log(res);
      if (res && res.status == 200) {
        setNextStatus(true);
        console.log(res);
      }
      handleLogin(res);
    });

    // login user

    // props.history.push("/profile");
  };

  return (
    <Stack bg="#ebeeef" h="100%">
      {/* <Register /> */}
      <Box mt="150px" mx="auto" width="1000px" className="bg-tab" rounded="lg">
        <Tabs p={3} index={tabIndex} variant="soft-rounded" variantColor="blue">
          <Box justify="left">
            <TabList p={1} mb={2}>
              <Tab>Sign up</Tab>
              <Tab>Create Element</Tab>
              <Tab>Add to library</Tab>
            </TabList>
          </Box>

          {/* <Divider borderColor="#ccc" /> */}

          <TabPanels>
            {/* ****************************************Registration */}
            <TabPanel h="500px">
              <Flex color="#000" justify="space-around" h="100%">
                {/* <RegisterStarted handleSubmit={handleSubmit} /> */}
                {registerSuccess.status && (
                  <RegisterStarted
                    handleSubmit={handleSubmit}
                    // loadingSignUp={loadingSignUp}
                  />
                )}
                {!registerSuccess.status && <RegisterWelcom />}
              </Flex>
            </TabPanel>
            {/* ****************************************Create element  */}
            <TabPanel height="" maxHeight="" width="950px">
              <Flex color="#000" justify="space-around">
                <ElementStarted
                  createElement={createElement}
                  setNextStatus={setNextStatus}
                  loading={loading}
                />
              </Flex>
            </TabPanel>
            {/* ****************************************Add to library */}
            <TabPanel h="500px" width="950px">
              <Flex color="#000" justify="space-around">
                {/* <Box>2dqsdqsd</Box> */}
              </Flex>
            </TabPanel>
          </TabPanels>

          {/* <Divider borderColor="#ccc" /> */}

          <TabList bg="transparent">
            <Flex w="50%" align="center" justify="space-between" p={5}>
              <Box>
                {backStatus && (
                  <Button
                    mr={2}
                    leftIcon="arrow-back"
                    bg="transparent"
                    border="1px"
                    _hover={{ bg: "blue.500", color: " white" }}
                    // isDisabled={tabIndex == 0 ? true : false}
                    onClick={() => handleTab("back")}
                    // onClick={() => setTabIndex(tabIndex - 1)}
                  >
                    Back
                  </Button>
                )}
              </Box>

              {nextStatus && (
                <Button
                  mr={2}
                  rightIcon="arrow-forward"
                  bg="#fff"
                  border="1px"
                  _hover={{ bg: "blue.500", color: " white" }}
                  // isDisabled={tabIndex == 1 || nextStatus ? true : false}
                  onClick={() => handleTab("next")}
                  // onClick={() => setTabIndex(tabIndex + 1)}
                >
                  Next step
                </Button>
              )}
              {/* <Button
                mr={2}
                rightIcon="arrow-forward"
                bg="transparent"
                border="1px"
                _hover={{ bg: "blue.500", color: " white" }}
                isDisabled={tabIndex == 2 ? true : false}
                onClick={() => setTabIndex(tabIndex + 1)}
              >
                Next
              </Button> */}
            </Flex>
          </TabList>
        </Tabs>

        {/* Fin container */}
      </Box>

      <Box
        mt="120px"
        width="850px"
        mx="auto"
        //  borderWidth="1px"
      ></Box>
    </Stack>
  );
}

export default GetStarted;

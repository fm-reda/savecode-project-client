import React, { useState, useContext } from "react";

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

import illus1 from "./../images/Back-ground/laptop.jpg";
import { motion } from "framer-motion";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Register";

import RegisterWelcom from "./RegisterWelcom";
import { RegisterStarted } from "./Register.started";
import { ElementStarted } from "./Element.started";
import { createElementFunc } from "./ElementFunctions";
import { LibraryStarted } from "./Custom-element/LibraryStarted";
import { LogStatusContext } from "../App";

export const SubmitStartedContext = React.createContext();

const MotionBox = motion.custom(Box);
function GetStarted(props) {
  const rendering = useContext(LogStatusContext);
  const { handleLogin } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const [registerSuccess, setRegisterSuccess] = useState({
    status: true,
  });
  const [nextStatus, setNextStatus] = useState(false);
  const [backStatus, setBackStatus] = useState(false);
  // const [element, setElement] = useState({});
  const [datas, setDatas] = useState({});
  const [full, setFull] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newElement, setNewElement] = useState({});
  // const [loadingSignUp, setLoadingSignUp] = useState(false);

  //******************************************function create element
  const responseElement = (e) => {
    setNewElement(e);
  };
  const finish = () => {
    rendering();
    props.history.push("/");
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
  //recover if error
  const storeDatas = (e) => {
    // setDatas(e);
    // console.log(e);
  };
  // **********************************function validate registration
  const handleSubmitStarted = (e, pass) => {
    // console.log("handle");
    setRegisterSuccess({
      name: localStorage.getItem("name"),
      status: false,
    });
    const user = {
      email: e.success.email,
      password: pass,
    };
    // console.log(user);
    // console.log(e);

    // call function login from App in case Started
    handleLogin(e, pass, "started");
    setNextStatus(true);

    // props.history.push("/profile");
  };

  return (
    <Stack bg="#ebeeef">
      {/* <Register /> */}
      <Box
        h="100vh"
        mt="100px"
        bgImage={`url('${illus1}')`}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        p="120px"
      >
        <Box
          mx="auto"
          width="1000px"
          className="bg-tab"
          rounded="lg"
          shadow="lg"
        >
          <Tabs
            p={3}
            index={tabIndex}
            variant="soft-rounded"
            variantColor="blue"
          >
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
                  {/* <LogContext.Provider value={handleLogin}> */}
                  <SubmitStartedContext.Provider value={handleSubmitStarted}>
                    {/* <RegisterStarted handleSubmit={handleSubmit} /> */}
                    {registerSuccess.status && (
                      <RegisterStarted
                      // handleSubmitStarted={handleSubmitStarted}
                      // loadingSignUp={loadingSignUp}
                      />
                    )}
                    {!registerSuccess.status && <RegisterWelcom />}
                  </SubmitStartedContext.Provider>
                </Flex>
              </TabPanel>
              {/* ****************************************Create element  */}
              <TabPanel height="" maxHeight="" width="1000px">
                <Flex color="#000" justify="space-around">
                  <ElementStarted
                    responseElement={responseElement}
                    setNextStatus={setNextStatus}
                    loading={loading}
                    // storeDatas={storeDatas}
                  />
                </Flex>
              </TabPanel>
              {/* ****************************************Add to library */}
              <TabPanel width="1000px">
                <Flex color="#000" justify="space-around">
                  {tabIndex == 2 && (
                    <LibraryStarted
                      // datas={datas}
                      newElement={newElement}
                      finish={finish}
                    />
                  )}
                  {/* <LibraryStarted datas={datas} newElement={newElement} /> */}
                </Flex>
              </TabPanel>
            </TabPanels>

            {/* <Divider borderColor="#ccc" /> */}

            <TabList bg="transparent">
              <Flex w="45%" align="center" justify="space-between" p={5}>
                <Box>
                  {backStatus && (
                    <Button
                      mr={2}
                      leftIcon="arrow-back"
                      bg="transparent"
                      border="1px"
                      _hover={{ bg: "#ff9e00", color: " white" }}
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
                    _hover={{ bg: "#ff9e00", color: " white" }}
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
      </Box>
    </Stack>
  );
}

export default GetStarted;

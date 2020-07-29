import React, { useState, useContext } from "react";
import {
  uploadAvatar,
  profile,
  updateUser,
} from "./../../components/UserFunctions";
import {
  Stack,
  Heading,
  Box,
  Avatar,
  Button,
  Flex,
  Text,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useToast,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/core";
import { LogStatusContext } from "../../App";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

export const Profile = (props) => {
  const rendering = useContext(LogStatusContext);

  const hiddenFileInput = React.useRef(null);
  const [render, setrender] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [user, setUser] = useState([]);
  const [datas, setDatas] = useState({});
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const toast = useToast();
  const [requestStatus, setRequestStatus] = useState(true);
  const [loadUpdate, setLoadUpdate] = useState(false);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  useEffect(() => {
    profile().then((res) => {
      if (res && (res.status === 200)) {
        setUser(res.data.success);
        setEmail(res.data.success.email);
        setDatas({
          name: res.data.success.name,
          email: res.data.success.email,
        });
        setRequestStatus(false);
      }
    });
  }, []);
  //   const handleClick = (event) => {
  //     hiddenFileInput.current.click();
  //   };

  const handleChange = (e) => {
    // setdisable(false);

    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }
    //save data in state
    // console.log(e.target.value);

    setDatas({ ...datas, [e.target.id]: e.target.value });
    // inputChange({ ...datas, [e.target.id]: e.target.value });
    console.log(datas);
  };
  const handleSubmit = (e) => {
    setLoadUpdate(true);
    e.preventDefault();
    if (!datas.name || !datas.email) {
      // setdisable(true);
      setErrors({ msg: "Field or many are empty" });
      setShowAlert(true);
      setTimeout(() => {
        setLoadUpdate(false);
      }, 2000);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else {
    
      setTimeout(() => {
        updateUser(datas).then((res) => {
          // setLoadCreateElm(false);
          // console.log(res);
          if (res) {
            if (res.status == 200) {
              setDatas({
                name: res.data.user.name,
                email: res.data.user.email,
              });

           
              setUpdateStatus(false);
              setLoadUpdate(false);

              toast({
                title: `Mr.${datas.name}.`,
                description: "Your information has been updated.",
                status: "success",
                duration: 10000,
                isClosable: true,
                position: "top",
              });
              // setdisable(true);
              // props.history.push("/");
            } else if (res.status === 401) {
              setShowAlert(true);
              setErrors({ msg: " not authorized " });
            } else if (res.status === 500) {
              setShowAlert(true);
              setErrors({ msg: " Error conection " });
            } else if (res.status == 208) {
              setShowAlert(true);
              console.log("email alreadyy");
              setErrors({ msg: " Email Already exist " });
              setTimeout(() => {
                setShowAlert(false);
              }, 5000);
            }
         
          } else {
            // setLoadCreateElm(false);
            // setShowAlert(true);
            setErrors({
              msg: "The server not responding. Please try again ",
            });
          }
        });
        setLoadUpdate(false);
      }, 1000);
    }
  };
  const handleEdit = (e) => {
    setUpdateStatus(true);
  
    e.preventDefault();
 

 
  };
  const handleAvatar = (e) => {
    setRequestStatus(true);
    // console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    uploadAvatar(formData).then((res) => {
      console.log(res);
      localStorage.setItem("avatar", res.data.user.avatar);
      //   setrender(!render);
      rendering();
      setRequestStatus(false);
    });
    // setSelectedFile()

    const fileUploaded = e.target.files[0];
    // props.handleFile(fileUploaded);
  };
  return (
    <>
      {/* {showAlert && (
        <Alert mb={5} status="error">
          <AlertIcon />
          {errors.msg}
        </Alert>
      )} */}
      {!localStorage.userToken ? (
        <Redirect to="/login" />
      ) : (
        <Stack ml="15%" mt="5.5%" bg="bgGray" minH="100vh" pb="400px">
          <Flex p={5} justifyContent="center" mt={5}>
            <Box w="60%" rounded="md" shadow="lg" p={5} bg="#FFF" pb="100px">
              <Heading color="myYellow" mb={5}>
                Profile
              </Heading>
              {showAlert && (
                <Alert mb={5} status="error">
                  <AlertIcon />
                  {errors.msg}
                </Alert>
              )}
              <Divider></Divider>
              {requestStatus ? (
                <Spinner></Spinner>
              ) : (
                <Flex
                  direction="column"
                  w="15%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    size="2xl"
                    // mr={2}
                    mb={2}
                    name="Dan Abrahmov"
                    src={`http://localhost:8000/storage/users/${localStorage.getItem(
                      "avatar"
                    )}`}
                  />

                  <Button
                    mb={5}
                    // mx="auto"
                    rounded="50px"
                    variantColor="outline"
                    bg="myYellow"
                    onClick={handleClick}
                  >
                    Change
                  </Button>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleAvatar}
                    style={{
                      display: "none",
                    }} /* Make the file input element invisible */
                  />
                </Flex>
              )}

              <Divider></Divider>
              <Box>
                <Heading color="myYellow"> Infos</Heading>
                <Flex fontSize="30px" p={3}>
                  <Box flex="1">
                    <Text mr={5}>Name :</Text>
                    <Text mr={5}>Email :</Text>
                  </Box>
                  {/* *******************************************************Show infos */}
                  {!updateStatus ? (
                    <Box color="myBlue" flex="4">
                      <Text mr={5}> {datas.name}</Text>
                      <Text mr={5}> {datas.email}</Text>
                    </Box>
                  ) : (
                    <Box flex="4">
                      <Box>
                        <FormControl mb={3}>
                          <Flex>
                            <Input
                              // isDisabled={true}
                              isInvalid={errors.title ? true : false}
                              errorBorderColor="crimson"
                              focusBorderColor="lime"
                              onChange={(e) => handleChange(e)}
                              id="name"
                              placeholder=""
                              value={datas.name}
                              mr={3}
                            />
                            <FormHelperText
                              color="crimson"
                              id="email-helper-text"
                            >
                              {errors.name ? errors.name : ""}
                            </FormHelperText>
                          </Flex>
                        </FormControl>
                      </Box>
                      <Box w="100%">
                        <FormControl>
                          <Flex>
                            <Input
                              // isDisabled={true}
                              isInvalid={errors.title ? true : false}
                              errorBorderColor="crimson"
                              focusBorderColor="lime"
                              onChange={(e) => handleChange(e)}
                              id="email"
                              placeholder=""
                              value={datas.email}
                              mr={3}
                            />
                            <FormHelperText
                              color="crimson"
                              id="email-helper-text"
                            >
                              {errors.email ? errors.email : ""}
                            </FormHelperText>
                          </Flex>
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {/* ******************************************************* input infos */}

                  {/* *******************************************************END > Show infos */}
                </Flex>
                {/* *******************************************************END > infos */}
                <Flex justifyContent="center" mt="50px">
                  {updateStatus ? (
                    <Button
                      isLoading={loadUpdate}
                      loadingText="Updating..."
                      bg="blue.500"
                      color="#FFF"
                      variantColor="outline"
                      onClick={handleSubmit}
                      _hover={{ bg: "blue.300" }}
                    >
                      Confirm
                    </Button>
                  ) : (
                    <Button
                      // bg="green.500"
                      // bg="green.500"
                      //  bg="#01ab0b"
                      borderColor="green.500"
                      border="1px"
                      color="#000"
                      // variantColor="outline"
                      onClick={handleEdit}
                      _hover={{ bg: "green.500", color: "#fff" }}
                    >
                      Update
                    </Button>
                  )}
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Stack>
      )}
    </>
  );
};

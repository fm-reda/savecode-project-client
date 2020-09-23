import React, { useState, useContext } from "react";
import {
  Stack,
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Button,
  PseudoBox,
  useToast,
  FormControl,
  Input,
  FormHelperText,
  Alert,
  AlertIcon,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/core";
import Parser from "html-react-parser";

import { useEffect } from "react";
import { customBycategory } from "./CustomFunctions";
import "./../../App.css";
import { Link, NavLink, Redirect } from "react-router-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { SingleCustomPage } from "../pages/SingleCustomPage";
import {
  getSingleCategory,
  updateCategory,
} from "../../components/Category/CategoryFunctions";
import { LogStatusContext } from "../../App";
import bannerCustom from "./../../images/Back-ground/web.jpg";

const SingleCustom = (props) => {
  const rendering = useContext(LogStatusContext);

  // console.log(props);
  const { category, subCategory } = props.match.params;
  // console.log(category);
  // console.log(subCategory);

  const [customs, setCustoms] = useState([]);
  // const [showCode, setShowCode] = useState(false);

  const [render, setrender] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  // const [user, setUser] = useState([]);
  const [datas, setDatas] = useState({});
  const [category_id, setCategory_id] = useState("");
  const [subCategory_id, setSubCategory_id] = useState("");
  const [errors, setErrors] = useState([]);
  // const [name, setName] = useState("");
  // const [subCategory, setsubCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const toast = useToast();
  const [requestStatusCustom, setRequestStatusCustom] = useState(true);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [categoryInit, setCategoryInit] = useState(category);
  const [subCategoryInit, setSubCategoryInit] = useState(subCategory);
  const [msg, setMsg] = useState("");

  // console.log(category, subCategory);
  useEffect(() => {
    setMsg("");
    setRequestStatusCustom(true);
    // console.log("test");
    getSingleCategory({
      category: category,
      subCategory: subCategory,
    }).then((res) => {
      if (res && res.status === 200) {
        setDatas({
          ...datas,
          category_id: res.data.category.id,
          sub_category_id: res.data.subCategory.id,
          category: res.data.category.title,
          subCategory: res.data.subCategory.title,
        });
      }
      // setCategory(category);
      // setSubCategory(subCategory);
      // setCategory_id(res.data.category.id);
      // setSubCategory_id(res.data.SubCategory.id);
    });
    // setDatas({ category: category, subCategory: subCategory });

    customBycategory({ category: category, subCategory: subCategory }).then(
      (res) => {
        if (res.status === 200) {
          // console.log(res);
          setCustoms(res.data.success.customs);
          setRequestStatusCustom(false);
          // console.log(res.data.success.customs);
        } else if (res.status === 205) {
          setMsg("Category Not Found");
          console.log("category not found");
          setCustoms([]);
        } else if (res.status === 206) {
          console.log("subcategory not found");
          setMsg("Category Not Found");

          setCustoms([]);
        } else if (res.status === 207) {
          console.log("custom not found");
          setMsg("No element for this categories");
          setRequestStatusCustom(false);

          setCustoms([]);
        }

        // console.log(res.data.success.customs);
      }
    );
  }, [subCategory, category]);
  // const handleHover = (e) => {
  //   // console.log(e.element.code);
  //   setTimeout(() => {
  //     setShowCode(e.element.id);
  //   }, 1000);
  //   setShowCode(false);
  // };
  // const handleMouseLeave = () => {
  //   setShowCode(false);
  // };

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
    // console.log(datas);
  };
  const handleEdit = () => {
    setUpdateStatus(true);
    // setDatas({ category: category, subCategory: subCategory });
    // setTimeout(() => {
    //   setUpdateStatus(false);
    // }, 10000);
  };
  const handleSubmit = (e) => {
    setLoadUpdate(true);
    e.preventDefault();
    if (!datas.category || !datas.subCategory) {
      // setdisable(true);
      setErrors({ msg: "Field or many are empty" });
      setShowAlert(true);
      // setDatas({
      //   ...datas,
      //   // category_id: res.data.category.id,
      //   // subCategory_id: res.data.subCategory.id,
      //   category: datas.category,
      //   subCategory: datas.subCategory,
      // });
      setTimeout(() => {
        setDatas({
          ...datas,
          // category_id: res.data.category.id,
          // subCategory_id: res.data.subCategory.id,
          category: categoryInit,
          subCategory: subCategoryInit,
        });
      }, 2000);

      setTimeout(() => {
        setLoadUpdate(false);
      }, 2000);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else {
      // updateCategory(datas).then((res) => {

      // });
      setTimeout(() => {
        updateCategory(datas).then((res) => {
          // setLoadCreateElm(false);
          // console.log(res);
          if (res) {
            if (res.status == 200) {
              // console.log(res);
              setDatas({
                ...datas,
                category: res.data.category.title,
                subCategory: res.data.subCategory.title,
              });
              setUpdateStatus(false);
              setLoadUpdate(false);
              toast({
                title: `Categories Update.`,
                description: "Your information has been updated.",
                status: "success",
                duration: 10000,
                isClosable: true,
                position: "top",
              });
              rendering();
              props.history.push(
                `/custom/${res.data.category.slug}/${res.data.subCategory.slug}`
              );
            } else if (res.status === 401) {
              setShowAlert(true);
              setErrors({ msg: " not authorized " });
            } else if (res.status === 206) {
              setShowAlert(true);
              setErrors({
                msg: `Sub category : "${res.data.subCategory}" already exist`,
              });
              setTimeout(() => {
                setDatas({
                  ...datas,
                  // category_id: res.data.category.id,
                  // subCategory_id: res.data.subCategory.id,
                  category: categoryInit,
                  subCategory: subCategoryInit,
                });
              }, 2000);
            } else if (res.status === 500) {
              setShowAlert(true);
              setErrors({ msg: " Error conection " });
            } else if (res.status == 203) {
              setShowAlert(true);
              // console.log("email alreadyy");
              setErrors({
                msg: `Category : "${res.data.category}" already exist`,
              });
              setTimeout(() => {
                setDatas({
                  ...datas,
                  // category_id: res.data.category.id,
                  // subCategory_id: res.data.subCategory.id,
                  category: categoryInit,
                  subCategory: subCategoryInit,
                });
              }, 2000);
            }
            setTimeout(() => {
              setShowAlert(false);
            }, 5000);
          } else {
            // setLoadCreateElm(false);
            // setShowAlert(true);
            setErrors({
              msg: "The server not responding. Please try again ",
            });
          }
        });
        setLoadUpdate(false);
        setUpdateStatus(false);
      }, 1000);
    }
  };
  return (
    <>
      {!localStorage.userToken ? (
        <Redirect to="/login" />
      ) : (
        <Stack ml="15%" mt="100px" p={5} bg="bgGray" minH="92vh" className="">
          <Box mx="auto" w="100%">
            {/* <Box
                mx="auto"
                bgImage={`url('${logo}')`}
                bgPos="center"
                bgSize="50%"
                bgRepeat="no-repeat"
                w="20%"
                h="20%"
                rounded="lg"
              ></Box> */}

            <Box
              bgImage={`url('${bannerCustom}')`}
              bgPos="center"
              bgSize="cover"
              bgRepeat="no-repeat"
              // mx="auto"
              h="150px"
              // bg="#000"
              bg="#fff"
              // w="110%"
              // ml="-20px"
              // mt="4%"
              // mt={5}
              color="#000"
              roundedTop="lg"
              shadow="lg"
            >
              <Box
                bg="#56797481"
                zIndex="2"
                w="100%"
                h="100%"
                roundedTop="lg"
                p={5}
              >
                {showAlert && (
                  <Alert mb={5} status="error">
                    <AlertIcon />
                    {errors.msg}
                  </Alert>
                )}
                {/* <Heading fontSize="30px" textTransform="uppercase">
            Category : {category}
          </Heading>
          <Heading color="myYellow" fontSize="25px">
            {subCategory}
          </Heading> */}

                <Flex
                  fontSize="30px"
                  // justifyContent="space-between"
                >
                  <Flex>
                    <Box>
                      <Text mr={5}>Category :</Text>
                      <Text mr={5}>Sub :</Text>
                    </Box>
                    {/* *******************************************************Show infos */}
                    {!updateStatus ? (
                      <Box>
                        <Text mr={5} color="#FFF" textTransform="uppercase">
                          {" "}
                          {datas.category}
                        </Text>
                        <Text mr={5} color="#FFF">
                          {" "}
                          {datas.subCategory}
                        </Text>
                      </Box>
                    ) : (
                      <Box>
                        <Box>
                          <FormControl mb={3}>
                            <Flex>
                              <Input
                                // isDisabled={true}
                                isInvalid={errors.category ? true : false}
                                errorBorderColor="crimson"
                                focusBorderColor="lime"
                                onChange={(e) => handleChange(e)}
                                id="category"
                                placeholder=""
                                value={datas.category}
                                mr={3}
                              />
                              <FormHelperText
                                color="crimson"
                                id="email-helper-text"
                              >
                                {errors.category ? errors.category : ""}
                              </FormHelperText>
                            </Flex>
                          </FormControl>
                        </Box>
                        <Box w="100%">
                          <FormControl>
                            <Flex>
                              <Input
                                // isDisabled={true}
                                isInvalid={errors.subCategory ? true : false}
                                errorBorderColor="crimson"
                                focusBorderColor="lime"
                                onChange={(e) => handleChange(e)}
                                id="subCategory"
                                placeholder=""
                                value={datas.subCategory}
                                mr={3}
                              />
                              <FormHelperText
                                color="crimson"
                                id="subCategory-helper-text"
                              >
                                {errors.subCategory ? errors.subCategory : ""}
                              </FormHelperText>
                            </Flex>
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                    {/* ******************************************************* input infos */}

                    {/* *******************************************************END > Show infos */}
                  </Flex>
                  <Box>
                    <Flex
                      justifyContent="center"
                      //  mt="50px"
                    >
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
                          Edit
                        </Button>
                      )}
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Box>
            {msg && (
              <Flex justifyContent="center" h="50vh" pt="50px" bg="#FFF">
                <Heading>{msg}</Heading>
              </Flex>
            )}
            {requestStatusCustom ? (
              <Flex
                justifyContent="center"
                h="50vh"
                align="center"
                // pt="50px"
                bg="#FFF"
              >
                <Box>
                  <Heading color="myYellow" mb={3}>
                    Searching elements, Please wait...
                  </Heading>
                  <Flex justifyContent="center">
                    <Spinner
                      textAlign="center"
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="100px"
                    />
                  </Flex>
                </Box>
              </Flex>
            ) : (
              // <Stack
              //   // justifyContent="center"
              //   align="center"
              //   // mt="3%"
              //   bg="#fff"
              //   // minH="100vh"
              //   className=""
              //   isInline
              //   // width="1430px"
              //   // w="100%"
              //   px={5}
              //   py="50px"
              //   shouldWrapChildren={true}
              //   flexWrap="wrap"
              // >
              <SimpleGrid
                mt="3%"
                // minChildWidth="30%"
                columns={3}
                spacing="10px"
              >
                {customs.map((item, i) => {
                  return (
                    <>
                      <PseudoBox
                        key={i}
                        rounded="md"
                        height="230px"
                        shadow="lg"
                        bg="#fff"
                        // width="430px"
                        // width="30%"
                        mb={5}
                        mx={3}
                        _hover={{
                          borderColor: "#564334",
                          border: "1px",
                          // bg: "#eeeeee23",
                          color: "#000",
                        }}
                        // width="100%"
                      >
                        <Flex
                          direction="column"
                          justifyContent="space-between"
                          h="100%"
                          pb={3}
                        >
                          <Box>
                            <Box bg="#567974" color="#FFF" p={3}>
                              <Heading fontSize="20px">
                                {" "}
                                {item.element.title.substring(0, 30) +
                                  (item.element.title.length > 29 ? "..." : "")}
                              </Heading>
                            </Box>
                            <Box p={5}>
                              <Text fontSize="20px" fontWeight="500">
                                Description
                              </Text>
                              <Text
                                //  fontSize="20px"
                                p={2}
                              >
                                {item.element.description
                                  .replace(/(<([^>]+)>)/gi, "")
                                  .substring(0, 80) +
                                  (item.element.description.length > 80
                                    ? "..."
                                    : "")}

                                {/* {Parser(
                                  
                                )} */}
                                {/* {Parser(item.element.description).substring(
                                  0,
                                  80
                                ) +
                                  (item.element.description.length > 80
                                    ? "..."
                                    : "")} */}
                              </Text>
                              {/* <Divider borderColor="myBlue"></Divider> */}
                            </Box>
                          </Box>
                          <Flex justifyContent="center">
                            <Link to={`/element/single/${item.element_id}`}>
                              <Button
                                color="#FFF"
                                mx="auto"
                                // onClick={handleClick}
                                bg="myYellow"
                                _hover={{
                                  bg: "#e68f00",
                                  color: "#fff",
                                }}
                              >
                                View code
                              </Button>
                            </Link>
                          </Flex>
                        </Flex>
                      </PseudoBox>
                    </>
                  );
                })}
                {/* </Stack> */}
              </SimpleGrid>
            )}
          </Box>
          {/* **************************************************************************** stack original */}
        </Stack>
      )}
    </>
  );
};

export default SingleCustom;

import React, { useEffect, useState, useContext } from "react";
import {
  Stack,
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Spinner,
  Avatar,
  Skeleton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Divider,
  useDisclosure,
  useClipboard,
} from "@chakra-ui/core";
import Parser from "html-react-parser";
// import { singleCustom } from "../Custom-element/CustomFunctions";
import { singleElement } from "../ElementFunctions";
import { CategorySub } from "../Category/CategorySub";
import {
  customDelete,
  createCustomStarted,
} from "../Custom-element/CustomFunctions";
import ModalAddCustom from "../Custom-element/ModalAddCustom";
import { LogStatusContext } from "../../App";
import { Redirect } from "react-router-dom";

export const SingleCustomPage = (props) => {
  const rendering = useContext(LogStatusContext);

  const { id } = props.match.params;
  const [isOpenD, setIsOpenD] = React.useState();
  const onCloseD = () => setIsOpenD(false);
  const cancelRef = React.useRef();
  //Modal declaration
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [single, setSingle] = useState({});
  const [defaultCategory, setDefaultCategory] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [customId, setCustomId] = useState("");
  const [avatarUser, setAvatarUser] = useState();
  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);
  const [render, setRender] = useState(false);
  const [inLibrary, setInLibrary] = useState(null);
  const [delLoading, setDelLoading] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [elementUser_id, setElementUser_id] = useState("");
  // const [value, setValue] = React.useState("Hello world");
  const { onCopy, hasCopied } = useClipboard(code);

  //   console.log(id);
  useEffect(() => {
    singleElement(id).then((res) => {
      if (res && res.status == 200) {
        // console.log(res.data.element.user);
        setTitle(res.data.element.title);
        setDescription(res.data.element.description);
        setCode(res.data.element.code);
        setElementUser_id(res.data.element.user_id);

        if (res.data.element.user) {
          setAvatarUser(res.data.element.user.avatar);
          setCreator(res.data.element.user.name);
        }
        // console.log(res.data.element.user.avatar);
        // console.log(res.data.element.user.name);
        // setSingle(res.data);

        // console.log(res.data.element.default_category.title);
        setDefaultCategory(res.data.element.default_category.title);
        if (res.data.custom) {
          setCustomId(res.data.custom.id);
          setCategory(res.data.custom.category.title);
          setSubCategory(res.data.custom.sub_category.title);
          setInLibrary(true);
        } else {
          setInLibrary(false);
        }
        setTimeout(() => {
          renderFunc();
        }, 2000);
        setRequestStatus(true);
      } else if (res.status == 500) {
        props.history.push("/error");
      }
    });
  }, []);
  //******************************************** Delete custom */
  const handleDelete = () => {
    setDelLoading(true);
    customDelete(customId).then((res) => {
      if (res && res.status == 200) {
        setDelLoading(false);
        // console.log(res);
        onCloseD();
        setInLibrary(false);
      }
    });
  };
  const renderFunc = () => {
    // console.log("render");
    setRender(!render);
  };
  // console.log(id);
  //*************************************** Function Modal ADD */

  const handleAdd = () => {
    // console.log(datas.categories);
    setShowModalAdd(true);
    onOpen();
  };
  const addCustom = (e) => {
    createCustomStarted(e).then((res) => {
      if (res && res.status == 201) {
        // console.log(res);
        setCategory(res.data.category.title);
        setSubCategory(res.data.subCategory.title);
        setCustomId(res.data.custom.id);
        setInLibrary(true);
        rendering();
      } else console.log("error");
    });
    // createSubCategory(e).then((res) => {
    //   // console.log(res);
    //   setRenderNewElement(!renderNewElement);
    //   rendering(true);
    setShowModalAdd(false);
    // });
  };
  const handleCopy = () => {
    onCopy();
  };

  return (
    <>
      {!localStorage.userToken ? (
        <Redirect to="/login" />
      ) : (
        <Stack ml="15%" mt="5%" p={5} bg="bgGray" className="" h="100vh">
          {/* ******************************************************* Modal ADD */}
          {showModalAdd && (
            <ModalAddCustom
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
              addCustom={addCustom}
              category={defaultCategory}
              subCategory={subCategory}
              element_id={id}
            />
          )}

          {/* ******************************************************* Alert delete */}

          <AlertDialog
            isOpen={isOpenD}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Element
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You want remove this element from library.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variantColor="red"
                  onClick={handleDelete}
                  ml={3}
                  isLoading={delLoading}
                  loadingText="Please wait ..."
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Flex
            // w="1000px"
            w="70%"
            mx="auto"
            bg=""
            mt={5}
            p={5}
            justifyContent="space-around"
          >
            {/* ******************************************************* Single Element */}

            <Box bg="#fff" p={5} shadow="lg" rounded="lg" flex="3" mr={5}>
              {requestStatus ? (
                <>
                  <Heading mb={5} color="myYellow">
                    {title}
                  </Heading>
                  <Divider mb={5}></Divider>
                  <Heading fontSize="20px" mb={3}>
                    Element code
                  </Heading>
                  <Box
                    // mx="auto"
                    w="90%"
                    pos="relative"
                    p={5}
                    bg="#011627"
                    rounded="md"
                    shadow="xl"
                    color="#FFF"
                    mb={5}
                    // mx="auto"
                  >
                    <Button
                      variantColor="teal"
                      size="md"
                      pos="absolute"
                      top="10px"
                      right="10px"
                      onClick={handleCopy}
                    >
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                    <Text minH="100px" pl={2} pr="50px" overflowWrap>
                    {Parser(code)}

                    </Text>
                  </Box>
                  <Divider></Divider>
                  <Heading fontSize="25px" mb={2}>
                    Description:
                  </Heading>
                  <Text mb={5} minH="150px" p={5}>
                    {Parser(description)}
                  </Text>
                </>
              ) : (
                <>
                  <Heading mb={5} color="myYellow">
                    Title
                  </Heading>
                  <Skeleton
                    colorStart="#fff"
                    colorEnd="orange"
                    height="20px"
                    mb={5}
                  />
                  <Heading mb={5} fontSize="25px">
                    Description
                  </Heading>
                  <Skeleton
                    colorStart="#fff"
                    colorEnd="#CCC"
                    height="50px"
                    mb={5}
                  />
                  <Heading fontSize="25px" mb={5}>
                    Code
                  </Heading>
                  <Skeleton
                    colorStart="#fff"
                    colorEnd="#011627"
                    height="50px"
                    mb={5}
                  />
                </>
              )}
            </Box>

            {/* ******************************************************* Created by */}
            <Box flex="1">
              <Flex
                direction="column"
                fontSize="18px"
                fontWeight="600"
                top="5%"
                right="3%"
                shadow="lg"
                rounded="md"
                bg="#fff"
                color="#121"
                // align="center"
                justifyContent="center"
                textDecoration="left"
                mb={5}
              >
                <Box bg="myYellow" w="100" color="white" p={2} roundedTop="lg">
                  Created By
                </Box>
                <Box p={5}>
                  {/* ************************************* Spinner */}

                  {requestStatus ? (
                    <>
                      <Flex align="center" mb={3}>
                        <Avatar
                          fontSize="50px"
                          mr={2}
                          name=""
                          src={`http://localhost:8000/storage/users/${avatarUser}`}
                        />
                        <Text fontSize="20px" color="myBlue" mb={3}>
                          {localStorage.name === creator ? "You" : creator}
                        </Text>
                      </Flex>

                      <Text>Category : {defaultCategory}</Text>
                    </>
                  ) : (
                    <Spinner />
                  )}

                  {/* <Flex>
                <Button variantColor="green">Edit</Button>
                <Button bg="#C53030">Del</Button>
              </Flex> */}
                </Box>
              </Flex>
              {/* ******************************************************* Library */}

              <Flex
                direction="column"
                // w="250PX"
                fontSize="18px"
                fontWeight="600"
                top="5%"
                right="3%"
                shadow="lg"
                rounded="md"
                bg="#fff"
                color="#121"
                // align="center"
                justifyContent="center"
                textDecoration="left"
              >
                <Box bg="myBlue" w="100" p={2} color="white" roundedTop="lg">
                  Library
                </Box>
                <Box p={5}>
                  {requestStatus ? (
                    <>
                      {/* ****************************** in Library TEST */}
                      {inLibrary ? (
                        <>
                          <Text>Category : {category}</Text>
                          <Text mb={5}>sub : {subCategory}</Text>
                          <Flex justifyContent="center">
                            <Button
                              variantColor="green"
                              mr={2}
                              w="50%"
                              onClick={() => setIsOpenD(true)}
                            >
                              Remove
                            </Button>
                            {/* {localStorage.user_id == elementUser_id && (
                          <Button bg="#C53030" w="40%">
                            Edit
                          </Button>
                        )} */}
                          </Flex>
                        </>
                      ) : (
                        <>
                          <Text mb={3}>This element not in your library!</Text>

                          <Flex justifyContent="center">
                            <Button
                              variantColor="green"
                              mr={2}
                              w="50%"
                              onClick={handleAdd}
                            >
                              Add
                            </Button>
                            {/* {inLibrary && (
                          <Button bg="#C53030" w="40%">
                            Edit
                          </Button>
                        )} */}
                          </Flex>
                        </>
                      )}
                    </>
                  ) : (
                    <Spinner />
                  )}
                </Box>
                {/* <Text>{single.custom.title}</Text> */}
              </Flex>
            </Box>
          </Flex>
        </Stack>
      )}
    </>
  );
};

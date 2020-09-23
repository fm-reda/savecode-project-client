import React, { useState, useEffect, useContext } from "react";
import {
  Stack,
  Box,
  Heading,
  Flex,
  Spinner,
  PseudoBox,
  SimpleGrid,
  Text,
  Button,
  Link,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";
import { Redirect, NavLink } from "react-router-dom";
import {
  getCategories,
  getSubByCategory,
  subCategoryDelete,
  categoryDelete,
  updateSingleCat,
  updateSingleSub,
} from "./../Category/CategoryFunctions";
import { LogStatusContext } from "../../App";
import UpdateCatModal from "./UpdateCatModal";
import UpdateSubModal from "./UpdateSubModal";

export const SingleCategoryPage = (props) => {
  const rendering = useContext(LogStatusContext);

  const [categories, setCategories] = useState([]);
  const [requestStatusCategories, setRequestStatusCategories] = useState(true);
  const [category_id, setCategory_id] = useState(
    props.match.params.category_id
  );
  const [categoryName, setCategoryName] = useState(props.match.params.category);
  const [subCategories, setSubCategories] = useState([]);
  const [loadDelSub, setLoadDelSub] = useState(false);
  const [loadDelCat, setLoadDelCat] = useState(false);
  const [loadUpdateSub, setLoadUpdateSub] = useState(false);
  const [loadUpdateCat, setLoadUpdateCat] = useState(false);
  const [renderCategories, setRenderCategories] = useState(false);
  const [msgStatus, setMsgStatus] = useState("");
  const [isOpenSub, setIsOpenSub] = React.useState();
  const onCloseSub = () => setIsOpenSub(false);
  const cancelRefSub = React.useRef();
  const [isOpenCat, setIsOpenCat] = React.useState();
  const onCloseCat = () => setIsOpenCat(false);
  const cancelRefCat = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModalSub, setShowModalSub] = useState(false);
  const [showModalCat, setShowModalCat] = useState(false);
  const [subId, setSubId] = useState("");
  const toast = useToast();

  useEffect(() => {
    // setRequestStatusCategories(false);
    getSubByCategory(category_id).then((res) => {
      setMsgStatus("");
      if (res && res.status == 200) {
        setSubCategories(res.data.category.sub_categories);
        setRequestStatusCategories(false);
        // if (!res.data.category.subCategories.length) {
        //   setMsgStatus("No data");
        // }

        if (
          Array.isArray(res.data.category.sub_categories) &&
          !res.data.category.sub_categories.length
        ) {
          setMsgStatus("No result(s) for this category");
        }
        //   console.log(res);
        // console.log(res.status);
        // setCategories(res.data.success.categories);
      } else if (res && res.status === 401) {
        // console.log("autorisation");
        // localStorage.setItem('userToken',"")
      }
    });
  }, [renderCategories]);
  //********************************************************************SubCategories delete
  const handleDelSub = (e) => {
    setLoadDelSub(true);
    // console.log(e);
    subCategoryDelete(subId).then((res) => {
      if (res && res.status == 200) {
        setIsOpenSub(false);
        setLoadDelSub(false);
        setRenderCategories(!renderCategories);
        rendering();
      } else if (res && res.status === 203) {
        // console.log("not found");
        setIsOpenSub(false);

        setLoadDelSub(false);
      }
    });
  };
  const configDelSub = (e) => {
    setSubId(e);
    setIsOpenSub(true);
  };

  //********************************************************************categories delete
  const handleDelCat = (e) => {
   
    setLoadDelCat(true);
    categoryDelete(e).then((res) => {
      if (res && res.status == 200) {
        setIsOpenCat(false);
        setLoadDelCat(false);
        setRenderCategories(!renderCategories);
        rendering();
        props.history.push("/gestion-categories");
      } else if (res && res.status === 203) {
     
        setIsOpenCat(false);

        setLoadDelCat(false);
      }
    });
  };
  //********************************************************************categories UPDATE

  const handleCat = () => {
    // console.log(datas.categories);
    setShowModalCat(true);
    onOpen();
  };
  const getNewCategory = (e) => {
    // console.log(e);
    updateSingleCat({
      category: e,
      category_id: category_id,
    }).then((res) => {
      if (res && res.status == 200) {
        setShowModalCat(false);
        setCategoryName(e);
        setRenderCategories(!renderCategories);
        rendering();
        toast({
          title: `Category update.`,
          description: "updated category successfully ",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // props.history.push("/gestion-categories");
      } else if (res && res.status === 203) {
        // console.log("not found");
      }
    });

    // createCategory({ category: e }).then((res) => {
    //   setRenderNewElement(!renderNewElement);
    //   rendering(true);
    //   setShowModalCat(false);
    //   // setTimeout(() => {
    //   //   closeModal();
    //   // }, 5000);
    // });
  };
  const closeModal = () => {
  
    setShowModalSub(false);
    setShowModalCat(false);
    onClose();
  };
  //  //********************************************************************Sub UPDATE

  const handleSub = (e) => {
    // console.log(datas.categories);
    setSubId(e);
    setShowModalSub(true);
    onOpen();
  };
  const getNewSub = (e) => {
    // console.log(e);
    updateSingleSub({
      sub: e,
      sub_id: subId,
    }).then((res) => {
      if (res && res.status == 200) {
        setShowModalSub(false);
        // setCategoryName(e);
        setRenderCategories(!renderCategories);
        rendering();
        toast({
          title: `Sub category update.`,
          description: "updated sub successfully ",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // props.history.push("/gestion-categories");
      } else if (res && res.status === 203) {
        // console.log("not found");
      }
    });
  };

  //   // createCategory({ category: e }).then((res) => {
  //   //   setRenderNewElement(!renderNewElement);
  //   //   rendering(true);
  //   //   setShowModalCat(false);
  //   //   // setTimeout(() => {
  //   //   //   closeModal();
  //   //   // }, 5000);
  //   // });
  // };

  return (
    <>
      {!localStorage.userToken ? (
        <Redirect to="/login" />
      ) : (
        // ********************************************************************* FRAME
        <Stack ml="15%" mt="5%" p={5} bg="bgGray" className="" h="100vh">
          {/* ********************************************************************* Container */}

          {/* ********************************************************************* Modal update */}

          {showModalCat && (
            <UpdateCatModal
              categoryName={categoryName}
              openModal={onOpen}
              closeModal={closeModal}
              isOpen={isOpen}
              getNewCategory={getNewCategory}
            />
          )}

          <Box
            // bg="#FFF"
            p={5}
            rounder="lg"
            // shadow="lg"
            w="90%"
            mt="50px"
            mx="auto"
          >
            {/* ********************************************************************Box category */}

            <Box
              // justifyContent="center"
              // align="center"
              // h="50vh"
              // pt="50px"
              bg="#FFF"
              mb="50px"
              p={5}
              shadow="lg"
              rounded="md"
            >
              <AlertDialog
                isOpen={isOpenCat}
                leastDestructiveRef={cancelRefCat}
                onClose={onCloseCat}
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete category
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRefCat} onClick={onCloseCat}>
                      Cancel
                    </Button>
                    <Button
                      isLoading={loadDelCat}
                      loadingText="Deleting..."
                      variantColor="red"
                      onClick={() => handleDelCat(category_id)}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Flex align="center">
                <Heading mr={5}>Category : {categoryName}</Heading>
                <Flex justifyContent="center" align="center">
                  <Button
                    onClick={handleCat}
                    mr={3}
                    variantColor="green"
                    variant="outline"
                    _hover={{ bg: "#38a169", color: "#fff" }}
                  >
                    Edit
                  </Button>
                  <Button
                    mr={3}
                    onClick={() => setIsOpenCat(true)}
                    variantColor="red"
                    variant="outline"
                    _hover={{ bg: "#e53e3e", color: "#fff" }}
                  >
                    Delete
                  </Button>
                  {!subCategories.length && !requestStatusCategories && (
                    <Text fontSize="15px">(This category is empty)</Text>
                  )}
                </Flex>

                {/* <IconButton size="md" icon="edit" /> */}
              </Flex>
            </Box>
            {requestStatusCategories ? (
              <Flex
                justifyContent="center"
                h="50vh"
                align="center"
                // pt="50px"
                bg="#FFF"
              >
                {/* ***************************************************************** Spinner */}

                <Box>
                  <Heading color="myYellow" mb={3}>
                    Searching Sub Categories, Please wait...
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
              <>
                {/* *****************************************************************sub categories MAPPING */}
                <Box bg="#fff" shadow="lg" rounded="md" p={5}>
                  <Heading mb={5}>List of Sub Categories</Heading>

                  <SimpleGrid
                    // minChildWidth="30%"
                    columns={3}
                    spacing="40px"
                  >
                    {msgStatus && (
                      <Text px={3} fontSize="20px" color="myBlue">
                        {msgStatus}
                      </Text>
                    )}
                    {subCategories.map((item, i) => (
                      <PseudoBox
                        flex="1"
                        mb={2}
                        // border="1px"
                        key={i}
                        fontSize="20px"
                        pos="relative"
                        shadow="lg"
                        rounded="md"
                        shouldWrapChildren={true}
                        flexWrap="wrap"
                      >
                        {/* ************************************************************Modal sub */}
                        {showModalSub && (
                          <UpdateSubModal
                            subName={item.title}
                            // sub_id={item.id}
                            openModal={onOpen}
                            closeModal={closeModal}
                            isOpen={isOpen}
                            getNewSub={getNewSub}
                          />
                        )}
                        <Flex
                          bg="myBlue"
                          color="#fff"
                          p={2}
                          justifyContent="space-between"
                          align="center"
                        >
                          <Flex>
                            <Text fontSize="30px" mr={2}>
                              {item.title.substring(0, 11) +
                                (item.title.length > 11 ? "..." : "")}
                            </Text>
                            {/* <IconButton
                              size="lg"
                              icon="edit"
                              bg="myBlue"
                              color="#000"
                            /> */}
                          </Flex>

                          <Flex align="center">
                            <Box mr={3}>Element</Box>
                            <Box
                              px={2}
                              as="span"
                              bg="myYellow"
                              color="#fff"
                              rounded="full"
                              // w="30px"
                              // h="30px"
                            >
                              {item.customs.length}
                            </Box>
                          </Flex>
                        </Flex>
                        <Flex justifyContent="center" p={5}>
                          <Button
                            onClick={() => handleSub(item.id)}
                            mr={3}
                            variantColor="green"
                            variant="outline"
                            _hover={{ bg: "#38a169", color: "#fff" }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => configDelSub(item.id)}
                            variantColor="red"
                            variant="outline"
                            _hover={{ bg: "#e53e3e", color: "#fff" }}
                          >
                            Delete
                          </Button>
                        </Flex>
                        {/* <Button
                          variantColor="red"
                          onClick={() => setIsOpenSub(true)}
                        >
                          Delete Customer
                        </Button> */}
                        <AlertDialog
                          isOpen={isOpenSub}
                          leastDestructiveRef={cancelRefSub}
                          onClose={onCloseSub}
                        >
                          <AlertDialogOverlay />
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Sub category
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRefSub} onClick={onCloseSub}>
                                Cancel
                              </Button>
                              <Button
                                isLoading={loadDelSub}
                                loadingText="Deleting..."
                                variantColor="red"
                                onClick={() => handleDelSub(item.id)}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </PseudoBox>
                    ))}
                  </SimpleGrid>
                </Box>
                {/* * *****************************************************************END categories MAPPING */}
                {/* <Switch>
                <Route path={`${path}/:category/:category_id`}>
                  <SingleCategoryPage />
                </Route>
              </Switch> */}
                <Box>
                  {/* <Router> */}
                  {/* <Router>
                  <Route
                    // path={`gestion-categories/:category/:category_id`}
                    exact
                    path="/gestion-categories/:category/:category_id"
                    render={(props) => (
                      <LoginPage
                        {...props}
                        // handleLogin={handleLogin}
                        // loggedInStatus={loggedInStatus}
                      />
                    )}
                  />
                </Router> */}
                  {/* </Router> */}
                </Box>
              </>
              // {/* * *****************************************************************END requestStatus*/}
            )}
          </Box>
        </Stack>
      )}
    </>
  );
};

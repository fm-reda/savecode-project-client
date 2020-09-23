import React, { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  PseudoBox,
  Flex,
  Box,
  Divider,
  Button,
  Avatar,
  Text,
  Icon,
  Tag,
  Skeleton,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/core";
import { Link, Redirect } from "react-router-dom";
import laravel from "./../../images/Logo/laravel.png";
import react from "./../../images/Logo/react.png";
import javascript from "./../../images/Logo/javascript.png";
import github from "./../../images/Logo/github.png";
import other from "./../../images/Logo/other.png";
import all from "./../../images/Logo/all.jpg";

import { searchWord } from "../ElementFunctions";
import Paginations from "./Paginations";
import { Pagination } from "react-bootstrap";

const SearchPage = (props) => {
  // console.log(props.match.params);
  //   const { search } = props.match.params;
  const [searchResults, setsearchResults] = useState([]);
  const [word, setWord] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [authGotElement, setAuthGotElement] = useState(false);
  const [searchLaravel, setSearchLaravel] = useState([]);
  const [searchReact, setSearchReact] = useState([]);
  const [searchJavascript, setSearchJavascript] = useState([]);
  const [searchGithub, setSearchGithub] = useState([]);
  const [searchOther, setSearchOther] = useState([]);
  const [searchAll, setSearchAll] = useState([]);
  const [requestStatus, setRequestStatus] = useState(false);
  const [choice, setChoice] = useState("");
  // console.log("word >>" + word);
  // console.log("params >>" + props.match.params.search);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  // const [numberOfPage, setNumberOfPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  if (searchResults) {
  }
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);
  const numberOfPage = Math.ceil(searchResults.length / postsPerPage);
  // console.log("pages : " + numberOfPage);
  // console.log("current :" + currentPage);

  useEffect(() => {

    // setNumberOfPage(1);
    // setRequestStatus(false);
    const newSearch = {
      word: props.match.params.search,
    };
    if (word != props.match.params.search) {
      setWord(props.match.params.search);
      setRequestStatus(false);
      searchWord(newSearch).then((res) => {
        // console.log(res);
        if (res && res.status == 200) {
          if (res.data.elements) {
            setSearchLaravel([]);
            setSearchAll([]);
            setSearchReact([]);
            setSearchJavascript([]);
            setSearchGithub([]);
            setSearchOther([]);
            if (Array.isArray(res.data.elements) && !res.data.elements.length) {
              // console.log("element empty");
            }

            // setSearchAll(res.data.elements);
            setSearchAll(res.data.elements);
            setsearchResults(res.data.elements);
            setCurrentPage(1);
            setRequestStatus(true);
          }

          if (!res.data.elements) {
            setSearchStatus("No data");
          }
        }
      });
    }
    //**************************************************** Create table categories */

    if (!choice == "") {
      setCurrentPage(1);
      setsearchResults([]);
      // console.log(choice);
      if (choice == "all") {
        setsearchResults(searchAll);
      }

      searchAll.map((element) => {
        // console.log("effect>choice>map");
        // setSearchAll((searchAll) => [...searchAll, element]);
        switch (element.default_category.slug) {
          case choice:
            setsearchResults((searchResults) => [...searchResults, element]);
            break;

          default:
            break;
        }
      });
      setChoice("");
    }

    //     // switch (element.default_category.slug) {
    //     //   case "laravel":
    //     //     setSearchLaravel((searchLaravel) => [
    //     //       ...searchLaravel,
    //     //       element,
    //     //     ]);
    //     //     break;
    //     //   case "react":
    //     //     setSearchReact((searchReact) => [...searchReact, element]);
    //     //     break;
    //     //   case "javascript":
    //     //     setSearchJavascript((searchJavascript) => [
    //     //       ...searchJavascript,
    //     //       element,
    //     //     ]);
    //     //     break;
    //     //   case "github":
    //     //     setSearchGithub((searchGithub) => [...searchGithub, element]);
    //     //     break;
    //     //   case "other":
    //     //     setSearchOther((searchOther) => [...searchOther, element]);
    //     //     break;
    //     //   default:
    //     //     break;
    //     // }

    //     setRequestStatus(true);
    //   });
    // }
  }, [props.match.params.search, word, choice]);

  const paginate = (numberPage) => {
    setCurrentPage(numberPage);
    // console.log(searchLaravel);
  };
  const Owned = () => {
    return (
      <Box
        pos="absolute"
        top="-10px"
        right="0"
        p={1}
        roundedTop="lg"
        bg="#007bff"
        color="#FFF"
      >
        Owned
      </Box>
    );
  };
  const handleClick = (e) => {
    switch (e) {
      case 0:
        // console.log(s);
        setsearchResults(searchResults);
        setChoice("all");

        break;
      case 1:
        // console.log("switch laravel");
        // console.log(s);
        // setsearchResults(searchLaravel);
        setChoice("laravel");

        break;
      case 2:
        // console.log(s);
        // setsearchResults(searchReact);
        setChoice("react");

        break;
      case 3:
        // console.log(s);
        // setsearchResults(searchJavascript);
        setChoice("javascript");

        break;
      case 4:
        // console.log(s);
        // setsearchResults(searchGithub);
        setChoice("github");

        break;
      case 5:
        // console.log(s);
        // setsearchResults(searchOther);
        setChoice("other");

        break;

      default:
        break;
    }
    // console.log(e);
  };
  return (
    <>
      {!localStorage.userToken ? (
        <Redirect to="/login" />
      ) : (
        <Stack ml="15%" mt="103px" minH="710px" pb="400px" bg="bgGray" mb={5}>
          <Box bg="bgGray" mt="4%">
            <Flex
              w="50%"
              justifyContent="space-between"
              mx="auto"
              mb={5}
              bg="#fff"
              p={2}
              rounded="lg"
              shadow="lg"
            >
              {[all, laravel, react, javascript, github, other].map(
                (item, i) => (
                  <>
                    <PseudoBox
                      bgImage={`url(${item})`}
                      // bgImage={`url(/static/media/${item}.8fbea12a.png)`}
                      bgPos="center"
                      bgSize="100%"
                      bgRepeat="no-repeat"
                      w="200px"
                      h="115px"
                      p={4}
                      mr={3}
                      as="button"
                      onClick={(e) => handleClick(i)}
                      className="active"
                      _hover={{
                        borderColor: "blue.500",
                        bg: "#fff6e7",
                        // color: "#000",
                        // shadow: "lg",
                        // marginBottom: "10px",
                      }}
                      // _active={{ bg: "blue.700" }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        boxShadow: "outline",
                        // boxShadow: "true",
                        borderColor: "gray.300",
                      }}
                      _selected={{}}
                    ></PseudoBox>
                  </>
                )
              )}
            </Flex>
            <Flex justifyContent="space-between">
              <Heading ml="2%">
                {searchResults.length} Result(s) for ({word}) :{searchStatus}
              </Heading>
              <Pagination className="mr-5">
                {/* <Flex
                fontSize="30px"
                mr="5%"
                color="myBlue"
                justifyContent="space-between"
              > */}
                <Pagination.Item
                  className="mr-2"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage == 1}
                >
                  <Icon name="arrow-left" size="20px" ml={1} />
                </Pagination.Item>
                <Pagination.Item
                  className="mr-2"
                  // onClick={() => paginate(currentPage + 1)}
                  // disabled={numberOfPage == currentPage}
                >
                  <Box textAlign="center" size="20px" fontSize="20px" mr="15px">
                    {currentPage}/{numberOfPage ? numberOfPage : 1}
                  </Box>
                </Pagination.Item>
                {/* <Pagination> */}
                <Pagination.Item
                  className=""
                  onClick={() => paginate(currentPage + 1)}
                  disabled={numberOfPage == currentPage}
                >
                  <Icon name="arrow-right" size="20px" ml={1} />
                </Pagination.Item>
                {/* </Pagination> */}
                {/* </Flex> */}
              </Pagination>
            </Flex>
            {requestStatus ? (
              <SimpleGrid
                mt="3%"
                // minChildWidth="30%"
                columns={3}
                spacing="10px"
              >
                {/* <Stack
                // justifyContent="center"
                // align="center"
                //   mt="3%"
                mt="30px"
                minH="700px"
                className=""
                isInline
                // width="1430px"
                // w="100%"
                p={5}
                shouldWrapChildren={true}
                flexWrap="wrap"
              > */}
                {currentPosts.map((item, i) => {
                  return (
                    <>
                      <PseudoBox
                        pos="relative"
                        key={i}
                        rounded="md"
                        height="250px"
                        shadow="lg"
                        p={3}
                        bg="#fff"
                        // width="430px"
                        // width="30%"
                        mb="40px"
                        mx={3}
                        _hover={{
                          borderColor: "myYellow",
                          bg: "#fff6e7",
                          color: "#000",
                          shadow: "lg",
                          marginBottom: "10px",
                        }}
                        // width="100%"
                      >
                        {/* {item.customs.length && <Owned />} */}
                        {item.customs.length
                          ? item.customs.map((custom) => {
                              if (localStorage.user_id == custom.user_id) {
                                return <Owned />;
                              }
                              // localStorage.user_id == custom.user_id ? (
                              //   <Owned />
                              // ) : null;
                            })
                          : ""}
                        {/* {item.custom && !item.custom.length && null} */}
                        {/* <Box
                      pos="absolute"
                      top="-10px"
                      right="0"
                      p={1}
                      roundedTop="lg"
                      bg="#007bff"
                      color="#FFF"
                    > */}
                        {/* {Array.isArray(item.customs) &&
                        item.customs.length &&
                        //  result = false;
                        item.customs.map((custom, i) => {
                          if (localStorage.user_id == custom.user_id) {
                            // console.log(custom.user_id);
                            // console.log("local" + localStorage.user_id);
                            // setAuthGotElement(true)
                            console.log();

                            return "owned";
                          } else if (i == item.customs.length) {
                            return "Not";
                          }
                        })}
                      {!(Array.isArray(item.customs) && item.customs.length) &&
                        "not owneddd"} */}
                        {/* </Box> */}
                        <Flex
                          direction="column"
                          justifyContent="space-between"
                          h="100%"
                        >
                          <Box>
                            <Flex
                              align="center"
                              mb={3}
                              justifyContent="space-between"
                            >
                              <Flex>
                                <Avatar
                                  fontSize="50px"
                                  mr={2}
                                  name=""
                                  src={`${process.env.REACT_APP_URL}storage/users/${item.user.avatar}`}
                                />
                                <Text fontSize="20px" color="#007bff" mb={3}>
                                  {/* {localStorage.name === creator ? "You" : creator} */}
                                  {item.user.id == localStorage.user_id
                                    ? "You"
                                    : item.user.name}
                                </Text>
                              </Flex>
                              <Box>
                                <Text color="gray.400">
                                  {item.created_at.substring(0, 10)}
                                </Text>
                              </Box>
                            </Flex>
                            <Divider />
                            <Flex justifyContent="space-between">
                              <Heading fontSize="20px" mb={2}>
                                {item.title.substring(0, 30) +
                                  (item.title.length > 29 ? "..." : "")}
                              </Heading>
                              {/* <Text size="md">
                          {item.default_category.title}
                          </Text> */}
                              <Box
                                p={1}
                                rounded="md"
                                // color="#FFF"
                                // color="gray.400"
                                bg={`${item.default_category.slug}`}
                              >
                                {item.default_category.title}
                              </Box>
                            </Flex>

                            <Box bg="#EF5F5F5" rounded="10px" p={2}>
                              {item.description
                                .replace(/(<([^>]+)>)/gi, "")
                                .substring(0, 80) +
                                (item.description.length > 80 ? "..." : "")}

                              {/* {item.description.substring(0, 60) +
                                (item.description.length > 80 ? "..." : "")} */}
                            </Box>
                            <Divider></Divider>
                            {/* <Flex justifyContent="space-between">
                          <Text color="gray.400">
                            {item.default_category.title}
                          </Text>
                          <Text color="gray.400">
                            {item.created_at.substring(0, 10)}
                          </Text>
                        </Flex> */}
                          </Box>

                          <Flex justifyContent="center">
                            <Link to={`/element/single/${item.id}`}>
                              <Button
                                color="#FFF"
                                mx="auto"
                                //   onClick={handleClick}
                                bg="myYellow"
                                _hover={{
                                  bg: "#fff",
                                  color: "myYellow",
                                }}
                              >
                                View
                              </Button>
                            </Link>
                          </Flex>
                        </Flex>
                      </PseudoBox>
                    </>
                  );
                })}
              </SimpleGrid>
            ) : (
              // </Stack>
              <Flex justifyContent="center" align="center" my="50px">
                <Box>
                  <Heading color="myYellow" mb={3}>
                    Searching, Please wait...
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
              // <Skeleton colorStart="#fff" colorEnd="#CCC" height="50px" mb={5} />
            )}

            <Flex justifyContent="center">
              <Paginations
                postsPerPage={postsPerPage}
                totalPosts={searchResults.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Flex>
          </Box>
        </Stack>
      )}
    </>
  );
};
export default SearchPage;

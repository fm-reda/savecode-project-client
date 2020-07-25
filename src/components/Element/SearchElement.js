import React, { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  PseudoBox,
  Flex,
  Box,
  Divider,
  Button,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";

const SearchElement = (props) => {
  console.log(props.match.params);
  //   const { search } = props.match.params;
  const [searchWord, setSearchWord] = useState("");

  //   useEffect(() => {
  //     SearchElement(props.match.params.search).then((res) => {
  //       console.log(res);
  //     });
  //   }, []);
  return (
    <>
      <Stack ml="15%" mt="103px" minH="710px" pb="400px">
        <Stack
          // justifyContent="center"
          align="center"
          //   mt="3%"
          bg="bgGray"
          // minH="100vh"
          className=""
          isInline
          // width="1430px"
          // w="100%"
          p={5}
          shouldWrapChildren={true}
          flexWrap="wrap"
        >
          {[1, 2, 3].map((item, i) => {
            return (
              <>
                <PseudoBox
                  key={i}
                  rounded="md"
                  height="200px"
                  shadow="lg"
                  p={3}
                  bg="#fff"
                  width="430px"
                  // width="30%"
                  mb={5}
                  mx={3}
                  _hover={{
                    borderColor: "myYellow",
                    bg: "myBlue",
                    color: "white",
                  }}
                  // width="100%"
                >
                  <Flex
                    direction="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Heading fontSize="20px">
                        {" "}
                        {/* {item.element.title.substring(0, 30) +
                          (item.element.title.length > 29 ? "..." : "")} */}
                      </Heading>
                      <Divider></Divider>
                      <Box>
                        {/* {item.element.description.substring(0, 80) +
                          (item.element.description.length > 80 ? "..." : "")} */}
                      </Box>
                    </Box>
                    <Flex justifyContent="center">
                      <Link to={`/custom/single/${item.element_id}`}>
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
        </Stack>
      </Stack>
    </>
  );
};
export default SearchElement;

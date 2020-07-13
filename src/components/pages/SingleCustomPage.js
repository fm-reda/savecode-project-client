import React, { useEffect, useState } from "react";
import { Stack, Heading, Box, Text, Button } from "@chakra-ui/core";
// import { singleCustom } from "../Custom-element/CustomFunctions";
import { singleElement } from "../ElementFunctions";
import { CategorySub } from "../Category/CategorySub";

export const SingleCustomPage = (props) => {
  const { id } = props.match.params;
  const [single, setSingle] = useState({});
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  //   console.log(id);
  useEffect(() => {
    singleElement(id).then((res) => {
      if (res) {
        console.log(res.data);
        setSingle(res.data);

        setCategory(res.data.custom.category.title);
        // setSubCategory(res.data.custom.sub_category.title);
      } else {
      }
    });
  }, []);
  // console.log(id);
  return (
    <Stack ml="15%" mt="5%" p={5} bg="bgGray" h="100vh" className="">
      <Box
        w="1000px"
        mx="auto"
        bg="#fff"
        mt={5}
        p={5}
        shadow="lg"
        rounded="lg"
        pos="relative"
      >
        <Box w="100px" h="100px" pos="absolute" top="0" right="0" border="1px">
          {/* <Text>{single.custom.title}</Text> */}
          <Text>{category}</Text>
        </Box>

        <Heading mb={5}>title</Heading>
        <Text mb={5}>Description</Text>
        <Heading fontSize="25px" h="70px" color="#308c77">
          Element code
        </Heading>
        <Box
          // mx="auto"
          w="70%"
          pos="relative"
          p={5}
          bg="#011627"
          rounded="md"
          shadow="xl"
          color="#FFF"
          mb={5}
        >
          <Button
            variantColor="teal"
            size="xs"
            pos="absolute"
            top="10px"
            right="10px"
          >
            Copy
          </Button>
          <Text pl={2} pr="50px" overflowWrap>
            $ git remote origin add
          </Text>
        </Box>
      </Box>
    </Stack>
  );
};

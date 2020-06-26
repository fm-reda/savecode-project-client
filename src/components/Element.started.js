import React, { useState } from "react";
import Element from "./Element/Element";
import {
  Heading,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  usePrevious,
} from "@chakra-ui/core";
import { FormAddElement } from "./Element/form.AddElement";
import { FormNewElement } from "./Element/FormNewElement";

export const ElementStarted = (props) => {
  const { setNextStatus, createElement, loading } = props;
  console.log(setNextStatus);
  const [title, setTitle] = useState();

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [datas, setDatas] = useState({});

  // console.log(prevTitle);

  const inputChange = (e) => {
    setDatas({ title: e.title, code: e.code, description: e.description });

    console.log(e.description);
    switch (e) {
      case "title":
        setTitle(e.target.value);

        break;
      case "code":
        setCode(e.target.value);

        break;
      case "description":
        setDescription(e.target.value);

        break;

      default:
        break;
    }
    // if (title && code && description) {
    //   checkNext("full", {
    //     title: title,
    //     code: code,
    //     description: description,
    //   });
    // } else {
    //   // checkNext("empty");
    // }

    // setTitle({ [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box
        // borderRight="1px"

        borderColor="#000"
        py="30px"
        px="10px"
        roundedLeft="lg"
        color="#777777"
        fontWeight="600"
        lineHeight="30px"
        w="50%"
      >
        <Heading size="lg" color="Teal" mb={3}>
          Creating Element Code
        </Heading>
        <FormNewElement
          inputChange={inputChange}
          setNextStatus={setNextStatus}
        />

        {/* <FormControl>
          <FormLabel htmlFor="email">Title</FormLabel>
          <Input
            type="text"
            id="email"
            aria-describedby="email-helper-text"
            onChange={handleChange}
            name="title"
            isDisabled={loading}
          />
    
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Code of element</FormLabel>
          <Input
            type="text"
            id="code"
            ia-describedby="email-helper-text"
            onChange={handleChange}
            name="code"
            isDisabled={loading}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Description</FormLabel>
          <Input
            type="text"
            onChange={handleChange}
            ia-describedby="email-helper-text"
            name="description"
            isDisabled={loading}
          />
        </FormControl> */}
      </Box>
      <Box
        roundedRight="lg"
        px="10px"
        align="center"
        w="50%"
        mx="auto"
        mt="55px"
      >
        Title
        <Box
          borderWidth="1px"
          p={3}
          w="80%"
          bg="#fff"
          rounded="md"
          shadow="lg"
          mb="40px"
        >
          {datas.title}
        </Box>
        Element
        <Box
          pos="relative"
          p={5}
          w="80%"
          bg="#011627"
          rounded="md"
          shadow="xl"
          color="#FFF"
          mb={5}
          minH="100px"
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
            {datas.code}
          </Text>
        </Box>
        Description
        <Box
          borderWidth="1px"
          p={3}
          w="80%"
          bg="#fff"
          rounded="md"
          shadow="lg"
          mb="50px"
          minH="150px"
        >
          {datas.description}
        </Box>
        {/* <Button
          isLoading={loading}
          loadingText="Creating element..."
          w="80%"
          textAlign="center"
          size="lg"
          bg="green.600"
          color="white"
          _hover={{ bg: "green.400", color: " black" }}
          onClick={() => {
            createElement({
              title: title,
              code: code,
              description: description,
              user_id: 4,
            });
          }}
        >
          Create
        </Button> */}
      </Box>
    </>
  );
};

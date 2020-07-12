import React, { useState } from "react";

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
  Textarea,
} from "@chakra-ui/core";
// import { FormAddElement } from "./Element/form.AddElement";
import { FormNewElement } from "./Element/FormNewElement";

export const ElementStarted = (props) => {
  const { setNextStatus, responseElement, loading, storeDatas } = props;
  // console.log(setNextStatus);
  const [title, setTitle] = useState();

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [datas, setDatas] = useState({});

  // console.log(prevTitle);

  const inputChange = (e) => {
    setDatas({ title: e.title, code: e.code, description: e.description });
    // storeDatas(datas);

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
        <Heading size="lg" color="#0297e0" mb={3}>
          Creating Element Code
        </Heading>
        <FormNewElement
          responseElement={responseElement}
          inputChange={inputChange}
          setNextStatus={setNextStatus}
        />
      </Box>
      {/* <Textarea isDisabled>dqsd</Textarea> */}
      <Box
        roundedRight="lg"
        px="10px"
        align="center"
        w="45%"
        mx="auto"
        mt="55px"
      >
        <Text fontSize="20px" mb={1}>
          Title
        </Text>
        <Input type="text" value={datas.title} size="sm" mb={10} />

        <Text fontSize="20px" mb={1}>
          Element (code)
        </Text>
        <Box
          color="#fff"
          pos="relative"
          p={1}
          rounded="md"
          bg="#125462"
          shadow="xl"
          mb={10}
        >
          <Textarea
            p={3}
            pr="80px"
            h="10px"
            isDisabled
            resize="none"
            size="10px"
            rows="1"
            value={datas.code}
            rounded="md"
            color="#000"
          ></Textarea>
          <Button
            variantColor="teal"
            size="xs"
            pos="absolute"
            top="10px"
            right="10px"
          >
            Copy
          </Button>
        </Box>
        <Text fontSize="20px" mb={1}>
          Description
        </Text>
        <Box pos="relative" p={1} rounded="md" bg="#FFF" shadow="xl" h="200px">
          <Textarea
            p={5}
            h="100%"
            resize="none"
            value={datas.description}
            rounded="md"
            color="#000"
            fontWeight="600"
          ></Textarea>
        </Box>
      </Box>
    </>
  );
};

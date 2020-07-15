import React from "react";
import {
  Stack,
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Flex,
} from "@chakra-ui/core";
import { Icon } from "@chakra-ui/core";

import { FormAddElement } from "./Element/form.AddElement";
import { FormNewElement } from "./Element/FormNewElement";
import { CategorySub } from "./Category/CategorySub";

const ManageGallery = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack
        align="center"
        ml="15%"
        mt="10%"
        p={5}
        bg="bgGray"
        h="100vh"
        className=""
        isInline
        spacing={8}
      >
        <Box width="100%" height={32} border="1px" mr={2}>
          <Heading>titile</Heading>
          <Text>
            All spacing props accept numbers, strings, or arrays as values,
            where: Numbers between 0 and the last index of the space array are
            values from the space array defined in theme Numbers greater than
            the length of the space array are converted to pixels String values
            can be used for any valid CSS value (e.g. 'auto' or '2em') Margin
            props accept negative values to set negative margin Arrays can be
            used for responsive styles Note: numeric strings without a CSS unit
            will be used as indices for the array (e.g. space['0'])
          </Text>
        </Box>
        <Box width="100%" height={32} border="1px">
          <Heading>titile</Heading>
          <Text>
            {" "}
            All spacing props accept numbers, strings, or arrays as values,
            where: Numbers between 0 and the last index of the space array are
            values from the space array defined in theme Numbers greater than
            the length of the space array are converted to pixels String values
            can be used for any valid CSS value (e.g. 'auto' or '2em') Margin
            props accept negative values to set negative margin Arrays can be
            used for responsive styles Note: numeric strings without a CSS unit
            will be used as indices for the array (e.g. space['0'])
          </Text>
        </Box>
        <Box width="100%" height={32} overflowX="true" border="1px">
          <Heading>titile</Heading>
          <Text>
            All spacing props accept numbers, strings, or arrays as values,
            where: Numbers between 0 and the last index of the space array are
            values from the space array defined in theme Numbers greater than
            the length of the space array are converted to pixels String values
            can be used for any valid CSS value (e.g. 'auto' or '2em') Margin
            props accept negative values to set negative margin Arrays can be
            used for responsive styles Note: numeric strings without a CSS unit
            will be used as indices for the array (e.g. space['0'])
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default ManageGallery;

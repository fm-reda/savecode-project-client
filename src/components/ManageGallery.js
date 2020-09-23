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
        <h1>sQSHKJLqskjlKL</h1>
        <textarea name="description" id="description"></textarea>
      </Stack>
    </>
  );
};

export default ManageGallery;

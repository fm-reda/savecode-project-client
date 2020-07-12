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

const ManageGallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack>
        <Box mx="auto" mt="120px" w="1000px">
          <Button onClick={onOpen}>Trigger modal</Button>
          <Modal
            size="lg"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            closeOnOverlayClick={false}
            h="1000px"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="30px">
                Congratulation Mr. <Icon name="star" color="#ff9e00" />
              </ModalHeader>
              <ModalHeader
                color="#0297e0"
                fontWeight="600"
                lineHeight="50px"
                fontSize="20px"
              >
                The element is in your library now.
              </ModalHeader>
              <ModalHeader>
                <Icon name="star" color="#ff9e00" mx={2} />
                Title
                <Icon name="star" color="#ff9e00" mx={2} />
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {" "}
                <Box roundedRight="lg" px="10px" align="center" mx="auto">
                  {/* //Box code */}
                  <Box
                    pos="relative"
                    p={5}
                    w="80%"
                    bg="#011627"
                    rounded="md"
                    shadow="xl"
                    color="#FFF"
                    mb={2}
                    w="100%"
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
                      the code
                    </Text>
                  </Box>
                  <Flex justify="" mb={5}>
                    <Text mr="100px">Category:</Text>
                    <Text>Sub-sCategory</Text>
                  </Flex>
                  <Box rounded="lg" shadow="lg" minHeight="200px" p={5}>
                    <Heading fontSize="20px" mb={1} color="#ff9e00">
                      Description
                    </Heading>
                    <Text>some description</Text>
                  </Box>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Stack>
    </>
  );
};

export default ManageGallery;

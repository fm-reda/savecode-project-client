import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Flex,
} from "@chakra-ui/core";
import "./../../App.css";
import { CategorySub } from "../Category/CategorySub";

export const LibraryStarted = (props) => {
  const { newElement, finish } = props;
  const [errors, setErrors] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [started, setStarted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCustom, setNewCustom] = useState({});
  const [category, setCategory] = useState();

  // console.log(datas);
  //   const [datas, setDatas] = useState([]);
  const createCustom = (e) => {
    // console.log(e);
    setNewCustom({ category: e.category, subCategory: e.subCategory });

    // console.log(newElement);
    // console.log(newCustom);
    setStarted(true);
    onOpen();
  };
  const redirect = () => {
    onClose();
    finish();
  };
  const handleChange = (e) => {
    // setdisable(false);
    // console.log(datas.title);

    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }
    //save data in state

    // setDatas({ ...datas, [e.target.id]: e.target.value });
    // inputChange({ ...datas, [e.target.id]: e.target.value });
    // console.log(datas);
  };
  const handleSubmit = () => {};
  //   console.log(datas);
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
        minH="600px"
      >
        {!started && (
          <>
            <Heading mb="20px" size="lg" color="#0297e0">
              Adding your element to library
            </Heading>

            <Box
              p={3}
              shadow="md"
              rounded="lg"
              mb={5}
              fontSize="15px"
              w="85%"
              bg="#fff"
            >
              <Text
                textAlign="left"
                my={4}
                fontWeight="600"
                lineHeight="30px"
                mb={2}
              >
                Your just create your{" "}
                <Box as="span" color="#ff9e00" mr={2} textTransform="uppercase">
                  First Element
                </Box>
                for your App.
              </Text>
              <Text textAlign="left">
                For this last step let add a{" "}
                <Box as="span" color="#ff9e00" mr={2} textTransform="uppercase">
                  Sub-Category
                </Box>{" "}
                to this Element
              </Text>
            </Box>
            <Heading mb={2} fontSize="20px" color="#0297e0">
              Categories
            </Heading>
            <Box
              p={3}
              shadow="md"
              rounded="lg"
              fontSize="15px"
              w="85%"
              bg="#fff"
            >
              {" "}
              <CategorySub
                createCustom={createCustom}
                // element_id={newElement.id}
                newElement={newElement}
              />
            </Box>
          </>
        )}
        <></>
        {started && (
          <>
            {/* <Button onClick={onOpen}>Trigger modal</Button>  */}
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
                  Congratulation Mr. {localStorage.getItem("name")}
                  {/* <Icon name="star" color="#ff9e00" /> */}
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
                  {newElement.title}
                  <Icon name="star" color="#ff9e00" mx={2} />
                </ModalHeader>
                {/* <ModalCloseButton /> */}
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
                        {newElement.code}
                      </Text>
                    </Box>
                    {newCustom && (
                      <Flex justify="" mb={5}>
                        <Text mr="100px" color="#0297e0">
                          Category:{" " + newCustom.category.title}
                        </Text>
                        <Text color="#0297e0">
                          Sub-Category:{" " + newCustom.subCategory.title}
                        </Text>
                      </Flex>
                    )}

                    <Box rounded="lg" shadow="lg" minHeight="200px" p={5}>
                      <Heading fontSize="20px" mb={1} color="#ff9e00">
                        Description
                      </Heading>
                      <Text>{newElement.description}</Text>
                    </Box>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button bg="#ff9e00" onClick={redirect} mx="auto">
                    Finish
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Box>
      <Box
        className="break"
        roundedRight="lg"
        px="10px"
        align="center"
        w="50%"
        mx="auto"
        mt="55px"
      >
        <Box w="80%" bg="#fff" p={5} rounded="lg" mt="12px">
          <Text fontSize="20px" mb={2}>
            Title : {newElement.title}
          </Text>
          <Text fontSize="20px" mb={2}>
            Category :{newElement.default_category.title}
          </Text>
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
              {newElement.code}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

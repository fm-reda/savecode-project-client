import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  Icon,
  ModalBody,
  Box,
  Button,
  Text,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Heading,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/core";

const ModalAddCustom = (props) => {
  const {
    isOpen,
    onOpen,
    onClose,
    addCustom,
    category,
    subCategory,
    element_id,
  } = props;
  // console.log(category);
  const [errors, setErrors] = useState({});
  //   const [categories, setCategories] = useState("");
  //   const [subCategory, setSubCategory] = useState("");
  const [loadAddCustom, setLoadAddCustom] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [datas, setDatas] = useState({
    element_id: element_id,
    category: category,
    subCategory: subCategory,
  });
  useEffect(() => {
    // setDatas({
    //   category: category,
    //   subCategory: subCategory,
    // });
    setTimeout(() => {});
  }, []);
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (e) => {
    // console.log(e.target.value);

    // setShowSub(false);
    // setdisable(false);
    // console.log(e.target.id);

    if (!e.target.value) {
      setErrors({ [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }
    setDatas({ ...datas, [e.target.id]: e.target.value });
    //setCategories(e.target.value);
    // console.log(datas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadAddCustom(true);
    // setTimeout(() => {
    //   setLoadCreateElm(false);
    // }, 1000);

    //--------------------------------check if field are empty after submit
    if (!datas.category || !datas.subCategory) {
      // setdisable(true);
      setErrors({ msg: "Field is empty" });
      setShowAlert(true);
      setTimeout(() => {
        setLoadAddCustom(false);
      }, 1000);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      // setShowAlert(false);
    } else {
      addCustom(datas);
      // closeModal();
      setLoadAddCustom(false);
      // setCategories("");
    }
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

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
          <ModalHeader fontSize="30px">Add element to library</ModalHeader>

          <ModalBody>
            {showAlert && (
              <Alert mb={5} status="error">
                <AlertIcon />
                {errors.msg}
              </Alert>
            )}
            <label>Category</label>
            <Input
              id="category"
              // isDisabled={true}
              //  isInvalid={errors.categories ? true : false}
              errorBorderColor="crimson"
              focusBorderColor="lime"
              onChange={(e) => handleChange(e)}
              // id="category"
              placeholder="eg.laravel"
              value={datas.category}
              my={3}
            />
            <label mb={1}>Category</label>
            <Input
              // isDisabled={true}
              id="subCategory"
              // isInvalid={errors.categories ? true : false}
              errorBorderColor="crimson"
              focusBorderColor="lime"
              onChange={(e) => handleChange(e)}
              // id="category"
              placeholder="eg.migration"
              value={datas.subCategory}
              my={3}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              bg="#ff9e00"
              onClick={handleSubmit}
              isLoading={loadAddCustom}
              loadingText="Creating..."
            >
              Add
            </Button>
            <Button
              bg="#999"
              onClick={() => onClose()}
              // isLoading={loadAddCat}
              // loadingText="Creating..."
            >
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddCustom;

import React, { useState } from "react";
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

const UpdateCatModal = (props) => {
  const { openModal, closeModal, isOpen, getNewCategory, categoryName } = props;
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState(categoryName);
  const [loadAddCat, setLoadAddCat] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (e) => {
    if (!e.target.value) {
      setErrors({ [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }

    setCategories(e.target.value);
    // console.log(categories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadAddCat(true);
    // setTimeout(() => {
    //   setLoadCreateElm(false);
    // }, 1000);

    //--------------------------------check if field are empty after submit
    if (!categories) {
      // setdisable(true);
      setErrors({ msg: "Field is empty" });
      setShowAlert(true);
      setTimeout(() => {
        setLoadAddCat(false);
      }, 1000);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      // setShowAlert(false);
    } else {
      getNewCategory(categories);
      // closeModal();
      setLoadAddCat(false);
      setCategories("");
    }
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        size="lg"
        onClose={closeModal}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
        h="1000px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="30px">Update Category:</ModalHeader>

          <ModalBody>
            {showAlert && (
              <Alert mb={5} status="error">
                <AlertIcon />
                {errors.msg}
              </Alert>
            )}
            <Input
              // isDisabled={true}
              isInvalid={errors.categories ? true : false}
              errorBorderColor="crimson"
              focusBorderColor="lime"
              onChange={(e) => handleChange(e)}
              value={categories}
              // id="category"
              //   placeholder="eg.laravel"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              bg="#ff9e00"
              onClick={handleSubmit}
              isLoading={loadAddCat}
              loadingText="Updating..."
            >
              Update
            </Button>
            <Button
              bg="#999"
              onClick={() => closeModal()}
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

export default UpdateCatModal;

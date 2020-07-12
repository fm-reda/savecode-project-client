import React, { useState } from "react";
import {
  Stack,
  Box,
  Alert,
  AlertIcon,
  Heading,
  FormLabel,
  FormControl,
  Textarea,
  FormErrorMessage,
  useToast,
  Input,
  Button,
  FormHelperText,
} from "@chakra-ui/core";
import { createCustomStarted } from "../Custom-element/CustomFunctions";

export const CategorySub = (props) => {
  const { finish_btn, createCustom, newElement } = props;
  // console.log(newElement);
  const [errors, setErrors] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [disable, setdisable] = useState(false);
  const [loadCreateCat, setLoadCreateCat] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    // console.log(datas.title);
    //check error input
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }
    //save data in state

    setDataCategory({ ...dataCategory, [e.target.id]: e.target.value });
    // inputChange({ ...datas, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    setLoadCreateCat(true);
    e.preventDefault();
    //btn Spining

    if (!dataCategory.subCategory) {
      // if (!dataCategory.category || !dataCategory.subCategory) {
      // setLoadCreateCat(true);
      setTimeout(() => {
        setLoadCreateCat(false);
      }, 2000);
      // setdisable(true);
      setErrors({ msg: "Field or many are empty" });
      setShowAlert(true);
      // setTimeout(() => {
      //   setLoadCreateCat(false);
      // }, 2000);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      // setShowAlert(false);
      //request axios after submit
    } else {
      //store field for request axios
      // const category = dataCategory.category;
      // const subCategory = dataCategory.subCategory;
      const newCustom = {
        category: newElement.default_category.slug,
        subCategory: dataCategory.subCategory,
        element_id: newElement.id,
      };
      setTimeout(() => {
        createCustomStarted(newCustom).then((res) => {
          setLoadCreateCat(false);
          // console.log(res);
          // console.log("test");
          if (res) {
            if (res.status == 201) {
              createCustom(res.data);
              toast({
                title: "Element created.",
                description: "We've created your code element for you.",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
              });
              //afficher next
              //   setNextStatus(true);
              setdisable(true);
            } else if (res.status === 401) {
              setShowAlert(true);
              setErrors({ msg: " not authorized " });
            } else if (res.status === 500) {
              setShowAlert(true);
              setErrors({ msg: " Error conection " });
            }
          } else {
            setLoadCreateCat(false);
            setShowAlert(true);
            setErrors({
              msg: "The server not responding. Please try again ",
            });
          }
        });
        // alert(JSON.stringify(values, null, 2));
      }, 1000);
    }
  };
  return (
    <Box p={5} rounded="lg" mb={5}>
      {showAlert && (
        <Alert mb={2} status="error">
          <AlertIcon />
          {errors.msg}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        {/* <FormControl mb={5}>
          <FormLabel htmlFor="title">
            <Heading fontSize="20px">Category</Heading>
          </FormLabel>
          <Input
          
            isInvalid={errors.category ? true : false}
            errorBorderColor="crimson"
            focusBorderColor="lime"
            onChange={(e) => handleChange(e)}
            id="category"
            placeholder="eg. Laravel, React , Js"
          />
          <FormHelperText color="crimson" id="email-helper-text">
            {errors.category ? errors.category : ""}
          </FormHelperText>
        </FormControl> */}
        <FormControl mb={5}>
          <FormLabel htmlFor="sub category">
            <Heading fontSize="20px">Sub category</Heading>
          </FormLabel>
          <Input
            // isDisabled={true}
            isInvalid={errors.subCategory ? true : false}
            errorBorderColor="crimson"
            focusBorderColor="lime"
            onChange={(e) => handleChange(e)}
            id="subCategory"
            placeholder="eg. Migration ,Passport"
          />
          <FormHelperText color="crimson" id="email-helper-text">
            {errors.subCategory ? errors.subCategory : ""}
          </FormHelperText>
        </FormControl>
        <Button
          isDisabled={disable}
          mt={4}
          w="100%"
          variantColor="teal"
          isLoading={loadCreateCat}
          loadingText="Creating..."
          type="submit"
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

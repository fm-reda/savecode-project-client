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
  Select,
} from "@chakra-ui/core";
import { Field } from "formik";
import { createElementFunc } from "../ElementFunctions";
import { getDefaultCategories } from "../ElementFunctions";
import { useEffect } from "react";

export const FormNewElement = (props) => {
  const { inputChange, setNextStatus, responseElement } = props;
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState([]);
  const [disable, setdisable] = useState(false);
  const [loadCreateElm, setLoadCreateElm] = useState(false);
  const [datas, setDatas] = useState({ categories: 2 });
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [disableTitle, setDisableTitle] = useState(false);
  const toast = useToast();
  //---------------------------------Function Change

  useEffect(() => {
    getDefaultCategories().then((res) => {
      // console.log(res);
      setDefaultCategories(res.data.success);
    });
  }, []);
  const handleChange = (e) => {
    setdisable(false);

    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }
    //save data in state
    // console.log(e.target.value);
    setDatas({ ...datas, [e.target.id]: e.target.value });
    inputChange({ ...datas, [e.target.id]: e.target.value });
    // console.log(datas);
  };
  //---------------------------------Function Submit
  const handleSubmit = (e) => {
    // console.log(e.target);
    e.preventDefault();
    setLoadCreateElm(true);
    // setTimeout(() => {
    //   setLoadCreateElm(false);
    // }, 1000);

    //--------------------------------check if field are empty after submit
    if (!datas.title || !datas.code || !datas.description) {
      // setdisable(true);  
      setErrors({ msg: "Field or many are empty" });
      setShowAlert(true);
      setTimeout(() => {
        setLoadCreateElm(false);
      }, 2000);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      // setShowAlert(false);
    } else {
      //store field for request axios
      const newElement = {
        title: datas.title,
        code: datas.code,
        description: datas.description,
        default_category_id: datas.categories,
      };
      setTimeout(() => {
        createElementFunc(newElement).then((res) => {
          setLoadCreateElm(false);
          console.log(res);

          if (res) {
            if (res.status == 201) {
              responseElement(res.data.success);
              toast({
                title: "Element created.",
                description: "We've created your code element for you.",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
              });
              setNextStatus(true);
              setdisable(true);
            } else if (res.status === 401) {
              setShowAlert(true);
              setErrors({ msg: " not authorized " });
            } else if (res.status === 500) {
              setShowAlert(true);
              setErrors({ msg: " Error conection " });
            }
          } else {
            setLoadCreateElm(false);
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
    <Stack>
      <Box
      //  mt="200px"
      >
        <Box p={5} borderWidth="1px" width="400px">
          {showAlert && (
            <Alert status="error">
              <AlertIcon />
              {errors.msg}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl mb={5}>
              <FormLabel htmlFor="categories">
                <Heading fontSize="15px">Categories</Heading>
              </FormLabel>

              <Select id="categories" onChange={(e) => handleChange(e)}>
                {defaultCategories.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category.title}
                  </option>
                ))}

                {/* <option value="3">react</option> */}
              </Select>
              {/* <Select id="react" placeholder="Autre" value="react" /> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="title">
                <Heading fontSize="15px">Title</Heading>
              </FormLabel>
              <Input
                // isDisabled={true}
                isInvalid={errors.title ? true : false}
                errorBorderColor="crimson"
                focusBorderColor="lime"
                onChange={(e) => handleChange(e)}
                id="title"
                placeholder="eg. Install laravel"
              />
              <FormHelperText color="crimson" id="email-helper-text">
                {errors.title ? errors.title : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mb={5}>
              <FormLabel htmlFor="code">
                <Heading fontSize="15px">Code</Heading>
              </FormLabel>
              <Textarea
                onChange={(e) => handleChange(e)}
                mb={1}
                isInvalid={errors.code ? true : false}
                errorBorderColor="crimson"
                focusBorderColor="lime"
                id="code"
                placeholder="eg. php artisan serv"
              ></Textarea>
              <FormHelperText color="crimson" id="email-helper-text">
                {errors.code ? errors.code : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mb={5}>
              <FormLabel htmlFor="description">
                {" "}
                <Heading fontSize="15px">Description</Heading>
              </FormLabel>
              <Textarea
                onChange={(e) => handleChange(e)}
                mb={1}
                isInvalid={errors.description ? true : false}
                errorBorderColor="crimson"
                focusBorderColor="lime"
                id="description"
                placeholder="eg. About your element"
              ></Textarea>
              <FormHelperText color="crimson" id="email-helper-text">
                {errors.description ? errors.description : ""}
              </FormHelperText>
            </FormControl>

            <Button
              isDisabled={disable}
              mt={4}
              w="100%"
              variantColor="teal"
              isLoading={loadCreateElm}
              loadingText="Creating..."
              type="submit"
            >
              Create
            </Button>
          </form>
        </Box>
      </Box>
    </Stack>
  );
};

{
  /* <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        setShowAlert(false);
        setLoadCreateElm(true);
        // console.log(values.email);

        const newElement = {
          title: values.title,
          code: values.code,
          description: values.description,
        };
        setTimeout(() => {
          createElementFunc(newElement).then((res) => {
            setLoadCreateElm(false);
            console.log(res);
            // console.log("test");
            if (res) {
              if (res.status == 201) {
                toast({
                  title: "Element created.",
                  description: "We've created your code element for you.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                });
                setdisable(true);
              } else if (res.status === 401) {
                setShowAlert(true);
                setErrors({ msg: " not authorized " });
              } else if (res.status === 500) {
                setShowAlert(true);
                setErrors({ msg: " Error conection " });
              }
            } else {
              setLoadCreateElm(false);
              setShowAlert(true);
              setErrors({
                msg: "The server not responding. Please try again ",
              });
            }
          });
          // alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    > */
}

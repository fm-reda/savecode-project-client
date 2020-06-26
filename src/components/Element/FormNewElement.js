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
import { Field } from "formik";
import { createElementFunc } from "../ElementFunctions";

export const FormNewElement = (props) => {
  const { inputChange, setNextStatus } = props;
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState([]);
  const [disable, setdisable] = useState(false);
  const [loadCreateElm, setLoadCreateElm] = useState(false);
  const [datas, setDatas] = useState([]);
  const toast = useToast();
  //---------------------------------Function Change

  const handleChange = (e) => {
    setdisable(false);

    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }
    //save data in state

    setDatas({ ...datas, [e.target.id]: e.target.value });
    inputChange({ ...datas, [e.target.id]: e.target.value });
    // console.log(datas);
  };
  //---------------------------------Function Submit
  const handleSubmit = (e) => {
    // console.log(e.target);
    e.preventDefault();
    setLoadCreateElm(true);
    setTimeout(() => {
      setLoadCreateElm(false);
    }, 1000);

    //--------------------------------check if field are empty after submit
    if (!datas.title || !datas.code || !datas.description) {
      // setdisable(true);
      setErrors({ msg: "Field or many are empty" });
      setShowAlert(true);
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
        {showAlert && (
          <Alert status="error">
            <AlertIcon />
            {errors.msg}
          </Alert>
        )}

        <Box p={5} borderWidth="1px" width="400px">
          <form onSubmit={handleSubmit}>
            <FormControl mb={5}>
              <FormLabel htmlFor="title">
                <Heading fontSize="20px">Title</Heading>
              </FormLabel>
              <Input
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
                <Heading fontSize="20px">Code</Heading>
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
                <Heading fontSize="20px">Description</Heading>
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
      {/* <Formik
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
          > */}
    </Stack>
  );
};

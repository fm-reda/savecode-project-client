import React, { useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Stack,
  Box,
  Heading,
  Alert,
  AlertIcon,
  Text,
  Textarea,
  useToast,
  FormHelperText,
} from "@chakra-ui/core";
import { Field, Formik } from "formik";
import { createElementFunc } from "../ElementFunctions";

export const FormAddElement = (props) => {
  const { handleLogin, handleChange } = props;
  if (handleChange) {
    console.log("handlechoneg here");
  }
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [disable, setdisable] = useState(false);
  const [loadCreateElm, setLoadCreateElm] = useState(false);
  const toast = useToast();

  function validateTitle(value) {
    setdisable(false);
    let error;
    if (!value) {
      error = "Title is required";
    }
    return error;
  }
  function validateCode(value) {
    let error;
    if (!value) {
      error = "Code is required";
    }

    return error;
  }
  function validateDescription(value) {
    let error;
    if (!value) {
      error = "Description is required";
    }

    return error;
  }

  return (
    <Stack>
      <Box mx="auto">
        {showAlert && (
          <Alert status="error">
            <AlertIcon />
            {errors.msg}
          </Alert>
        )}

        <Box p={5} borderWidth="1px" width="400px">
          <Formik
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
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Field name="title" validate={validateTitle}>
                  {({ field, form }) => (
                    <FormControl
                      mb={5}
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel htmlFor="title">
                        <Heading fontSize="20px">Title</Heading>
                      </FormLabel>
                      <Input
                        {...field}
                        onChange={(e) => handleChange(e)}
                        id="title"
                        placeholder="eg. Install laravel"
                      />
                  
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="code" validate={validateCode}>
                  {({ field, form }) => (
                    <FormControl
                      mb={5}
                      isInvalid={form.errors.code && form.touched.code}
                    >
                      <FormLabel htmlFor="code">
                        {" "}
                        <Heading fontSize="20px">Code</Heading>
                      </FormLabel>
                      <Textarea
                        {...field}
                        // onChange={(e) => handleChange(e)}
                        type="textarea"
                        id="code"
                        placeholder="eg. php artisan serv"
                      ></Textarea>
                      <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description" validate={validateDescription}>
                  {({ field, form }) => (
                    <FormControl
                      mb={5}
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel htmlFor="description">
                        {" "}
                        <Heading fontSize="20px">Description</Heading>
                      </FormLabel>
                      <Textarea
                        {...field}
                        onChange={(e) => handleChange(e)}
                        type="textarea"
                        id="description"
                        placeholder=""
                      ></Textarea>
                      {/* <Input
                        {...field}
                        type="textarea"
                        id="description"
                        placeholder=""
                      /> */}
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

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
            )}
          </Formik>
        </Box>
      </Box>
    </Stack>
  );
};

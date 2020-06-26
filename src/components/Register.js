// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Stack,
  Box,
  Heading,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/core";
import { register } from "./UserFunctions";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const { handleSubmit } = props;

  // <console className="log"></console>(props);
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errors, setErrors] = useState([]);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const toast = useToast();
  //   const { handleLogin } = props;

  //Validation form
  function validateName(value) {
    // setShowAlert(false);

    let error;
    if (!value) {
      error = "Name is required";
    }

    return error;
  }
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!value.includes("@")) {
      error = "email Incorrect 😱";
    }
    return error;
  }
  function validatePassword(value) {
    let error;
    setPassword(value);

    if (!value) {
      error = "Password is required";
    }
    //  else if (!(value.includes("@") && value.includes(".com"))) {
    //   error = "email Incorrect 😱";
    // }
    return error;
  }
  function validateCPassword(value) {
    let error;

    if (!(value == password)) {
      error = "Password not match";
    }
    //  else if (!(value.includes("@") && value.includes(".com"))) {
    //   error = "email Incorrect 😱";
    // }
    return error;
  }

  return (
    <Stack>
      <Box mx="auto">
        <Heading textAlign={["left", "center"]} fontWeight="5px" mb={5}>
          Sign up
        </Heading>
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
              console.log("test");
              setLoadingSignUp(true);
              setShowAlert(false);

              // if (errors) {
              //   setShowAlert(true);
              // } // console.log(values.email);
              // console.log(values.password);
              // setEmail(values.email);
              // setPassword(values.password);
              const user = {
                name: values.name,
                email: values.email,
                password: values.password,
                c_password: values.c_password,
              };

              setTimeout(() => {
                register(user).then((res) => {
                  setTimeout(() => {
                    setLoadingSignUp(false);
                  }, 1000);
                  // console.log("test");
                  // console.log(res);
                  if (res && res.status == 201) {
                    toast({
                      title: "Account created.",
                      description: "We've created your account for you.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "top",
                    });
                    console.log(res);

                    localStorage.setItem("userToken", res.data.success.token);
                    console.log(
                      "storage from register component " +
                        localStorage.userToken
                    );
                    localStorage.setItem("name", res.data.success.name);
                    localStorage.setItem("email", res.data.success.email);

                    handleSubmit(res, values.password);

                    // return <Redirect to="/profile" />;
                  } else if (res && res.status == 401) {
                    setShowAlert(true);
                    setErrors({ msg: " Invalid credentials!! " });
                  } else if (res && res.status == 500) {
                    setShowAlert(true);
                    setErrors({ msg: " Error connection " });
                    // console.log(res);
                  } else {
                    setShowAlert(true);
                    setErrors({
                      msg: "The server not responding. Please try again ",
                    });

                    // console.log("no status");

                    // console.log(res);
                  }
                  // else if (res == 0) {
                  //   ("no status");
                  // }
                });
                // alert(JSON.stringify(values, null, 2));

                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Field name="name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...field} type="text" id="name" placeholder="" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      mb={5}
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Input {...field} id="email" placeholder="" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder=""
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="c_password" validate={validateCPassword}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.c_password && form.touched.c_password
                      }
                    >
                      <FormLabel htmlFor="c_password">
                        Confirm password
                      </FormLabel>
                      <Input
                        {...field}
                        type="password"
                        id="c_password"
                        placeholder=""
                      />
                      <FormErrorMessage>
                        {form.errors.c_password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  mt={4}
                  bg="#1db08f"
                  isLoading={loadingSignUp}
                  loadingText="Please wait ..."
                  type="submit"
                  w="100%"
                  _hover={{ bg: "#098468", color: " white" }}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Stack>
  );
};
export default Register;

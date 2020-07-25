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
} from "@chakra-ui/core";
import { login } from "./UserFunctions";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  // <console className="log"></console>(props);
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { handleLogin, goRedirect } = props;
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  //Validation form
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
    if (!value) {
      error = "Password is required";
    }
    //  else if (!(value.includes("@") && value.includes(".com"))) {
    //   error = "email Incorrect 😱";
    // }
    return error;
  }

  return (
    <Stack>
      <Box mx="auto">
        {/* <Heading textAlign={["left", "center"]} fontWeight="5px" mb={5}>
          Sign in
        </Heading> */}
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
              setLoadingSignIn(true);
              setShowAlert(false);
              // console.log(values.email);
              // console.log(values.password);
              // setEmail(values.email);
              // setPassword(values.password);
              const user = {
                email: values.email,
                password: values.password,
              };
              setTimeout(() => {
                login(user).then((res) => {
                  setTimeout(() => {
                    setLoadingSignIn(false);
                  }, 1000);

                  // console.log(res);
                  if (res && res.status == 200) {
                    
                    goRedirect();
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

                <Button
                  w="100%"
                  mt={4}
                  // variantColor="teal"
                  bg="#ff9e00"
                  // isLoading={props.isSubmitting}
                  isLoading={loadingSignIn}
                  loadingText="Please wait ..."
                  color="#fff"
                  _hover={{ bg: "#b09e50", color: " white" }}
                  type="submit"
                  fontWeight="600"
                  fontSize="lg"
                >
                  Sign in
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Stack>
  );
};
export default Login;

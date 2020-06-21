import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Stack,
} from "@chakra-ui/core";
import { Field, Formik } from "formik";

export const Test = () => {
  console.log("reqsdq");

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value !== "Naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Stack mt="200px">
      <Formik
        initialValues={{ name: "Sasuke" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

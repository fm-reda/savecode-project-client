import React from "react";
import { Stack, Box, Heading } from "@chakra-ui/core";
import { FormAddElement } from "./Element/form.AddElement";
import { FormNewElement } from "./Element/FormNewElement";

const ManageGallery = () => {
  return (
    <>
      <Stack>
        <Box    mx="auto">
          <FormNewElement />
        </Box>
      </Stack>
    </>
  );
};

export default ManageGallery;

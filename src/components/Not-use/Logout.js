import React, { useEffect } from "react";
import { Stack, Box, Heading } from "@chakra-ui/core";

export const Logout = () => {
  useEffect(() => {
    // localStorage.setItem("userToken", "");
  }, []);
  return (
    <Stack>
      <Box mt="120px" bg="#12FFF6" p="20px" mx="auto">
        <Heading>Hello Mr </Heading>
      </Box>
    </Stack>
  );
};

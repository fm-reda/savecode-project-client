import React from "react";

import { profile } from "./UserFunctions";
import {
  Stack,
  Box,
  Text,
  Button,
  ButtonGroup,
  Heading,
} from "@chakra-ui/core";
import { Test } from "./Not-use/Test";
import illus1 from "./../images/illustration/professor.png";

function Landing(props) {
  const { loggedInStatus } = props;
  // console.log(loggedInStatus);
  const handleClick = () => {
    // localStorage.removeItem("userToken");
    // console.log(localStorage);

    // console.log(localStorage);
    profile().then((res) => {
      //   console.log(res);
    });
    // console.log("test");

    // localStorage.setItem("chef", param);
  };

  return (
    <Stack spacing={3}>
      {/* <Test /> */}
      <Box
        bgImage={`url('${illus1}')`}
        bgPos="center"
        bgSize="30%"
        bgRepeat="no-repeat"
        mt="80px"
        p={5}
        fontSize="50px"
        color="white"
        shadow="md"
        bg="#288"
        borderWidth="1px"
        h="500px"
      >
        <Heading>Hello</Heading>
        <Heading>user</Heading>
        <Text fontsize="50px" my={6}>
          Welcom User
        </Text>
        <Button bg="#FFF" variantColor="teal" variant="outline">
          Get started
        </Button>
      </Box>
      {/* <Test /> */}
    </Stack>
  );
}

export default Landing;

// import React, { Component } from "react";
//  import { Container, makeStyles, Box, Button, shadows } from "@material-ui/core";
//  import { profile } from "./UserFunctions";

// class Landing extends Component {
//   render() {
//     return (
//       <div>
//         <Container className={classes.cont} maxWidth="md">
//           <Box component="h1" m={5} px={5} boxShadow={2} width={400}>
//             Welcom
//           </Box>
//           <Button onClick={handleClick}>profil</Button>
//         </Container>
//       </div>
//     );
//   }
// }

// export default Landing;

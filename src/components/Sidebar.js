import React from "react";

import { Box, Divider } from "@chakra-ui/core";
import { NavLink } from "react-router-dom";
import Logo from "./../images/Logo/logo5white.png";
import { useEffect } from "react";

import { useState } from "react";
import { getCategories } from "./Category/CategoryFunctions";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.success);
      // console.log(res);
    });
  }, []);
  return (
    <Box h="100vh" bg="firebase" w="15%">
      <NavLink to="/home">
        {" "}
        <Box
          // border="1px"
          pt="85px"
          mx="auto"
          bgImage={`url('${Logo}')`}
          bgPos="center"
          bgSize="90%"
          bgRepeat="no-repeat"
          w="200px"
          h="10px"
          // h="40px"
          color="#FFF"
        ></Box>
      </NavLink>
      <Divider color="#fff"></Divider>
      <Box p={5} color="#FFF" textAlign="left">
        <ul>
          {categories.map((category) => (
            <li>{category.slug}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;

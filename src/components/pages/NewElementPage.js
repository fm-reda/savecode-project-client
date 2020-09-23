import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Text,
  Stack,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  Input,
  Textarea,
  Alert,
  AlertIcon,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/core";
import CKEditor from "ckeditor4-react";
import { FormNewElement } from "../Element/FormNewElement";
import { getDefaultCategories, createElementFunc } from "../ElementFunctions";
import { getCategories, createCategory } from "../Category/CategoryFunctions";
import { createCustomStarted } from "../Custom-element/CustomFunctions";
import { LogStatusContext } from "../../App";
import ModalCategory from "../Category/ModalCategory";
import ModalSubCategory from "../Category/ModalSubCategory";
import { createSubCategory } from "../Category/SubCategoryFunctions";
import { Redirect } from "react-router-dom";

const NewElementPage = (props) => {
  const rendering = useContext(LogStatusContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModalSub, setShowModalSub] = useState(false);
  const [showModalCat, setShowModalCat] = useState(false);

  const { inputChange, responseElement } = props;
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [disable, setdisable] = useState(false);
  const [loadCreateElm, setLoadCreateElm] = useState(false);
  const [datas, setDatas] = useState({});
  // const [datas, setDatas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [elementRender, setElementRender] = useState(false);
  const [showInputCat, setShowInputCat] = useState(false);
  const [category, setCategory] = useState("laravel");
  const [subCategory, setSubCategory] = useState("");
  const [renderNewElement, setRenderNewElement] = useState(false);
  const [fromNewElement, setFromNewElement] = useState(true);

  // const [disableTitle, setDisableTitle] = useState(false);
  const toast = useToast();
  // console.log("test");
  useEffect(() => {
    getCategories().then((res) => {
      if (res) {
        // console.log(res.data.success.categories[2].sub_categories);
        setCategories(res.data.success.categories);
        
        // console.log(res.data.success.categories[0].sub_categories[0].title);
        // console.log(res.data.success.categories[0].sub_categories);
        if (res.data.success.categories[0].sub_categories[0]) {
          setSubCategories(res.data.success.categories[0].sub_categories);

          setSubCategory(
            res.data.success.categories[0].sub_categories[0].title
          );
        } else {
          setSubCategory("");
        }
      }
    });
  }, []);
  useEffect(() => {
    console.log("category in useeffect" + category);
    getCategories().then((res) => {
      if (res) {
        // setCategory(res.data.success.categories[0].title);
        setCategories(res.data.success.categories);
        res.data.success.categories.map((item, i) => {
          if (item.title === category) {
            // console.log(item);
            setSubCategories(item.sub_categories);
            // console.log(item.sub_categories);
            if (item.sub_categories[0]) {
              setSubCategory(item.sub_categories[0].title);
            } else {
              setSubCategory("");
            }
          }
        });
      }
      // console.log(res.data.success.categories[2].sub_categories);
    });
    // setRenderNewElement(!renderNewElement);
  }, [renderNewElement]);

  const handleChangeDescription = (e) => {
    setDatas({ ...datas, description: e.editor.getData() });
    // console.log(datas);
  };
  const handleChangeCode = (e) => {
    setDatas({ ...datas, code: e.editor.getData() });
    // console.log(datas);
  };

  const handleChange = (e) => {
    // console.log(e);

    setdisable(false);
    // console.log(e.target.id);

    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: "Required!!" });
    } else {
      setErrors({ ...errors, [e.target.id]: false });
    }

    // console.log(datas);

    //Fill select sub category from table category
    if ([e.target.id] == "category") {
      setCategory(e.target.value);

      // setShowSub(false);
      categories.map((item, i) => {
        if (item.title === e.target.value) {
          // console.log(item);
          setSubCategories(item.sub_categories);
          if (item.sub_categories[0]) {
            setSubCategory(item.sub_categories[0].title);
          } else {
            setSubCategory("");
          }
        }
      });
    } else if ([e.target.id] == "subCategory") {
      setSubCategory(e.target.value);
    } else setDatas({ ...datas, [e.target.id]: e.target.value });
  };
  //--------------------------------------------------------------------Function Submit

  const handleSubmit = (e) => {
  
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
        default_category_title: category,
      };
      // console.log(newElement);
      setTimeout(() => {
        createElementFunc(newElement).then((res) => {
          setLoadCreateElm(false);
          // console.log(res);

          if (res) {
            if (res.status == 201) {
              // console.log(res);
              const newCustom = {
                category: category,
                subCategory: subCategory,
                element_id: res.data.success.id,
              };
              // console.log(newCustom);
              createCustomStarted(newCustom).then((res) => {
                rendering();
              });
              // responseElement(res.data.success);
              toast({
                title: `Element ${datas.title} created.`,
                description: "We've created your code element for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              setdisable(true);
              // props.history.push("/");
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
      }, 1000);
    }
  };

  //********************************Modal category function */
  const handleCat = () => {
    // console.log(datas.categories);
    setShowModalCat(true);
    onOpen();
  };
  const getNewCategory = (e) => {
    // console.log(e);
    createCategory({ category: e }).then((res) => {
      // console.log(res);
      setRenderNewElement(!renderNewElement);
      rendering(true);
      setShowModalCat(false);
      // setTimeout(() => {
      //   closeModal();
      // }, 5000);
    });
  };
  //********************************Modal sub category function */
  const handleSub = () => {
    // console.log(datas.categories);
    setShowModalSub(true);
    onOpen();
  };
  const getNewSubCategory = (e) => {
    createSubCategory(e).then((res) => {
      // console.log(res);
      setCategory(e.category);
      // console.log("categoryyyyyyy" + e.category);

      setRenderNewElement(!renderNewElement);
      rendering(true);
      setShowModalSub(false);
      // setTimeout(() => {
      //   closeModal();
      // }, 5000);
    });

    // rendering();
  };
  const closeModal = () => {
   
    setShowModalSub(false);
    setShowModalCat(false);
    onClose();
  };
  return (
    <>
      {!localStorage.userToken ? (
        <Redirect to="/login" />
      ) : (
        <Stack
          bg="#eee"
          // h="100vh"
          //  h="100vh"
          pb="100px"
        >
          <Flex ml="15%" mt="7%" justifyContent="center" p={5}>
            {showModalCat && (
              <ModalCategory
                openModal={onOpen}
                closeModal={closeModal}
                isOpen={isOpen}
                getNewCategory={getNewCategory}
              />
            )}
            {showModalSub && (
              <ModalSubCategory
                category={category}
                openModal={onOpen}
                closeModal={closeModal}
                isOpen={isOpen}
                getNewSubCategory={getNewSubCategory}
              />
            )}
            <Box width="60%">
              <Heading mb={3}>Create New Element</Heading>
              {elementRender && <Heading>render</Heading>}
              <Box bg="#fff" rounded="10px" shadow="lg">
                <Box p={5}>
                  {showAlert && (
                    <Alert mb={5} status="error">
                      <AlertIcon />
                      {errors.msg}
                    </Alert>
                  )}
                  <form onSubmit={handleSubmit}>
                    <Flex>
                      {/* **********************************************************select with category */}

                      <Flex w="50%">
                        <FormControl mb={5} mr={5} w="50%">
                          <FormLabel mb={3} htmlFor="categories">
                            <Heading fontSize="15px">Categories</Heading>
                          </FormLabel>

                          <Select
                            id="category"
                            onChange={(e) => handleChange(e)}
                          >
                            {categories.map((category, i) => (
                              <option key={i} value={category.title}>
                                {category.title}
                              </option>
                            ))}

                            {/* <option value="3">react</option> */}
                          </Select>
                        </FormControl>
                        <Button mt="33px" bg="#c5c5c5" onClick={handleCat}>
                          New category
                        </Button>
                      </Flex>

                      {/* ** **********************************************************input sub categorie */}

                      <Flex w="50%">
                        <FormControl mb={5} w="50%" mr={5}>
                          <FormLabel mb={3} htmlFor="subCategory">
                            <Heading fontSize="15px">Sub Category</Heading>
                          </FormLabel>

                          <Select
                            id="subCategory"
                            onChange={(e) => handleChange(e)}
                          >
                            {subCategories.map((subCategory, i) => (
                              <option key={i} value={subCategory.title}>
                                {subCategory.title}
                              </option>
                            ))}

                            {/* <option value="3">react</option> */}
                          </Select>
                        </FormControl>
                        <Button mt="33px" bg="#c5c5c5" onClick={handleSub}>
                          New Sub
                        </Button>

                        {/* <Select id="react" placeholder="Autre" value="react" /> */}
                      </Flex>
                    </Flex>

                    <FormControl mb={5}>
                      <FormLabel mb={3} htmlFor="title">
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
                      <FormLabel mb={3} htmlFor="code">
                        <Heading fontSize="15px">Code</Heading>
                      </FormLabel>
                      {/* <Textarea
                        onChange={(e) => handleChange(e)}
                        mb={1}
                        isInvalid={errors.code ? true : false}
                        errorBorderColor="crimson"
                        focusBorderColor="lime"
                        id="code"
                        placeholder="eg. php artisan serv"
                      ></Textarea> */}
                      <CKEditor
                        data="<p>Write code element here.</p>"
                        onChange={(e) => handleChangeCode(e)}
                        isInvalid="true"
                        // onChange={(e) => handleChange(e)}
                        // name="description"
                        // id="description"
                        isInvalid={errors.code ? true : false}
                      />
                      <FormHelperText color="crimson" id="email-helper-text">
                        {errors.code ? errors.code : ""}
                      </FormHelperText>
                    </FormControl>

                    <FormControl mb={5}>
                      <FormLabel mb={3} htmlFor="description">
                        {" "}
                        <Heading fontSize="15px">Description</Heading>
                      </FormLabel>
                      {/* <Textarea
                        name="description"
                        onChange={(e) => handleChange(e)}
                        mb={1}
                        isInvalid={errors.description ? true : false}
                        errorBorderColor="crimson"
                        focusBorderColor="lime"
                        id="description"
                        placeholder="eg. About your element"
                      ></Textarea> */}

                      <CKEditor
                        data="<p>Description of your element</p>"
                        onChange={(e) => handleChangeDescription(e)}
                        // onChange={(e) => handleChange(e)}
                        // name="description"
                        // id="description"
                        isInvalid={errors.description ? true : false}
                      />
                      <FormHelperText color="crimson" id="email-helper-text">
                        {errors.description ? errors.description : ""}
                      </FormHelperText>
                    </FormControl>
                    <Flex>
                      <Button
                        mx="auto"
                        isDisabled={disable}
                        mt={4}
                        w="20%"
                        variantColor="teal"
                        isLoading={loadCreateElm}
                        loadingText="Creating..."
                        type="submit"
                      >
                        Create
                      </Button>
                    </Flex>
                  </form>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Stack>
      )}
    </>
  );
};
export default NewElementPage;

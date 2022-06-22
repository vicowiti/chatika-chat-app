import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Show,
  useToast,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill in all the fields.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/users/auth",
        { email, password },
        config
      );

      toast({
        title: "Login Successful.✅",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          _placeholder={{
            color: "gray",
          }}
        />
      </FormControl>

      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            _placeholder={{
              color: "gray",
            }}
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        variant="solid"
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Use Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;

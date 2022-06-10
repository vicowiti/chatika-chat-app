import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image.",

        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatika");
      data.append("cloud_name", "viowiti");
      fetch("https://api.cloudinary.com/v1_1/viowiti/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  async function handleSubmit() {
    setLoading(true);
    if (!firstName || !lastName || !email || !password || !password2) {
      toast({
        title: "Please fill in all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    if (password !== password2) {
      toast({
        title: "Passwords don't match.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/users",
        { firstName, lastName, email, password, pic },
        config
      );

      toast({
        title: "Registration Successful.✅",

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
        description: error.response.dat.message,
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
      <FormControl isRequired id="firstName">
        <FormLabel>FirstName</FormLabel>
        <Input
          _placeholder={{
            color: "gray",
          }}
          variant="filled"
          placeholder="Enter Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="lastName">
        <FormLabel>LastName</FormLabel>
        <Input
          _placeholder={{
            color: "gray",
          }}
          placeholder="Enter Your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          _placeholder={{
            color: "gray",
          }}
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <FormControl isRequired id="password2">
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            _placeholder={{
              color: "gray",
            }}
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Profile pic</FormLabel>
        <Input
          type="file"
          p={0.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;

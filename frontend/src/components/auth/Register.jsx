import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);

  const postDetails = (pics) => {};

  const handleSubmit = () => {};

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
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;

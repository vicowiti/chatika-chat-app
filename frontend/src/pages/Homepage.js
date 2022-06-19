import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { BsChatSquareDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (loggedUser) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        bg="#fff"
        w="100%"
        borderRadius="lg"
        m="40px 0 15px 0"
        borderWidth="1px"
      >
        <Text
          textAlign="center"
          fontSize="4xl"
          fontFamily="Kdam Thmor Pro"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Chatika! <BsChatSquareDots color="blue" />
        </Text>
      </Box>
      <Box bg="#FFF" p={4} borderRadius="lg" w="100%" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;

import { Box } from "@chakra-ui/layout";
import React from "react";
import ChatBox from "../components/loggedusers/ChatBox";
import MyChats from "../components/loggedusers/MyChats";

import SideDrawer from "../components/loggedusers/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const ChatsPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        p="10"
        h="90vh"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatsPage;

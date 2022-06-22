import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  console.log("rendered");
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#e8e8e8"
      _hover={{
        background: "#3882ac",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.firstName}
        src={user.pic}
      />
      <Box>
        <Text>{user.firstName}</Text>
        <Text fontSize="xs">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

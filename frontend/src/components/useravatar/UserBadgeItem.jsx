import { Box, CloseButton } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor="teal"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.firstName}
      <CloseButton pl={1} />
    </Box>
  );
};

export default UserBadgeItem;

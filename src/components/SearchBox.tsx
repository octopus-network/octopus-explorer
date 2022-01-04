import {
  Box,
  Flex,
  Input,
  IconButton,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { getLinkFromSearch } from "../libs/searchFuncs";

const SearchBox = () => {
  const navigate = useNavigate();
  const appoloClient = useApolloClient();
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const onSearch = async () => {
    setIsSearching(true);
    let link = await getLinkFromSearch(keyword, appoloClient);
    await new Promise((resolve) => setTimeout(() => resolve(0), 500));
    navigate(link);
    setIsSearching(false);
  };

  return (
    <Flex>
      <Input
        color="grey"
        background="white"
        onChange={(e) => setKeyword(e.target.value)}
        size="lg"
        flex="1"
        placeholder="Search for block/extrinsic/account"
        borderRightRadius="0"
      />
      <Button
        colorScheme="teal"
        size="lg"
        borderLeftRadius="0"
        onClick={onSearch}
        isLoading={isSearching}
        disabled={isSearching}
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchBox;

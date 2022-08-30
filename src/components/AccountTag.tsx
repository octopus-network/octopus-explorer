import { Tag } from "@chakra-ui/react";
const AccountTag = ({ account }) => {
  const {
    isContract,
    erc20TokenContract,
    erc721TokenContract,
    erc1155TokenContract,
  } = account;
  const tagConfig = {};
  return (
    <Tag size="sm" colorScheme={isContract ? "primary" : "secondary"} ml={2}>
      {isContract
        ? erc20TokenContract
          ? "ERC20 Token"
          : erc721TokenContract
          ? "ERC721 Token"
          : erc1155TokenContract
          ? "ERC1155 Token"
          : "Contract"
        : "User"}
    </Tag>
  );
};
export default AccountTag;

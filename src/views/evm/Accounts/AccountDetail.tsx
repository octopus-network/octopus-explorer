import {
  IconButton,
  Flex,
  HStack,
  Icon,
  Heading,
  Box,
  Tab,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tag,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getNativeAmountHuman } from "../../../libs/polkadotApi";
import CopyButton from "../../../components/CopyButton";
import SearchBox from "../../../components/SearchBox";
import StyledLink from "components/StyledLink";
import { MdApps } from "react-icons/md";
import { briefHex } from "libs/utils";
import { ACCOUNT_QUERY } from "./queries";
import EvmAcountData from "./EvmAccountData";
import EvmContractData from "./Contracts/EvmContractData";
import AppchainData from "./AppchainData";
import AccountTag from "components/AccountTag";
import { amountToHuman } from "libs/utils";

const AccountDetail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState<any>();

  const accountQuery = useQuery(ACCOUNT_QUERY, {
    variables: { id: id.toLowerCase() },
  });

  useEffect(() => {
    accountQuery.startPolling(30 * 1000);
    return () => {
      accountQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (accountQuery.data) {
      const { account } = accountQuery.data;
      console.log("account:", account);
      setAccount(account);
    } else {
      setAccount(null);
    }
  }, [accountQuery]);

  return (
    <div>
      {account && (
        <Flex justify="space-between" align="center">
          <Heading as="h6" size="sm">
            {account.isContract ? "Contract Detail" : "Account Detail"}
          </Heading>
          <SearchBox></SearchBox>
        </Flex>
      )}
      <Box mt={5} p={4} background="white" boxShadow="sm" borderRadius="lg">
        {!account ? (
          <Box
            p={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Box>
        ) : (
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    ID
                  </Heading>
                </Td>
                <Td>
                  <Flex align="center">
                    <Text>{id}</Text>
                    <AccountTag account={account} />
                    <CopyButton value={id} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Balance
                  </Heading>
                </Td>
                <Td>{getNativeAmountHuman(account.freeBalance)}</Td>
              </Tr>
              {account.erc20TokenContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      Name
                    </Heading>
                  </Td>
                  <Td>{account.erc20TokenContract.name}</Td>
                </Tr>
              )}
              {account.erc20TokenContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      Symbol
                    </Heading>
                  </Td>
                  <Td>{account.erc20TokenContract.symbol}</Td>
                </Tr>
              )}
              {account.erc20TokenContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      Decimals
                    </Heading>
                  </Td>
                  <Td>{account.erc20TokenContract.decimals}</Td>
                </Tr>
              )}
              {account.erc20TokenContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      TotalSupply
                    </Heading>
                  </Td>
                  <Td>
                    {amountToHuman(
                      account.erc20TokenContract.totalSupply,
                      account.erc20TokenContract.decimals,
                      2
                    )}
                  </Td>
                </Tr>
              )}
              {account.erc721TokenContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      Name
                    </Heading>
                  </Td>
                  <Td>{account.erc721TokenContract.name}</Td>
                </Tr>
              )}
              {account.erc721TokenContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      Symbol
                    </Heading>
                  </Td>
                  <Td>{account.erc721TokenContract.symbol}</Td>
                </Tr>
              )}
              {account.isContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      Creator
                    </Heading>
                  </Td>
                  <Td>
                    <StyledLink to={`/accounts/${account.creator.id}`}>
                      {account.creator.id}
                    </StyledLink>
                    <Tag
                      size="sm"
                      colorScheme={
                        account.creator.isContract ? "primary" : "secondary"
                      }
                      ml={2}
                    >
                      {account.creator.isContract ? "Contract" : "User"}
                    </Tag>
                  </Td>
                </Tr>
              )}
              {account.isContract && (
                <Tr>
                  <Td>
                    <Heading as="h6" size="xs">
                      Created Tx
                    </Heading>
                  </Td>
                  <Td>
                    <StyledLink
                      to={`/transactions/${account.transactionIn.nodes[0].id}`}
                    >
                      {account.transactionIn.nodes[0].id}
                    </StyledLink>
                  </Td>
                </Tr>
              )}
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Created At
                  </Heading>
                </Td>
                <Td>{account.createdAt}</Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
      {account &&
        (account.isContract ? <EvmContractData account={account} /> : null)}
      {account && <EvmAcountData account={account} />}
      {account && <AppchainData account={account} />}
    </div>
  );
};

export default AccountDetail;

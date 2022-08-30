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
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getAmountHuman } from "../../../libs/polkadotApi";
import CopyButton from "../../../components/CopyButton";
import SearchBox from "../../../components/SearchBox";
import StyledLink from "components/StyledLink";
import { MdApps } from "react-icons/md";
import { briefHex } from "libs/utils";
import AccountTag from "components/AccountTag";
import { PAGE_SIZE } from "../Accounts/queries";

const Erc721TokenDetail = () => {
  const { id } = useParams();
  const [token, setToken] = useState<any>();
  const [erc721TransfersPage, setErc721TransfersPage] = useState(0);

  const ERC721_TOKEN_DETAIL_QUERY = gql`
    query erc721Token($id: String!) {
      erc721Token(id: $id) {
        id
        tokenContractId
        idInContract
        tokenURI
      }
    }
  `;

  const ERC721_TRANSFERS_QUERY = gql`
    query erc721Transfers($tokenId: String!, $offset: Int!, $pageSize: Int!) {
      erc721Transfers(
        filter: { tokenId: { equalTo: $tokenId } }
        offset: $offset
        first: $pageSize
        orderBy: TIMESTAMP_DESC
      ) {
        nodes {
          id
          transactionId
          from {
            id
            isContract
            erc20TokenContractId
            erc721TokenContractId
            erc1155TokenContractId
          }
          to {
            id
            isContract
            erc20TokenContractId
            erc721TokenContractId
            erc1155TokenContractId
          }
          tokenContractId
          timestamp
        }
        totalCount
      }
    }
  `;

  const ERC721_BALANCES_QUERY = gql`
    query erc721Transfers($tokenId: String!, $offset: Int!, $pageSize: Int!) {
      erc721Balances(
        filter: { tokenId: { equalTo: $tokenId } }
        offset: $offset
        first: $pageSize
      ) {
        nodes {
          id
          account {
            id
            isContract
            erc20TokenContractId
            erc721TokenContractId
            erc1155TokenContractId
          }
        }
        totalCount
      }
    }
  `;

  const tokenQuery = useQuery(ERC721_TOKEN_DETAIL_QUERY, {
    variables: { id: id.toLowerCase() },
  });

  const erc721TransfersQuery = useQuery(ERC721_TRANSFERS_QUERY, {
    variables: {
      tokenId: id,
      offset: erc721TransfersPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  const erc721BalancesQuery = useQuery(ERC721_BALANCES_QUERY, {
    variables: {
      tokenId: id,
      offset: erc721TransfersPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  useEffect(() => {
    tokenQuery.startPolling(30 * 1000);
    return () => {
      tokenQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (
      (tokenQuery.data && erc721TransfersQuery.data, erc721BalancesQuery.data)
    ) {
      const { erc721Token: token } = tokenQuery.data;
      console.log("token", token);
      setToken({
        ...token,
        ...erc721TransfersQuery.data,
        ...erc721BalancesQuery.data,
      });
    } else {
      setToken(null);
    }
  }, [tokenQuery, erc721TransfersQuery, erc721BalancesQuery]);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Heading as="h6" size="sm">
          Erc721 Token Detail
        </Heading>
        <SearchBox></SearchBox>
      </Flex>
      <Box mt={5} p={4} background="white" boxShadow="sm" borderRadius="lg">
        {!token ? (
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
                    Contract
                  </Heading>
                </Td>
                <Td>
                  <Flex align="center">
                    <StyledLink to={`/accounts/${token.tokenContractId}`}>
                      <Text>{token.tokenContractId}</Text>
                    </StyledLink>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Token ID
                  </Heading>
                </Td>
                <Td>
                  <Flex align="center">
                    <Text>{token.idInContract}</Text>
                    <CopyButton value={token.idInContract} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Token Uri
                  </Heading>
                </Td>
                <Td>
                  <Link
                    href={token.tokenURI}
                    _hover={{ textDecoration: "none" }}
                  >
                    {token.tokenURI}
                  </Link>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
      <Flex mt={5} align="center" justify="space-between" pt={3} pb={4}>
        <HStack>
          <MdApps />
          <Heading as="h6" size="xs">
            Token Data
          </Heading>
        </HStack>
      </Flex>
      <Box p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>
              Erc721 Token Txns(
              {token?.erc20TokenContract?.totalCount || 0})
            </Tab>
            <Tab>
              Holders(
              {token?.erc721Balances?.totalCount || 0})
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {!token ? (
                <Box
                  p={10}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner />
                </Box>
              ) : (
                <Table>
                  <Thead background="primary.50">
                    <Tr>
                      <Th>Transaction Id</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {token?.erc721Transfers.nodes.map(
                      (
                        { id, transactionId, from, to, tokenId, timestamp },
                        idx
                      ) => (
                        <Tr key={`transaction-${id}`}>
                          <Td>
                            <StyledLink to={`/transactions/${transactionId}`}>
                              {briefHex(transactionId, 10)}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${from.id}`}>
                              {briefHex(from.id, 10)}
                            </StyledLink>
                            <AccountTag account={from} />
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${to.id}`}>
                              {briefHex(to.id, 10)}
                            </StyledLink>
                            <AccountTag account={to} />
                          </Td>
                          <Td>
                            <HStack spacing={2} mt={1}>
                              <Icon
                                as={TimeIcon}
                                ml={3}
                                boxSize={3}
                                color="yellow.600"
                              />
                              <Text color="grey" fontSize="sm">
                                {dayjs(timestamp).add(8, "hours").toNow(true)}
                              </Text>
                            </HStack>
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              )}
              <Flex align="center" justify="space-between" mt={4}>
                <div style={{ flexGrow: 1 }} />
                <HStack>
                  <IconButton
                    aria-label="left"
                    icon={<ChevronLeftIcon />}
                    disabled={erc721TransfersPage <= 0}
                    onClick={() =>
                      setErc721TransfersPage(erc721TransfersPage - 1)
                    }
                  />
                  <Box>
                    {erc721TransfersPage + 1} of{" "}
                    {token
                      ? Math.ceil(token?.erc721Transfers.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      erc721TransfersPage + 1 >=
                      Math.ceil(token?.erc721Transfers.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() =>
                      setErc721TransfersPage(erc721TransfersPage + 1)
                    }
                  />
                </HStack>
              </Flex>
            </TabPanel>
            <TabPanel>
              {!token ? (
                <Box
                  p={10}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner />
                </Box>
              ) : (
                <Table>
                  <Thead background="primary.50">
                    <Tr>
                      <Th>Holder</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {token?.erc721Balances.nodes.map(({ id, account }, idx) => (
                      <Tr key={`transaction-${id}`}>
                        <Td>
                          <StyledLink to={`/accounts/${account.id}`}>
                            {account.id}
                          </StyledLink>
                          <AccountTag account={account} />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
              <Flex align="center" justify="space-between" mt={4}>
                <div style={{ flexGrow: 1 }} />
                <HStack>
                  <IconButton
                    aria-label="left"
                    icon={<ChevronLeftIcon />}
                    disabled={erc721TransfersPage <= 0}
                    onClick={() =>
                      setErc721TransfersPage(erc721TransfersPage - 1)
                    }
                  />
                  <Box>
                    {erc721TransfersPage + 1} of{" "}
                    {token
                      ? Math.ceil(token?.erc721Transfers.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      erc721TransfersPage + 1 >=
                      Math.ceil(token?.erc721Transfers.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() =>
                      setErc721TransfersPage(erc721TransfersPage + 1)
                    }
                  />
                </HStack>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default Erc721TokenDetail;

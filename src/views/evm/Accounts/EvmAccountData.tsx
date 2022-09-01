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
import { getNativeAmountHuman } from "../../../libs/polkadotApi";
import StyledLink from "components/StyledLink";
import { MdApps } from "react-icons/md";
import { briefHex } from "libs/utils";
import {
  EVM_TRANSACTIONS_QUERY,
  EVM_ERC20_TRANSACTIONS_QUERY,
  EVM_ERC721_TRANSACTIONS_QUERY,
  EVM_ERC1155_TRANSACTIONS_QUERY,
  PAGE_SIZE,
} from "./queries";
import AccountTag from "components/AccountTag";
const EvmAcountData = ({ account }) => {
  const { id } = account;
  const [detail, setDetail] = useState<any>();
  const [transactionsPage, setTransactionsPage] = useState(0);
  const [erc20TransfersPage, setErc20TransfersPage] = useState(0);
  const [erc721TransfersPage, setErc721TransfersPage] = useState(0);
  const [erc1155TransfersPage, setErc1155TransfersPage] = useState(0);

  const evmTransactionsQuery = useQuery(EVM_TRANSACTIONS_QUERY, {
    variables: {
      id,
      offset: transactionsPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  const evmErc20TransactionsQuery = useQuery(EVM_ERC20_TRANSACTIONS_QUERY, {
    variables: {
      id,
      offset: erc20TransfersPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  const evmErc721TransactionsQuery = useQuery(EVM_ERC721_TRANSACTIONS_QUERY, {
    variables: {
      id,
      offset: erc721TransfersPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  const evmErc1155TransactionsQuery = useQuery(EVM_ERC1155_TRANSACTIONS_QUERY, {
    variables: {
      id,
      offset: erc1155TransfersPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  useEffect(() => {
    evmTransactionsQuery.startPolling(30 * 1000);
    evmErc20TransactionsQuery.startPolling(30 * 1000);
    evmErc721TransactionsQuery.startPolling(30 * 1000);
    evmErc1155TransactionsQuery.startPolling(30 * 1000);
    return () => {
      evmTransactionsQuery.stopPolling();
      evmErc20TransactionsQuery.stopPolling();
      evmErc721TransactionsQuery.stopPolling();
      evmErc1155TransactionsQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (
      account &&
      evmTransactionsQuery.data &&
      evmErc20TransactionsQuery.data &&
      evmErc721TransactionsQuery.data &&
      evmErc1155TransactionsQuery.data
    ) {
      const accountDetail = {
        ...account,
        ...evmTransactionsQuery.data,
        ...evmErc20TransactionsQuery.data,
        ...evmErc721TransactionsQuery.data,
        ...evmErc1155TransactionsQuery.data,
      };
      setDetail(accountDetail);
    } else {
      setDetail(null);
    }
  }, [
    evmTransactionsQuery,
    evmErc20TransactionsQuery,
    evmErc721TransactionsQuery,
    evmErc1155TransactionsQuery,
  ]);

  return (
    <div>
      <Flex mt={5} align="center" justify="space-between" pt={3} pb={4}>
        <HStack>
          <MdApps />
          <Heading as="h6" size="xs">
            EVM Data
          </Heading>
        </HStack>
      </Flex>
      <Box p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>
              Transactions(
              {detail?.transactions?.totalCount || 0})
            </Tab>
            <Tab>
              Erc20 Token Txns(
              {detail?.erc20Transfers?.totalCount || 0})
            </Tab>
            <Tab>
              Erc721 Token Txns(
              {detail?.erc721Transfers?.totalCount || 0})
            </Tab>
            <Tab>
              Erc1155 Token Txns(
              {detail?.erc1155Transfers?.totalCount || 0})
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {!detail ? (
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
                      <Th>ID</Th>
                      <Th>From</Th>
                      <Th></Th>
                      <Th>To</Th>
                      <Th>Value</Th>
                      <Th>Time</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.transactions.nodes.map(
                      ({ id, from, to, value, timestamp, isSuccess }, idx) => (
                        <Tr key={`transaction-${id}`}>
                          <Td>
                            <StyledLink to={`/transactions/${id}`}>
                              {briefHex(id, 10)}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${from.id}`}>
                              {briefHex(from.id, 10)}
                              <AccountTag account={from} />
                            </StyledLink>
                          </Td>
                          <Td>
                            <Tag
                              size="sm"
                              colorScheme={
                                from.id === account.id ? "green" : "orange"
                              }
                              ml={2}
                            >
                              {from.id === account.id ? "Out" : "In"}
                            </Tag>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${to.id}`}>
                              {briefHex(to.id, 10)}
                            </StyledLink>
                            <AccountTag account={to} />
                          </Td>
                          <Td>{getNativeAmountHuman(value)}</Td>
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
                          <Td>
                            <Tag
                              size="sm"
                              colorScheme={isSuccess ? "green" : "red"}
                              mr={2}
                            >
                              {isSuccess ? "Success" : "Fail"}
                            </Tag>
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
                    disabled={transactionsPage <= 0}
                    onClick={() => setTransactionsPage(transactionsPage - 1)}
                  />
                  <Box>
                    {transactionsPage + 1} of{" "}
                    {detail
                      ? Math.ceil(detail?.transactions.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transactionsPage + 1 >=
                      Math.ceil(detail?.transactions.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setTransactionsPage(transactionsPage + 1)}
                  />
                </HStack>
              </Flex>
            </TabPanel>
            <TabPanel>
              {!detail ? (
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
                      <Th></Th>
                      <Th>To</Th>
                      <Th>Value</Th>
                      <Th>Token</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.erc20Transfers.nodes.map(
                      (
                        {
                          id,
                          transactionId,
                          from,
                          to,
                          value,
                          tokenContract,
                          timestamp,
                        },
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
                            <Tag
                              size="sm"
                              colorScheme={
                                from.id === account.id ? "green" : "orange"
                              }
                              ml={2}
                            >
                              {from.id === account.id ? "Out" : "In"}
                            </Tag>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${to.id}`}>
                              {briefHex(to.id, 10)}
                            </StyledLink>
                            <AccountTag account={to} />
                          </Td>
                          <Td>{getNativeAmountHuman(value)}</Td>
                          <Td>
                            <StyledLink to={`/accounts/${tokenContract.id}`}>
                              {briefHex(tokenContract.id, 10)}
                            </StyledLink>
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
                    disabled={erc20TransfersPage <= 0}
                    onClick={() =>
                      setErc20TransfersPage(erc20TransfersPage - 1)
                    }
                  />
                  <Box>
                    {erc20TransfersPage + 1} of{" "}
                    {detail
                      ? Math.ceil(detail?.erc20Transfers.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      erc20TransfersPage + 1 >=
                      Math.ceil(detail?.erc20Transfers.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() =>
                      setErc20TransfersPage(erc20TransfersPage + 1)
                    }
                  />
                </HStack>
              </Flex>
            </TabPanel>
            <TabPanel>
              {!detail ? (
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
                      <Th></Th>
                      <Th>To</Th>
                      <Th>Token</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.erc721Transfers.nodes.map(
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
                            <Tag
                              size="sm"
                              colorScheme={
                                from.id === account.id ? "green" : "orange"
                              }
                              ml={2}
                            >
                              {from.id === account.id ? "Out" : "In"}
                            </Tag>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${to.id}`}>
                              {briefHex(to.id, 10)}
                            </StyledLink>
                            <AccountTag account={to} />
                          </Td>
                          <Td>
                            <StyledLink to={`/erc721_tokens/${tokenId}`}>
                              {briefHex(tokenId, 10)}
                            </StyledLink>
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
                    {detail
                      ? Math.ceil(
                          detail?.erc721Transfers.totalCount / PAGE_SIZE
                        )
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      erc721TransfersPage + 1 >=
                      Math.ceil(detail?.erc721Transfers.totalCount / PAGE_SIZE)
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
              {!detail ? (
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
                      <Th></Th>
                      <Th>To</Th>
                      <Th>Value</Th>
                      <Th>Token</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.erc1155Transfers.nodes.map(
                      (
                        {
                          id,
                          transactionId,
                          from,
                          to,
                          value,
                          tokenId,
                          timestamp,
                        },
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
                            <AccountTag account={to} />
                          </Td>
                          <Td>
                            <Tag
                              size="sm"
                              colorScheme={
                                from.id === account.id ? "green" : "orange"
                              }
                              ml={2}
                            >
                              {from.id === account.id ? "Out" : "In"}
                            </Tag>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${to.id}`}>
                              {briefHex(to.id, 10)}
                            </StyledLink>
                            <AccountTag account={to} />
                          </Td>
                          <Td>{value}</Td>
                          <Td>
                            <StyledLink to={`/erc1155_tokens/${tokenId}`}>
                              {briefHex(tokenId, 10)}
                            </StyledLink>
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
                    disabled={erc1155TransfersPage <= 0}
                    onClick={() =>
                      setErc1155TransfersPage(erc1155TransfersPage - 1)
                    }
                  />
                  <Box>
                    {erc1155TransfersPage + 1} of{" "}
                    {detail
                      ? Math.ceil(
                          detail?.erc1155Transfers.totalCount / PAGE_SIZE
                        )
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      erc1155TransfersPage + 1 >=
                      Math.ceil(detail?.erc1155Transfers.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() =>
                      setErc1155TransfersPage(erc1155TransfersPage + 1)
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

export default EvmAcountData;

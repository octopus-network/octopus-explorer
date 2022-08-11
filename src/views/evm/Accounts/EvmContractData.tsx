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
import { getAmountHuman } from "../../../libs/polkadotApi";
import CopyButton from "../../../components/CopyButton";
import SearchBox from "../../../components/SearchBox";
import StyledLink from "components/StyledLink";
import { MdApps } from "react-icons/md";
import { briefHex } from "libs/utils";
import { TRANSACTIONS_IN_QUERY, PAGE_SIZE, EVM_LOGS_QUERY } from "./queries";
const EvmContractData = ({ account }) => {
  const { id } = account;
  const [detail, setDetail] = useState<any>();
  const [evmLogsPage, setEvmLogsPage] = useState(0);
  const [transactionsInPage, setTransactionsInPage] = useState(0);

  const transactionsInQuery = useQuery(TRANSACTIONS_IN_QUERY, {
    variables: {
      id,
      offset: transactionsInPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  const evmLogsQuery = useQuery(EVM_LOGS_QUERY, {
    variables: {
      contractId: id,
      offset: evmLogsPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  useEffect(() => {
    transactionsInQuery.startPolling(30 * 1000);
    evmLogsQuery.startPolling(30 * 1000);
    return () => {
      transactionsInQuery.stopPolling();
      evmLogsQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (account && transactionsInQuery.data && evmLogsQuery.data) {
      const accountDetail = {
        ...account,
        ...transactionsInQuery.data.account,
        ...evmLogsQuery.data,
      };
      setDetail(accountDetail);
      console.log("accountDetail", accountDetail);
    } else {
      setDetail(null);
    }
  }, [transactionsInQuery, evmLogsQuery]);

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
              Transactions In(
              {detail?.transactionIn?.totalCount || 0})
            </Tab>
            <Tab>
              EvmLog(
              {detail?.evmLogs?.totalCount || 0})
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
                      <Th>To</Th>
                      <Th>Value</Th>
                      <Th>Time</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.transactionIn.nodes.map(
                      (
                        { id, fromId, to, value, timestamp, isSuccess },
                        idx
                      ) => (
                        <Tr key={`transaction-${id}`}>
                          <Td>
                            <StyledLink to={`/transactions/${id}`}>
                              {briefHex(id, 10)}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${fromId}`}>
                              {briefHex(fromId, 10)}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${to.id}`}>
                              {briefHex(to.id, 10)}
                            </StyledLink>
                          </Td>
                          <Td>{getAmountHuman(value)}</Td>
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
                    disabled={transactionsInPage <= 0}
                    onClick={() =>
                      setTransactionsInPage(transactionsInPage - 1)
                    }
                  />
                  <Box>
                    {transactionsInPage + 1} of{" "}
                    {detail
                      ? Math.ceil(detail?.transactionIn.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transactionsInPage + 1 >=
                      Math.ceil(detail?.transactionIn.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() =>
                      setTransactionsInPage(transactionsInPage + 1)
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
                      <Th>ID</Th>
                      <Th>Index</Th>
                      <Th>Transaction</Th>
                      <Th>Data</Th>
                      <Th>Topics</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.evmLogs.nodes.map(
                      ({ id, logIndex, transactionId, data, topics }, idx) => (
                        <Tr key={`evmLog-${id}`}>
                          <Td>{id}</Td>
                          <Td>{logIndex}</Td>
                          <Td>
                            <StyledLink to={`/transactions/${transactionId}`}>
                              {briefHex(transactionId, 10)}
                            </StyledLink>
                          </Td>
                          <Td>
                            <Text wordBreak="break-all">{data}</Text>
                          </Td>
                          <Td>
                            <Text wordBreak="break-all">
                              {topics.length > 0 && JSON.stringify(topics)}
                            </Text>
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
                    disabled={evmLogsPage <= 0}
                    onClick={() => setEvmLogsPage(evmLogsPage - 1)}
                  />
                  <Box>
                    {evmLogsPage + 1} of{" "}
                    {detail
                      ? Math.ceil(detail?.evmLogs.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      evmLogsPage + 1 >=
                      Math.ceil(detail?.evmLogs.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setEvmLogsPage(evmLogsPage + 1)}
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

export default EvmContractData;

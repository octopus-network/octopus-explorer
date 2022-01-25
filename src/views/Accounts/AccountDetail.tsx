import {
  IconButton,
  Flex,
  HStack,
  Icon,
  Heading,
  Input,
  Button,
  Box,
  Tab,
  Link,
  Text,
  CircularProgress,
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
  CircularProgressLabel,
} from "@chakra-ui/react";
import Hash from "components/Hash";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TimeIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { getBalanceOf } from "../../libs/polkadotApi";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { getAmountHuman } from "../../libs/polkadotApi";
import CopyButton from "../../components/CopyButton";
import SearchBox from "../../components/SearchBox";

const CALLS_QUERY = gql`
  query AccountCalls($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      calls(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          section
          method
          args
          timestamp
          isSuccess
          signerId
          extrinsicId
          parentCallId
        }
        totalCount
      }
    }
  }
`;

const TRANSFERS_OUT_QUERY = gql`
  query AccountTransfersOut($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      systemTokenTransfersByFromId(
        offset: $offset
        first: $pageSize
        orderBy: TIMESTAMP_DESC
      ) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`;

const TRANSFERS_IN_QUERY = gql`
  query AccountTransfersIn($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      systemTokenTransfersByToId(
        offset: $offset
        first: $pageSize
        orderBy: TIMESTAMP_DESC
      ) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`;

const PAGE_SIZE = 20;

const AccountDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>();
  const [callsPage, setCallsPage] = useState(0);
  const [transfersOutPage, setTransfersOutPage] = useState(0);
  const [transfersInPage, setTransfersInPage] = useState(0);

  const callsQuery = useQuery(CALLS_QUERY, {
    variables: { id, offset: callsPage * PAGE_SIZE, pageSize: PAGE_SIZE },
  });
  const transfersOutQuery = useQuery(TRANSFERS_OUT_QUERY, {
    variables: { id, offset: callsPage * PAGE_SIZE, pageSize: PAGE_SIZE },
  });
  const transfersInQuery = useQuery(TRANSFERS_IN_QUERY, {
    variables: { id, offset: callsPage * PAGE_SIZE, pageSize: PAGE_SIZE },
  });

  useEffect(() => {
    callsQuery.startPolling(30 * 1000);
    transfersOutQuery.startPolling(30 * 1000);
    transfersInQuery.startPolling(30 * 1000);
    return () => {
      callsQuery.stopPolling();
      transfersOutQuery.stopPolling();
      transfersInQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (callsQuery.data && transfersOutQuery.data && transfersInQuery.data) {
        const balance = await getBalanceOf(id);
        const account = {
          ...callsQuery.data.account,
          ...transfersOutQuery.data.account,
          ...transfersInQuery.data.account,
          balance,
        };
        console.log("account:", account);
        setDetail(account);
      } else {
        setDetail(null);
      }
    })();
  }, [callsQuery, transfersOutQuery, transfersInQuery]);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Heading as="h6" size="sm">
          Account Detail
        </Heading>
        <SearchBox></SearchBox>
      </Flex>
      <Box mt={5} p={4} background="white" boxShadow="sm" borderRadius="lg">
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
                <Td>{detail.balance}</Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
      <Box mt={5} p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>Calls({detail?.calls?.totalCount || 0})</Tab>
            <Tab>
              Transfers Out(
              {detail?.systemTokenTransfersByFromId?.totalCount || 0})
            </Tab>
            <Tab>
              Transfers In(
              {detail?.systemTokenTransfersByToId?.totalCount || 0})
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
                      <Th>Method</Th>
                      <Th>Signer Id</Th>
                      <Th>Extrinsic Id</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.calls.nodes.map(
                      (
                        {
                          id,
                          section,
                          method,
                          signerId,
                          extrinsicId,
                          timestamp,
                        },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <Flex align="center">
                              <Text>{id.slice(0, 18)}...</Text>
                              <CopyButton value={id} />
                            </Flex>
                          </Td>
                          <Td>
                            <Tag size="sm" colorScheme="secondary">
                              {section}.{method}
                            </Tag>
                          </Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/accounts/${signerId}`}
                              color="primary.600"
                            >
                              {signerId.substr(0, 10)}...
                            </Link>
                          </Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/extrinsics/${extrinsicId}`}
                              color="primary.600"
                            >
                              {extrinsicId.substr(0, 10)}...
                            </Link>
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
                    disabled={callsPage <= 0}
                    onClick={() => setCallsPage(callsPage - 1)}
                  />
                  <Box>
                    {callsPage + 1} of{" "}
                    {detail
                      ? Math.ceil(detail?.calls.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      callsPage >=
                      Math.ceil(detail?.calls.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setCallsPage(callsPage + 1)}
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
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Amount</Th>
                      <Th>extrinsic</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.systemTokenTransfersByFromId.nodes.map(
                      (
                        { id, fromId, toId, amount, extrinsicId, timestamp },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/transfers/${id}`}
                              color="primary.600"
                            >
                              {id}
                            </Link>
                          </Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/accounts/${fromId}`}
                              color="primary.600"
                            >
                              {fromId.substr(0, 10)}...
                            </Link>
                          </Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/accounts/${toId}`}
                              color="primary.600"
                            >
                              {toId.substr(0, 10)}...
                            </Link>
                          </Td>
                          <Td>{getAmountHuman(amount)}</Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/extrinsics/${extrinsicId}`}
                              color="primary.600"
                            >
                              {extrinsicId.substr(0, 10)}...
                            </Link>
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
                    disabled={transfersOutPage <= 0}
                    onClick={() => setTransfersOutPage(transfersOutPage - 1)}
                  />
                  <Box>
                    {transfersOutPage + 1} of{" "}
                    {detail
                      ? Math.ceil(
                          detail?.systemTokenTransfersByFromId.totalCount /
                            PAGE_SIZE
                        )
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transfersOutPage >=
                      Math.ceil(
                        detail?.systemTokenTransfersByFromId.totalCount /
                          PAGE_SIZE
                      )
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setTransfersOutPage(transfersOutPage + 1)}
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
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Amount</Th>
                      <Th>extrinsic</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.systemTokenTransfersByToId.nodes.map(
                      (
                        { id, fromId, toId, amount, extrinsicId, timestamp },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/transfers/${id}`}
                              color="primary.600"
                            >
                              {id}
                            </Link>
                          </Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/accounts/${fromId}`}
                              color="primary.600"
                            >
                              {fromId.substr(0, 10)}...
                            </Link>
                          </Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/accounts/${toId}`}
                              color="primary.600"
                            >
                              {toId.substr(0, 10)}...
                            </Link>
                          </Td>
                          <Td>{getAmountHuman(amount)}</Td>
                          <Td>
                            <Link
                              as={RouterLink}
                              to={`/extrinsics/${extrinsicId}`}
                              color="primary.600"
                            >
                              {extrinsicId.substr(0, 10)}...
                            </Link>
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
                    disabled={transfersInPage <= 0}
                    onClick={() => setTransfersInPage(transfersInPage - 1)}
                  />
                  <Box>
                    {transfersInPage + 1} of{" "}
                    {detail
                      ? Math.ceil(
                          detail?.systemTokenTransfersByToId.totalCount /
                            PAGE_SIZE
                        )
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transfersInPage >=
                      Math.ceil(
                        detail?.systemTokenTransfersByToId.totalCount /
                          PAGE_SIZE
                      )
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setTransfersInPage(transfersInPage + 1)}
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

export default AccountDetail;

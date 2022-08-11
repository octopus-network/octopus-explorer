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
import {
  CALLS_QUERY,
  TRANSFERS_OUT_QUERY,
  TRANSFERS_IN_QUERY,
  PAGE_SIZE,
} from "./queries";

const AppchainData = ({ account }) => {
  const { id } = account;
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
      if (
        account &&
        callsQuery.data &&
        transfersOutQuery.data &&
        transfersInQuery.data
      ) {
        const accountDetail = {
          ...account,
          ...callsQuery.data.account,
          ...transfersOutQuery.data.account,
          ...transfersInQuery.data.account,
        };
        setDetail(accountDetail);
      } else {
        setDetail(null);
      }
    })();
  }, [callsQuery, transfersOutQuery, transfersInQuery]);

  return (
    <div>
      <Flex mt={5} align="center" justify="space-between" pt={3} pb={4}>
        <HStack>
          <MdApps />
          <Heading as="h6" size="xs">
            Appchain Data
          </Heading>
        </HStack>
      </Flex>
      <Box p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>Calls({detail?.calls?.totalCount || 0})</Tab>
            <Tab>
              Transfers Out(
              {detail?.transferOut?.totalCount || 0})
            </Tab>
            <Tab>
              Transfers In(
              {detail?.transferIn?.totalCount || 0})
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
                            <StyledLink to={`/accounts/${signerId}`}>
                              {signerId.substr(0, 10)}...
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/extrinsics/${extrinsicId}`}>
                              {extrinsicId.substr(0, 10)}...
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
                    {detail.transferOut.nodes.map(
                      (
                        { id, fromId, toId, amount, extrinsicId, timestamp },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <StyledLink to={`/transfers/${id}`}>
                              {id}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${fromId}`}>
                              {briefHex(fromId, 10)}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${toId}`}>
                              {briefHex(toId, 10)}
                            </StyledLink>
                          </Td>
                          <Td>{getAmountHuman(amount)}</Td>
                          <Td>
                            <StyledLink to={`/extrinsics/${extrinsicId}`}>
                              {extrinsicId.substr(0, 10)}...
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
                    disabled={transfersOutPage <= 0}
                    onClick={() => setTransfersOutPage(transfersOutPage - 1)}
                  />
                  <Box>
                    {transfersOutPage + 1} of{" "}
                    {detail
                      ? Math.ceil(detail?.transferOut.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transfersOutPage >=
                      Math.ceil(detail?.transferOut.totalCount / PAGE_SIZE)
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
                    {detail.transferIn.nodes.map(
                      (
                        { id, fromId, toId, amount, extrinsicId, timestamp },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <StyledLink to={`/transfers/${id}`}>
                              {id}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${fromId}`}>
                              {briefHex(fromId, 10)}
                            </StyledLink>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${toId}`}>
                              {briefHex(toId, 10)}
                            </StyledLink>
                          </Td>
                          <Td>{getAmountHuman(amount)}</Td>
                          <Td>
                            <StyledLink to={`/extrinsics/${extrinsicId}`}>
                              {extrinsicId.substr(0, 10)}...
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
                    disabled={transfersInPage <= 0}
                    onClick={() => setTransfersInPage(transfersInPage - 1)}
                  />
                  <Box>
                    {transfersInPage + 1} of{" "}
                    {detail
                      ? Math.ceil(detail?.transferIn.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transfersInPage >=
                      Math.ceil(detail?.transferIn.totalCount / PAGE_SIZE)
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

export default AppchainData;

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
import { TimeIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getAmountHuman } from "../../../libs/polkadotApi";
import CopyButton from "../../../components/CopyButton";
import SearchBox from "../../../components/SearchBox";
import StyledLink from "components/StyledLink";
import { briefHex } from "libs/utils";

const TRANSACTION_DETAIL_QUERY = gql`
  query transactionDetail($id: String!) {
    transaction(id: $id) {
      id
      fromId
      to {
        id
        isContract
      }
      isSuccess
      value
      nonce
      gasLimit
      maxFeePerGas
      maxPriorityFeePerGas
      gasUsed
      inputData
      exitReason
      timestamp
      block {
        number
      }
      logs {
        nodes {
          id
          logIndex
          transactionId
          data
          topics
        }
        totalCount
      }
    }
  }
`;

const TransactionDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>();

  const transactionQuery = useQuery(TRANSACTION_DETAIL_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    transactionQuery.startPolling(20 * 1000);
    return () => {
      transactionQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (transactionQuery.data) {
      setDetail(transactionQuery.data.transaction);
    } else {
      setDetail(null);
    }
  }, [transactionQuery]);
  return (
    <div>
      <Flex justify="space-between" align="center">
        <Heading as="h6" size="sm">
          Transaction Detail
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
                    Hash
                  </Heading>
                </Td>
                <Td>
                  {id} <CopyButton value={detail.id} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Block
                  </Heading>
                </Td>
                <Td>
                  <StyledLink to={`/blocks/${detail.block.number}`}>
                    <Heading as="h6" size="sm">
                      #{detail.block.number}
                    </Heading>
                  </StyledLink>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    From
                  </Heading>
                </Td>
                <Td>
                  <StyledLink to={`/accounts/${detail.fromId}`}>
                    {detail.fromId}
                  </StyledLink>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    To
                  </Heading>
                </Td>
                <Td>
                  <StyledLink to={`/accounts/${detail.to.id}`}>
                    {detail.to.id}
                  </StyledLink>
                  <Tag
                    size="sm"
                    colorScheme={detail.to.isContract ? "primary" : "secondary"}
                    ml={2}
                  >
                    {detail.to.isContract ? "Contract" : "User"}
                  </Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Value
                  </Heading>
                </Td>
                <Td>{getAmountHuman(detail.value, 4)}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Status
                  </Heading>
                </Td>
                <Td>
                  <Tag
                    size="sm"
                    colorScheme={detail.isSuccess ? "green" : "red"}
                    mr={2}
                  >
                    {detail.isSuccess ? "Success" : "Fail"}
                  </Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Nonce
                  </Heading>
                </Td>
                <Td>{detail.nonce}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    gasLimit
                  </Heading>
                </Td>
                <Td>{detail.gasLimit}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    maxPriorityFeePerGas
                  </Heading>
                </Td>
                <Td>{detail.maxPriorityFeePerGas}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    maxFeePerGas
                  </Heading>
                </Td>
                <Td>{detail.maxFeePerGas}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    gasUsed
                  </Heading>
                </Td>
                <Td>{getAmountHuman(detail.gasUsed, 18)}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Input Data
                  </Heading>
                </Td>
                <Td>
                  <Box p={4} background="blackAlpha.50">
                    <Box p={2} background="white">
                      <Text wordBreak="break-all">
                        {detail.inputData.length > 500
                          ? detail.inputData.slice(0, 500) + "..."
                          : detail.inputData}
                      </Text>
                      <Flex justify="end" width="100%">
                        <Tag size="sm" colorScheme={"gray"} ml={2}>
                          Length: {detail.inputData.length}
                        </Tag>
                        <CopyButton value={detail.inputData} />
                      </Flex>
                    </Box>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Exit Reason
                  </Heading>
                </Td>
                <Td>
                  <Box p={4} background="blackAlpha.50">
                    <Box p={2} background="white">
                      <Text wordBreak="break-all">{detail.exitReason}</Text>
                    </Box>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Block time
                  </Heading>
                </Td>
                <Td>
                  <HStack spacing={2} mt={1}>
                    <Icon as={TimeIcon} ml={3} boxSize={3} color="yellow.600" />
                    <Text color="grey" fontSize="sm">
                      {dayjs(detail.timestamp).add(8, "hours").toNow(true)}(
                      {detail.timestamp})
                    </Text>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>

      <Box p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>
              EvmLog(
              {detail?.logs?.totalCount || 0})
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
                      <Th>Index</Th>
                      <Th>Transaction</Th>
                      <Th>Data</Th>
                      <Th>Topics</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.logs.nodes.map(
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default TransactionDetail;

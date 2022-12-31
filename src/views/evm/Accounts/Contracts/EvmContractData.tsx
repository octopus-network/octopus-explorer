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
import { getNativeAmountHuman } from "../../../../libs/appchainUtils";
import CopyButton from "../../../../components/CopyButton";
import SearchBox from "../../../../components/SearchBox";
import StyledLink from "components/StyledLink";
import { MdApps } from "react-icons/md";
import { briefHex } from "libs/utils";
import { PAGE_SIZE, EVM_LOGS_QUERY } from "../queries";
import Erc20Txs from "./Erc20Txs";
import Erc721Tokens from "./Erc721Tokens";
import Erc721Txs from "./Erc721Txs";
import Erc1155Tokens from "./Erc1155Tokens";
import Erc1155Txs from "./Erc1155Txs";

const EvmContractData = ({ account }) => {
  const { id, erc20TokenContract, erc721TokenContract, erc1155TokenContract } =
    account;
  const [detail, setDetail] = useState<any>();
  const [evmLogsPage, setEvmLogsPage] = useState(0);

  const evmLogsQuery = useQuery(EVM_LOGS_QUERY, {
    variables: {
      contractId: id,
      offset: evmLogsPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  useEffect(() => {
    evmLogsQuery.startPolling(30 * 1000);
    return () => {
      evmLogsQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (account && evmLogsQuery.data) {
      const accountDetail = {
        ...account,
        ...evmLogsQuery.data,
      };
      setDetail(accountDetail);
    } else {
      setDetail(null);
    }
  }, [evmLogsQuery]);

  return (
    <div>
      <Flex mt={5} align="center" justify="space-between" pt={3} pb={4}>
        <HStack>
          <MdApps />
          <Heading as="h6" size="xs">
            Contract Data
          </Heading>
        </HStack>
      </Flex>
      <Box p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            {erc20TokenContract && (
              <Tab>
                Erc20 Token Txns(
                {detail?.erc20Transfers?.totalCount || 0})
              </Tab>
            )}
            {erc721TokenContract && (
              <>
                <Tab>
                  Erc721 Tokens(
                  {erc721TokenContract?.tokens?.totalCount || 0})
                </Tab>
                <Tab>
                  Erc721 Token Txns(
                  {erc721TokenContract?.erc721Transfers?.totalCount || 0})
                </Tab>
              </>
            )}
            {erc1155TokenContract && (
              <>
                <Tab>
                  Erc1155 Tokens(
                  {erc1155TokenContract?.tokens?.totalCount || 0})
                </Tab>
                <Tab>
                  Erc1155 Token Txns(
                  {erc1155TokenContract?.erc1155Transfers?.totalCount || 0})
                </Tab>
              </>
            )}
            <Tab>
              EvmLog(
              {detail?.evmLogs?.totalCount || 0})
            </Tab>
          </TabList>
          <TabPanels>
            {erc20TokenContract ? (
              <TabPanel>
                <Erc20Txs account={account} />
              </TabPanel>
            ) : null}
            {erc721TokenContract && (
              <TabPanel>
                <Erc721Tokens account={account} />
              </TabPanel>
            )}
            {erc721TokenContract && (
              <TabPanel>
                <Erc721Txs account={account} />
              </TabPanel>
            )}
            {erc1155TokenContract && (
              <TabPanel>
                <Erc1155Tokens account={account} />
              </TabPanel>
            )}
            {erc1155TokenContract && (
              <TabPanel>
                <Erc1155Txs account={account} />
              </TabPanel>
            )}
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
                            <Box p={4} background="blackAlpha.50">
                              <Text wordBreak="break-all">
                                {topics.length > 0 && JSON.stringify(topics)}
                              </Text>
                            </Box>
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

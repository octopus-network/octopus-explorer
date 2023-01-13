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
import { PAGE_SIZE, CONTRACT_ERC1155_TRANSACTIONS_QUERY } from "../queries";
import AccountTag from "components/AccountTag";

const Erc1155Txs = ({ account }) => {
  const { id } = account;
  const [detail, setDetail] = useState<any>();
  const [erc1155TransfersPage, setErc1155TransfersPage] = useState(0);

  const contracterc1155TransfersQuery = useQuery(
    CONTRACT_ERC1155_TRANSACTIONS_QUERY,
    {
      variables: {
        contractId: id,
        offset: erc1155TransfersPage * PAGE_SIZE,
        pageSize: PAGE_SIZE,
      },
    }
  );

  useEffect(() => {
    contracterc1155TransfersQuery.startPolling(30 * 1000);
    return () => {
      contracterc1155TransfersQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (account && contracterc1155TransfersQuery.data) {
      const accountDetail = {
        ...account,
        ...contracterc1155TransfersQuery.data,
      };
      setDetail(accountDetail);
    } else {
      setDetail(null);
    }
  }, [contracterc1155TransfersQuery]);

  return (
    <div>
      {!detail ? (
        <Box p={10} display="flex" alignItems="center" justifyContent="center">
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
            {detail.erc1155Transfers.nodes.map(
              ({ id, transactionId, from, to, token, timestamp }, idx) => (
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
                      colorScheme={from.id === account.id ? "green" : "orange"}
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
                    <StyledLink to={`/erc1155_tokens/${token.id}`}>
                      {token.idInContract}
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
            onClick={() => setErc1155TransfersPage(erc1155TransfersPage - 1)}
          />
          <Box>
            {erc1155TransfersPage + 1} of{" "}
            {detail
              ? Math.ceil(detail?.erc1155Transfers.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              erc1155TransfersPage + 1 >=
              Math.ceil(detail?.erc1155Transfers.totalCount / PAGE_SIZE)
            }
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setErc1155TransfersPage(erc1155TransfersPage + 1)}
          />
        </HStack>
      </Flex>
    </div>
  );
};

export default Erc1155Txs;

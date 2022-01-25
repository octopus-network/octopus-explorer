import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Box,
  Text,
  Link,
  Icon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Spinner,
  HStack,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useQuery, gql } from "@apollo/client";
import {
  ChevronDownIcon,
  TimeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import SearchBox from "../../components/SearchBox";
import { getBalanceOf } from "libs/polkadotApi";
import CopyButton from "../../components/CopyButton";

const ACCOUNT_QUERY = gql`
  query QueryAccounts($offset: Int!, $pageSize: Int!) {
    accounts(offset: $offset, first: $pageSize, orderBy: ID_ASC) {
      nodes {
        id
        calls {
          totalCount
        }
        systemTokenTransfersByFromId {
          totalCount
        }
        systemTokenTransfersByToId {
          totalCount
        }
      }
      totalCount
    }
  }
`;

const PAGE_SIZE = 20;

const Accounts = () => {
  const [page, setPage] = useState(0);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isOnTable, setIsOnTable] = useState(false);

  const { loading, data, stopPolling, startPolling } = useQuery(ACCOUNT_QUERY, {
    variables: {
      offset: page * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  useEffect(() => {
    startPolling(15 * 1000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  useEffect(() => {
    (async () => {
      if (data) {
        const accounts = await Promise.all(
          data.accounts.nodes.map(async (account) => {
            const balance = await getBalanceOf(account.id);
            return { ...account, balance };
          })
        );
        setAccounts(accounts);
      }
    })();
  }, [data]);

  return (
    <div>
      <SearchBox></SearchBox>
      <Box p={5} background="white" mt={5} boxShadow="sm" borderRadius="lg">
        {loading ? (
          <Box
            p={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Box>
        ) : (
          <Table
            variant="simple"
            onMouseEnter={() => setIsOnTable(true)}
            onMouseLeave={() => setIsOnTable(false)}
          >
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Balance</Th>
                <Th>Transfers</Th>
                <Th>Calls</Th>
              </Tr>
            </Thead>
            <Tbody>
              {accounts.map(
                ({
                  id,
                  balance,
                  calls,
                  systemTokenTransfersByFromId,
                  systemTokenTransfersByToId,
                }) => (
                  <Tr key={`account-${id}`}>
                    <Td>
                      <Flex align="center">
                        <Link
                          as={RouterLink}
                          to={`/accounts/${id}`}
                          color="primary.600"
                        >
                          <Heading size="sm" as="h6">
                            {id.slice(0, 18)}...
                          </Heading>
                        </Link>
                        <CopyButton value={id} />
                      </Flex>
                    </Td>
                    <Td>{balance}</Td>
                    <Td>
                      {systemTokenTransfersByFromId.totalCount +
                        systemTokenTransfersByToId.totalCount}
                    </Td>
                    <Td>{calls.totalCount}</Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        )}
      </Box>
      <Flex align="center" justify="space-between" mt={4}>
        <div style={{ flexGrow: 1 }} />
        <HStack>
          <IconButton
            aria-label="left"
            icon={<ChevronLeftIcon />}
            disabled={page <= 0}
            onClick={() => setPage(page - 1)}
          />
          <Box>
            {page + 1} of{" "}
            {data ? Math.ceil(data?.accounts.totalCount / PAGE_SIZE) : 1}
          </Box>
          <IconButton
            disabled={page >= Math.ceil(data?.accounts.totalCount / PAGE_SIZE)}
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setPage(page + 1)}
          />
        </HStack>
      </Flex>
    </div>
  );
};

export default Accounts;

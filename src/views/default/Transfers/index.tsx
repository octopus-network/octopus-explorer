import {
  Flex,
  Box,
  Text,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useQuery, gql } from "@apollo/client";
import { TimeIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import SearchBox from "../../../components/SearchBox";
import { getNativeAmountHuman } from "libs/appchainUtils";
import StyledLink from "components/StyledLink";

const ACCOUNT_QUERY = gql`
  query QueryAccounts($offset: Int!, $pageSize: Int!) {
    systemTokenTransfers(
      offset: $offset
      first: $pageSize
      orderBy: TIMESTAMP_DESC
    ) {
      nodes {
        id
        fromId
        toId
        amount
        timestamp
        extrinsicId
      }
      totalCount
    }
  }
`;

const PAGE_SIZE = 20;

const Transfers = () => {
  const [page, setPage] = useState(0);
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

  return (
    <div>
      <SearchBox></SearchBox>
      <Box
        p={5}
        background="white"
        mt={5}
        boxShadow="sm"
        borderRadius="lg"
        style={{ overflowX: "scroll" }}
      >
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
                <Th>From</Th>
                <Th>To</Th>
                <Th>Amount</Th>
                <Th>Extrinsic</Th>
                <Th>Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.systemTokenTransfers.nodes.map(
                ({ id, fromId, toId, amount, extrinsicId, timestamp }) => (
                  <Tr key={`transfer-${id}`}>
                    <Td>
                      <StyledLink to={`/transfers/${id}`}>{id}</StyledLink>
                    </Td>
                    <Td>
                      <StyledLink to={`/accounts/${fromId}`}>
                        {fromId.substr(0, 10)}...
                      </StyledLink>
                    </Td>
                    <Td>
                      <StyledLink to={`/accounts/${toId}`}>
                        {toId.substr(0, 10)}...
                      </StyledLink>
                    </Td>
                    <Td>{getNativeAmountHuman(amount)}</Td>
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
            {data
              ? Math.ceil(data?.systemTokenTransfers.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              page >=
              Math.ceil(data?.systemTokenTransfers.totalCount / PAGE_SIZE)
            }
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setPage(page + 1)}
          />
        </HStack>
      </Flex>
    </div>
  );
};

export default Transfers;

import {
  Flex,
  Box,
  Text,
  Link,
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
  Heading,
  Tag,
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

const EXTRINSICS_QUERY = gql`
  query QueryExtrinsics($offset: Int!, $pageSize: Int!) {
    extrinsics(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        section
        method
        timestamp
        events {
          totalCount
        }
        block {
          number
        }
      }
      totalCount
    }
  }
`;

const PAGE_SIZE = 20;

const Extrinsics = () => {
  const [page, setPage] = useState(0);
  const [isOnTable, setIsOnTable] = useState(false);

  const { loading, data, stopPolling, startPolling } = useQuery(
    EXTRINSICS_QUERY,
    {
      variables: {
        offset: page * PAGE_SIZE,
        pageSize: PAGE_SIZE,
      },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  console.log(data);

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
                <Th>Hash</Th>
                <Th>Timestamp</Th>
                <Th>Section</Th>
                <Th>Method</Th>
                <Th>Block</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.extrinsics.nodes.map(
                ({ id, timestamp, events, section, method, block }) => (
                  <Tr key={`extrinsic-${id}`}>
                    <Td>
                      <Link
                        as={RouterLink}
                        to={`/extrinsics/${id}`}
                        color="primary.600"
                      >
                        {id.substr(32)}...
                      </Link>
                    </Td>
                    <Td>
                      <HStack spacing={2} mt={1}>
                        <Icon
                          as={TimeIcon}
                          ml={3}
                          boxSize={4}
                          color="yellow.600"
                        />
                        <Text color="grey" fontSize="md">
                          {dayjs(timestamp).add(8, "hours").toNow(true)}
                        </Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Tag size="sm" colorScheme="secondary">
                        {section}
                      </Tag>
                    </Td>
                    <Td>
                      <Tag size="sm" colorScheme="secondary" variant="outline">
                        {method}
                      </Tag>
                    </Td>
                    <Td>
                      <Link
                        as={RouterLink}
                        to={`/blocks/${block.number}`}
                        color="primary.600"
                      >
                        <Heading as="h6" size="sm">
                          #{block.number}
                        </Heading>
                      </Link>
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
            {data ? Math.ceil(data?.extrinsics.totalCount / PAGE_SIZE) : 1}
          </Box>
          <IconButton
            disabled={
              page >= Math.ceil(data?.extrinsics.totalCount / PAGE_SIZE)
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

export default Extrinsics;

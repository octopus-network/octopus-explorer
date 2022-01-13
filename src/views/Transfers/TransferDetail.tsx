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
  useClipboard,
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
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TimeIcon,
  CheckIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { getAmountHuman } from "../../libs/polkadotApi";
import CopyButton from "../../components/CopyButton";
import SearchBox from "../../components/SearchBox";

const BLOCK_DETAIL_QUERY_BY_HASH = gql`
  query TransferDetail($id: String!) {
    systemTokenTransfer(id: $id) {
      id
      fromId
      toId
      amount
      timestamp
      extrinsicId
      extrinsic {
        block {
          id
          number
        }
      }
    }
  }
`;

const TransferDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [secondsPast, setSecondsPast] = useState(0);
  const navigate = useNavigate();

  const { loading, data, startPolling, stopPolling } = useQuery(
    BLOCK_DETAIL_QUERY_BY_HASH,
    { variables: { id } }
  );

  useEffect(() => {
    startPolling(20 * 1000);
    return () => stopPolling();
  }, []);

  useEffect(() => {
    if (data) {
      setDetail(data.systemTokenTransfer);
    } else {
      setDetail(null);
    }
  }, [data]);

  useEffect(() => {
    if (detail) {
      let diffSeconds = dayjs(detail.timestamp)
        .add(8, "hours")
        .diff(dayjs(), "seconds");
      setSecondsPast(diffSeconds);
      setIsConfirmed(diffSeconds < -12);
    }
  }, [detail]);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Heading as="h6" size="sm">
          Transfer Detail
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
                <Td>{id}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Timestamp
                  </Heading>
                </Td>
                <Td>{detail.timestamp}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Status
                  </Heading>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <CircularProgress
                      color="green.400"
                      size="28px"
                      value={Math.abs((secondsPast * 100) / 12)}
                    >
                      {isConfirmed && (
                        <CircularProgressLabel>
                          <Icon as={CheckIcon} boxSize={3} color="green.400" />
                        </CircularProgressLabel>
                      )}
                    </CircularProgress>
                    <Text>{isConfirmed ? "Confirmed" : "Pending"}</Text>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    From
                  </Heading>
                </Td>
                <Td>
                  <Flex align="center">
                    <Link
                      as={RouterLink}
                      to={`/accounts/${detail.fromId}`}
                      color="blue.600"
                    >
                      {detail.fromId}
                    </Link>
                    <CopyButton value={detail.fromId} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    To
                  </Heading>
                </Td>
                <Td>
                  <Flex align="center">
                    <Link
                      as={RouterLink}
                      to={`/accounts/${detail.toId}`}
                      color="blue.600"
                    >
                      {detail.toId}
                    </Link>
                    <CopyButton value={detail.toId} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Amount
                  </Heading>
                </Td>
                <Td>{getAmountHuman(detail.amount)}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Block Hash
                  </Heading>
                </Td>
                <Td>
                  <Flex align="center">
                    <Link
                      as={RouterLink}
                      to={`/blocks/${detail.extrinsic.block.id}`}
                      color="blue.600"
                    >
                      {detail.extrinsic.block.id}
                    </Link>
                    <CopyButton value={detail.extrinsic.block.id} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Block Number
                  </Heading>
                </Td>
                <Td>{detail.extrinsic.block.number}</Td>
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
                      {dayjs(detail.timestamp).add(8, "hours").toNow(true)}
                    </Text>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
    </div>
  );
};

export default TransferDetail;
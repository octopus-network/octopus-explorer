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
import { useQuery, gql } from "@apollo/client";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import SearchBox from "../../components/SearchBox";

const EXTRINSIC_DETAIL_QUERY = gql`
  query ExtrinsicDetail($id: String!) {
    extrinsic(id: $id) {
      id
      timestamp
      signature
      signer {
        id
      }
      nonce
      block {
        number
      }
      section
      method
      events {
        nodes {
          section
          method
          data
        }
      }
    }
  }
`;

const ExtrinsicDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>();

  const { loading, data, startPolling, stopPolling } = useQuery(
    EXTRINSIC_DETAIL_QUERY,
    { variables: { id } }
  );

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  }, []);

  useEffect(() => {
    if (data) {
      setDetail(data.extrinsic);
    } else {
      setDetail(null);
    }
  }, [data]);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Heading as="h6" size="sm">
          Extrinsic Detail
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
                    Timestamp
                  </Heading>
                </Td>
                <Td>
                  {dayjs(detail?.timestamp)
                    .add(8, "hours")
                    .format("YYYY-MM-DD HH:mm:ss")}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Block
                  </Heading>
                </Td>
                <Td>
                  <Link
                    as={RouterLink}
                    to={`/blocks/${detail.block.number}`}
                    color="primary.600"
                  >
                    <Heading as="h6" size="sm">
                      #{detail.block.number}
                    </Heading>
                  </Link>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Hash
                  </Heading>
                </Td>
                <Td>{detail.id}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Section
                  </Heading>
                </Td>
                <Td>
                  <Tag size="sm" colorScheme="secondary">
                    {detail.section}
                  </Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Method
                  </Heading>
                </Td>
                <Td>
                  <Tag size="sm" variant="outline" colorScheme="secondary">
                    {detail.method}
                  </Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Signer
                  </Heading>
                </Td>
                <Td>
                  <Link
                    as={RouterLink}
                    to={`/accounts/${detail.signer.id}`}
                    color="primary.600"
                  >
                    <Text>{detail.signer.id}</Text>
                  </Link>
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
                    Signature
                  </Heading>
                </Td>
                <Td>
                  <Box p={4} background="blackAlpha.50">
                    <Box p={2} background="white">
                      <Text wordBreak="break-all">{detail.signature}</Text>
                    </Box>
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
      <Box mt={5} p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>Logs</Tab>
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
                      <Th></Th>
                      <Th>Method</Th>
                      <Th>Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.events.nodes.map(
                      ({ section, method, data }, idx) => (
                        <Tr key={`extrinsic-${id}`}>
                          <Td>{idx}</Td>
                          <Td>
                            <Tag size="sm" colorScheme="secondary">
                              {section}.{method}
                            </Tag>
                          </Td>
                          <Td>{data}</Td>
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

export default ExtrinsicDetail;

import {
  Flex,
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
import { getAmountHuman } from "../../../libs/polkadotApi";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import SearchBox from "../../../components/SearchBox";
import StyledLink from "components/StyledLink";

const EXTRINSIC_DETAIL_QUERY = gql`
  query ExtrinsicDetail($id: String!) {
    extrinsic(id: $id) {
      id
      hash
      timestamp
      signature
      signer {
        id
      }
      nonce
      block {
        id
        number
      }
      section
      method
      events {
        nodes {
          index
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
    startPolling(6000);
    return () => stopPolling();
  }, []);

  useEffect(() => {
    (async () => {
      if (data) {
        const events = data.extrinsic.events.nodes.map((e) => ({
          ...e,
          data: JSON.parse(e.data),
        }));
        const aa = events.filter(
          (event) =>
            event.section.toString() === "balances" &&
            event.method.toString() === "Transfer"
        );
        console.log("aa", aa);
        const transfers = events
          .filter(
            (event) =>
              event.section.toString() === "balances" &&
              event.method.toString() === "Transfer"
          )
          .map(({ data }) => {
            return Array.isArray(data)
              ? {
                  from: data[0].toString(),
                  to: data[1].toString(),
                  amount: data[2],
                }
              : data;
          });
        setDetail({ ...data.extrinsic, transfers, events });
      } else {
        setDetail(null);
      }
    })();
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
                    ID
                  </Heading>
                </Td>
                <Td>{detail.id}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Hash
                  </Heading>
                </Td>
                <Td>{detail.hash}</Td>
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
                  <StyledLink to={`/accounts/${detail.signer.id}`}>
                    <Text>{detail.signer.id}</Text>
                  </StyledLink>
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
            <Tab>Transfers</Tab>
            <Tab>Events</Tab>
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
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.transfers.map(({ from, to, amount }, idx) => (
                      <Tr key={`transfers-${idx}`}>
                        <Td>
                          <StyledLink to={`/accounts/${from}`}>
                            {from.substr(0, 10)}...
                          </StyledLink>
                        </Td>
                        <Td>
                          <StyledLink to={`/accounts/${to}`}>
                            {to.substr(0, 10)}...
                          </StyledLink>
                        </Td>
                        <Td>{getAmountHuman(amount)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
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
                      <Th>Index</Th>
                      <Th>Method</Th>
                      <Th>Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.events.map(({ index, section, method, data }) => (
                      <Tr key={`events-${index}`}>
                        <Td>{index}</Td>
                        <Td>
                          <Tag size="sm" colorScheme="secondary">
                            {section}.{method}
                          </Tag>
                        </Td>
                        <Td maxWidth="400px">
                          {Array.isArray(data) ? (
                            data.map((d, idx) => (
                              <div key={`${index}-data-${idx}`}>
                                {d && typeof d === "object"
                                  ? JSON.stringify(d)
                                  : d.toString()}
                              </div>
                            ))
                          ) : (
                            <div>
                              {typeof data === "object"
                                ? JSON.stringify(data)
                                : data.toString()}
                            </div>
                          )}
                        </Td>
                      </Tr>
                    ))}
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

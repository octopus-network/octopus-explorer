import {
  IconButton,
  Flex,
  HStack,
  Icon,
  Heading,
  Box,
  Tab,
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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@chakra-ui/icons'
import { useQuery, gql } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import CopyButton from '../../../components/CopyButton'
import StyledLink from 'components/StyledLink'

const BLOCK_DETAIL_QUERY_BY_NUMBER = gql`
  query BlockDetail($number: BigFloat!) {
    blocks(filter: { number: { equalTo: $number } }) {
      nodes {
        id
        number
        parentHash
        specVersion
        timestamp
        extrinsics {
          nodes {
            section
            method
            id
            args
            timestamp
          }
        }
        events {
          nodes {
            method
            data
          }
        }
      }
    }
  }
`

const BLOCK_DETAIL_QUERY_BY_HASH = gql`
  query BlockDetail($id: String!) {
    block(id: $id) {
      id
      number
      parentHash
      specVersion
      timestamp
      extrinsics {
        nodes {
          section
          id
          method
          args
          timestamp
        }
      }
      events {
        nodes {
          section
          method
          data
        }
      }
    }
  }
`

const BlockDetail = () => {
  const { id, appchain } = useParams()
  const [detail, setDetail] = useState<any>()
  const [blockNumber, setBlockNumber] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [secondsPast, setSecondsPast] = useState(0)
  const [isBN, setIsBN] = useState(false)
  const navigate = useNavigate()

  const { loading, data, startPolling, stopPolling } = useQuery(
    isBN ? BLOCK_DETAIL_QUERY_BY_NUMBER : BLOCK_DETAIL_QUERY_BY_HASH,
    { variables: isBN ? { number: id } : { id } }
  )

  useEffect(() => {
    startPolling(6000)

    return () => stopPolling()
  }, [])

  useEffect(() => {
    if (!/0x/.test(id) && /^\d+$/.test(id)) {
      setBlockNumber(id)
      setIsBN(true)
    } else {
      setIsBN(false)
      setBlockNumber('')
    }
  }, [id])

  useEffect(() => {
    if (data) {
      if (isBN) {
        setDetail(data.blocks.nodes[0])
      } else if (data.block) {
        setDetail(data.block)
        setBlockNumber(data.block.number)
      }
    } else {
      setDetail(null)
    }
  }, [data, isBN])

  useEffect(() => {
    if (detail) {
      let diffSeconds = dayjs(detail.timestamp)
        .add(8, 'hours')
        .diff(dayjs(), 'seconds')
      setSecondsPast(diffSeconds)
      setIsConfirmed(diffSeconds < -12)
    }
  }, [detail])

  const onPrevBlock = () => {
    navigate(`/${appchain}/blocks/${parseInt(blockNumber) - 1}`)
  }

  const onNextBlock = () => {
    navigate(`/${appchain}/blocks/${parseInt(blockNumber) + 1}`)
  }

  return (
    <div>
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <IconButton
            aria-label="prev"
            onClick={onPrevBlock}
            borderRadius="md"
            icon={<Icon as={ChevronLeftIcon} boxSize={6} />}
            disabled={loading || !blockNumber || parseInt(blockNumber) <= 1}
          />
          <Heading as="h6" size="sm">
            Block #{blockNumber}
          </Heading>
          <IconButton
            aria-label="next"
            onClick={onNextBlock}
            borderRadius="md"
            icon={<Icon as={ChevronRightIcon} boxSize={6} />}
            disabled={!blockNumber || loading}
          />
        </HStack>
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
                    .add(8, 'hours')
                    .format('YYYY-MM-DD HH:mm:ss')}
                </Td>
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
                    <Text>{isConfirmed ? 'Confirmed' : 'Pending'}</Text>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Hash
                  </Heading>
                </Td>
                <Td>
                  <Flex align="center">
                    <Text>{detail.id}</Text>
                    <CopyButton value={detail.id} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Parent hash
                  </Heading>
                </Td>
                <Td>
                  <StyledLink to={`/blocks/${detail.parentHash}`}>
                    {detail.parentHash}
                  </StyledLink>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Spec version
                  </Heading>
                </Td>
                <Td>{detail.specVersion}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Block time
                  </Heading>
                </Td>
                <Td>
                  <HStack spacing={2} mt={1}>
                    <Text color="grey" fontSize="sm">
                      {dayjs(detail.timestamp).add(8, 'hours').toNow(true)}
                    </Text>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
      <Box mt={5} p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>Extrinsics</Tab>
            <Tab>Logs({data?.events?.totalCount || 0})</Tab>
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
                      <Th>Hash</Th>
                      <Th>Method</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.extrinsics.nodes.map(
                      ({ id, timestamp, section, method }, idx) => (
                        <Tr key={`extrinsic-${id}`}>
                          <Td>{idx}</Td>
                          <Td>
                            <StyledLink to={`/extrinsics/${id}`}>
                              {id.substr(0, 32)}...
                            </StyledLink>
                          </Td>
                          <Td>
                            <Tag size="sm" colorScheme="secondary">
                              {section}.{method}
                            </Tag>
                          </Td>
                          <Td>
                            <HStack spacing={2} mt={1}>
                              <Text color="grey" fontSize="sm">
                                {dayjs(timestamp).add(8, 'hours').toNow(true)}
                              </Text>
                            </HStack>
                          </Td>
                        </Tr>
                      )
                    )}
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
  )
}

export default BlockDetail

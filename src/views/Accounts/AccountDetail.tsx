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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from '@chakra-ui/icons'
import { getBalanceOf } from '../../libs/polkadotApi'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { getAmountHuman } from '../../libs/polkadotApi'
import CopyButton from '../../components/CopyButton'
import SearchBox from '../../components/SearchBox'
import StyledLink from 'components/StyledLink'

const CALLS_QUERY = gql`
  query AccountCalls($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      calls(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          section
          method
          args
          timestamp
          isSuccess
          signerId
          extrinsicId
          parentCallId
        }
        totalCount
      }
    }
  }
`

const TRANSFERS_OUT_QUERY = gql`
  query AccountTransfersOut($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      transferOut(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`

const TRANSFERS_IN_QUERY = gql`
  query AccountTransfersIn($id: String!, $offset: Int!, $pageSize: Int!) {
    account(id: $id) {
      transferIn(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
        nodes {
          id
          fromId
          toId
          amount
          extrinsicId
          timestamp
        }
        totalCount
      }
    }
  }
`

const PAGE_SIZE = 20

const AccountDetail = () => {
  const { id } = useParams()
  const [detail, setDetail] = useState<any>()
  const [callsPage, setCallsPage] = useState(0)
  const [transfersOutPage, setTransfersOutPage] = useState(0)
  const [transfersInPage, setTransfersInPage] = useState(0)

  const callsQuery = useQuery(CALLS_QUERY, {
    variables: { id, offset: callsPage * PAGE_SIZE, pageSize: PAGE_SIZE },
  })
  const transfersOutQuery = useQuery(TRANSFERS_OUT_QUERY, {
    variables: { id, offset: callsPage * PAGE_SIZE, pageSize: PAGE_SIZE },
  })
  const transfersInQuery = useQuery(TRANSFERS_IN_QUERY, {
    variables: { id, offset: callsPage * PAGE_SIZE, pageSize: PAGE_SIZE },
  })

  useEffect(() => {
    callsQuery.startPolling(30 * 1000)
    transfersOutQuery.startPolling(30 * 1000)
    transfersInQuery.startPolling(30 * 1000)
    return () => {
      callsQuery.stopPolling()
      transfersOutQuery.stopPolling()
      transfersInQuery.stopPolling()
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (callsQuery.data && transfersOutQuery.data && transfersInQuery.data) {
        const balance = await getBalanceOf(id)
        const account = {
          ...callsQuery.data.account,
          ...transfersOutQuery.data.account,
          ...transfersInQuery.data.account,
          balance,
        }
        console.log('account:', account)
        setDetail(account)
      } else {
        setDetail(null)
      }
    })()
  }, [callsQuery, transfersOutQuery, transfersInQuery])

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Heading as="h6" size="sm">
          Account Detail
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
                <Td>
                  <Flex align="center">
                    <Text>{id}</Text>
                    <CopyButton value={id} />
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h6" size="xs">
                    Balance
                  </Heading>
                </Td>
                <Td>{detail.balance}</Td>
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
      <Box mt={5} p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>Calls({detail?.calls?.totalCount || 0})</Tab>
            <Tab>
              Transfers Out(
              {detail?.transferOut?.totalCount || 0})
            </Tab>
            <Tab>
              Transfers In(
              {detail?.transferIn?.totalCount || 0})
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
                      <Th>Method</Th>
                      <Th>Signer Id</Th>
                      <Th>Extrinsic Id</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.calls.nodes.map(
                      (
                        {
                          id,
                          section,
                          method,
                          signerId,
                          extrinsicId,
                          timestamp,
                        },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <Flex align="center">
                              <Text>{id.slice(0, 18)}...</Text>
                              <CopyButton value={id} />
                            </Flex>
                          </Td>
                          <Td>
                            <Tag size="sm" colorScheme="secondary">
                              {section}.{method}
                            </Tag>
                          </Td>
                          <Td>
                            <StyledLink to={`/accounts/${signerId}`}>
                              {signerId.substr(0, 10)}...
                            </StyledLink>
                          </Td>
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
              <Flex align="center" justify="space-between" mt={4}>
                <div style={{ flexGrow: 1 }} />
                <HStack>
                  <IconButton
                    aria-label="left"
                    icon={<ChevronLeftIcon />}
                    disabled={callsPage <= 0}
                    onClick={() => setCallsPage(callsPage - 1)}
                  />
                  <Box>
                    {callsPage + 1} of{' '}
                    {detail
                      ? Math.ceil(detail?.calls.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      callsPage >=
                      Math.ceil(detail?.calls.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setCallsPage(callsPage + 1)}
                  />
                </HStack>
              </Flex>
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
                      <Th>ID</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Amount</Th>
                      <Th>extrinsic</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.transferOut.nodes.map(
                      (
                        { id, fromId, toId, amount, extrinsicId, timestamp },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <StyledLink to={`/transfers/${id}`}>
                              {id}
                            </StyledLink>
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
                          <Td>{getAmountHuman(amount)}</Td>
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
              <Flex align="center" justify="space-between" mt={4}>
                <div style={{ flexGrow: 1 }} />
                <HStack>
                  <IconButton
                    aria-label="left"
                    icon={<ChevronLeftIcon />}
                    disabled={transfersOutPage <= 0}
                    onClick={() => setTransfersOutPage(transfersOutPage - 1)}
                  />
                  <Box>
                    {transfersOutPage + 1} of{' '}
                    {detail
                      ? Math.ceil(detail?.transferOut.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transfersOutPage >=
                      Math.ceil(detail?.transferOut.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setTransfersOutPage(transfersOutPage + 1)}
                  />
                </HStack>
              </Flex>
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
                      <Th>ID</Th>
                      <Th>From</Th>
                      <Th>To</Th>
                      <Th>Amount</Th>
                      <Th>extrinsic</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {detail.transferIn.nodes.map(
                      (
                        { id, fromId, toId, amount, extrinsicId, timestamp },
                        idx
                      ) => (
                        <Tr key={`account-${id}`}>
                          <Td>
                            <StyledLink to={`/transfers/${id}`}>
                              {id}
                            </StyledLink>
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
                          <Td>{getAmountHuman(amount)}</Td>
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
              <Flex align="center" justify="space-between" mt={4}>
                <div style={{ flexGrow: 1 }} />
                <HStack>
                  <IconButton
                    aria-label="left"
                    icon={<ChevronLeftIcon />}
                    disabled={transfersInPage <= 0}
                    onClick={() => setTransfersInPage(transfersInPage - 1)}
                  />
                  <Box>
                    {transfersInPage + 1} of{' '}
                    {detail
                      ? Math.ceil(detail?.transferIn.totalCount / PAGE_SIZE)
                      : 1}
                  </Box>
                  <IconButton
                    disabled={
                      transfersInPage >=
                      Math.ceil(detail?.transferIn.totalCount / PAGE_SIZE)
                    }
                    aria-label="left"
                    icon={<ChevronRightIcon />}
                    onClick={() => setTransfersInPage(transfersInPage + 1)}
                  />
                </HStack>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  )
}

export default AccountDetail

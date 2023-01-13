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
  Heading,
  Tag,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useQuery, gql } from '@apollo/client'
import { TimeIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import StyledLink from 'components/StyledLink'
import { briefHex } from 'libs/utils'
import { getNativeAmountHuman } from '../../../libs/appchainUtils'

const TRANSACTIONS_QUERY = gql`
  query QueryTransactions($offset: Int!, $pageSize: Int!) {
    transactions(offset: $offset, first: $pageSize, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        fromId
        to {
          id
          isContract
        }
        isSuccess
        value
        timestamp
        block {
          number
        }
      }
      totalCount
    }
  }
`

const PAGE_SIZE = 20

const Transactions = () => {
  const [page, setPage] = useState(0)
  const [isOnTable, setIsOnTable] = useState(false)

  const { loading, data, stopPolling, startPolling } = useQuery(
    TRANSACTIONS_QUERY,
    {
      variables: {
        offset: page * PAGE_SIZE,
        pageSize: PAGE_SIZE,
      },
    }
  )

  useEffect(() => {
    startPolling(6000)
    return () => stopPolling()
  }, [startPolling, stopPolling])

  return (
    <div>
      <Box
        p={5}
        background="white"
        mt={5}
        boxShadow="sm"
        borderRadius="lg"
        style={{ overflowX: 'scroll' }}
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
                <Th>Value</Th>
                <Th>Block</Th>
                <Th>Status</Th>
                <Th>Timestamp</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.transactions.nodes.map(
                ({ id, fromId, to, isSuccess, value, timestamp, block }) => (
                  <Tr key={`transaction-${id}`}>
                    <Td>
                      <StyledLink to={`/transactions/${id}`}>
                        {briefHex(id, 10)}
                      </StyledLink>
                    </Td>
                    <Td>
                      <StyledLink to={`/accounts/${fromId}`}>
                        {briefHex(fromId, 10)}
                      </StyledLink>
                    </Td>
                    <Td>
                      <StyledLink to={`/erc20tokens/${to.id}`}>
                        {briefHex(to.id, 10)}
                      </StyledLink>
                      <Tag
                        size="sm"
                        colorScheme={to.isContract ? 'primary' : 'secondary'}
                        ml={2}
                      >
                        {to.isContract ? 'Contract' : 'User'}
                      </Tag>
                    </Td>
                    <Td>{getNativeAmountHuman(value)}</Td>
                    <Td>
                      <StyledLink to={`/blocks/${block.number}`}>
                        <Heading as="h6" size="sm">
                          #{block.number}
                        </Heading>
                      </StyledLink>
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
                          {dayjs(timestamp).add(8, 'hours').toNow(true)}
                        </Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Tag
                        size="sm"
                        colorScheme={isSuccess ? 'green' : 'red'}
                        mr={2}
                      >
                        {isSuccess ? 'Success' : 'Fail'}
                      </Tag>
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
            {page + 1} of{' '}
            {data ? Math.ceil(data?.transactions.totalCount / PAGE_SIZE) : 1}
          </Box>
          <IconButton
            disabled={
              page >= Math.ceil(data?.transactions.totalCount / PAGE_SIZE)
            }
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setPage(page + 1)}
          />
        </HStack>
      </Flex>
    </div>
  )
}

export default Transactions

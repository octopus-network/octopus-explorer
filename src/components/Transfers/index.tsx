import { DocumentNode, useQuery } from '@apollo/client'
import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import AccountTag from 'components/AccountTag'
import StyledLink from 'components/StyledLink'
import dayjs from 'dayjs'
import { getNativeAmountHuman } from 'libs/appchainUtils'
import { briefHex } from 'libs/utils'
import { useEffect, useState } from 'react'
import { PAGE_SIZE } from 'views/evm/Accounts/queries'

export default function CommonTransfers({
  address,
  query,
  queryKey,
}: {
  address: string
  query: DocumentNode
  queryKey: string
}) {
  const [page, setPage] = useState(0)

  const transactionsQuery = useQuery(query, {
    variables: {
      id: address,
      offset: page * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  })

  useEffect(() => {
    transactionsQuery.startPolling(30 * 1000)
    return () => {
      transactionsQuery.stopPolling()
    }
  }, [])

  if (!transactionsQuery.data) {
    return (
      <Box p={10} display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    )
  }

  return (
    <>
      <Text mb={4} color="gray.500">
        There're {transactionsQuery.data[queryKey].totalCount} transactions in
        total
      </Text>
      <Table>
        <Thead background="primary.50">
          <Tr>
            <Th>ID</Th>
            <Th>From</Th>
            <Th></Th>
            <Th>To</Th>
            <Th>Value</Th>
            <Th>Time</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionsQuery.data[queryKey].nodes.map(
            ({ id, from, to, value, timestamp, isSuccess }, idx) => (
              <Tr key={`transaction-${id}`}>
                <Td>
                  <StyledLink to={`/transactions/${id}`}>
                    {briefHex(id, 10)}
                  </StyledLink>
                </Td>
                <Td>
                  <StyledLink to={`/accounts/${from.id}`}>
                    {briefHex(from.id, 10)}
                    <AccountTag account={from} />
                  </StyledLink>
                </Td>
                <Td>
                  <Tag
                    size="sm"
                    colorScheme={from.id === address ? 'green' : 'orange'}
                    ml={2}
                  >
                    {from.id === address ? 'Out' : 'In'}
                  </Tag>
                </Td>
                <Td>
                  <StyledLink to={`/accounts/${to.id}`}>
                    {briefHex(to.id, 10)}
                  </StyledLink>
                  <AccountTag account={to} />
                </Td>
                <Td>{getNativeAmountHuman(value)}</Td>
                <Td>
                  <HStack spacing={2} mt={1}>
                    <Icon as={TimeIcon} ml={3} boxSize={3} color="yellow.600" />
                    <Text color="grey" fontSize="sm">
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
            {transactionsQuery.data[queryKey]
              ? Math.ceil(
                  transactionsQuery?.data[queryKey].totalCount / PAGE_SIZE
                )
              : 1}
          </Box>
          <IconButton
            disabled={
              page + 1 >=
              Math.ceil(
                transactionsQuery?.data[queryKey].totalCount / PAGE_SIZE
              )
            }
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setPage(page + 1)}
          />
        </HStack>
      </Flex>
    </>
  )
}

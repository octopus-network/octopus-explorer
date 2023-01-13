import { useQuery } from '@apollo/client'
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
import { briefHex } from 'libs/utils'
import { useEffect, useState } from 'react'
import {
  PAGE_SIZE,
  EVM_ERC721_TRANSACTIONS_QUERY,
} from 'views/evm/Accounts/queries'

export default function ERC721Transfers({ address }: { address: string }) {
  const [page, setPage] = useState(0)

  const transactionsQuery = useQuery(EVM_ERC721_TRANSACTIONS_QUERY, {
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

  const key = 'erc721Transfers'

  if (!transactionsQuery.data) {
    return (
      <Box p={10} display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    )
  }
  return (
    <>
      <Table>
        <Thead background="primary.50">
          <Tr>
            <Th>Transaction Id</Th>
            <Th>From</Th>
            <Th></Th>
            <Th>To</Th>
            <Th>Token</Th>
            <Th>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionsQuery.data[key].nodes.map(
            ({ id, transactionId, from, to, tokenId, timestamp }, idx) => (
              <Tr key={`transaction-${id}`}>
                <Td>
                  <StyledLink to={`/transactions/${transactionId}`}>
                    {briefHex(transactionId, 10)}
                  </StyledLink>
                </Td>
                <Td>
                  <StyledLink to={`/accounts/${from.id}`}>
                    {briefHex(from.id, 10)}
                  </StyledLink>
                  <AccountTag account={from} />
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
                <Td>
                  <StyledLink to={`/erc721_tokens/${tokenId}`}>
                    {briefHex(tokenId, 10)}
                  </StyledLink>
                </Td>
                <Td>
                  <HStack spacing={2} mt={1}>
                    <Icon as={TimeIcon} ml={3} boxSize={3} color="yellow.600" />
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
            {transactionsQuery.data[key]
              ? Math.ceil(transactionsQuery.data[key].totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              page + 1 >=
              Math.ceil(transactionsQuery.data[key].totalCount / PAGE_SIZE)
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

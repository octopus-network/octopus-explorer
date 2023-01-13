import { DocumentNode, useQuery } from '@apollo/client'
import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Progress,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import StyledLink from 'components/StyledLink'
import { amountToHuman, briefHex, percentage } from 'libs/utils'
import { useEffect, useState } from 'react'
import { PAGE_SIZE, ERC20_BALANCES } from 'views/evm/Accounts/queries'

export default function Holders({ address }: { address: string }) {
  const [page, setPage] = useState(0)

  const transactionsQuery = useQuery(ERC20_BALANCES, {
    variables: {
      contractId: address,
      offset: page * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  })

  const queryKey = 'erc20Balances'

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
        There're {transactionsQuery.data[queryKey].totalCount} holders in total
      </Text>
      <Table>
        <Thead background="primary.50">
          <Tr>
            <Th>Account</Th>
            <Th>Quantity</Th>
            <Th>Percentage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionsQuery.data[queryKey].nodes.map(
            ({ accountId, value, tokenContract }, idx) => {
              const per = percentage(value, tokenContract.totalSupply)
              return (
                <Tr key={`transaction-${accountId}`}>
                  <Td>
                    <StyledLink to={`/accounts/${accountId}`}>
                      {briefHex(accountId, 10)}
                    </StyledLink>
                  </Td>
                  <Td>
                    <Text>
                      {amountToHuman(value, tokenContract.decimals, 2)}
                    </Text>
                  </Td>
                  <Td>
                    <VStack align="flex-start">
                      <Progress value={Number(per)} w={200} />
                      <Text>{per}%</Text>
                    </VStack>
                  </Td>
                </Tr>
              )
            }
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

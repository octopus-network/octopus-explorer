import { useQuery } from '@apollo/client'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import StyledLink from 'components/StyledLink'
import { briefHex } from 'libs/utils'

import { useEffect, useState } from 'react'
import { EVM_LOGS_QUERY, PAGE_SIZE } from 'views/evm/Accounts/queries'

export default function EVMLogs({ address }: { address: string }) {
  const [page, setPage] = useState(0)

  const query = useQuery(EVM_LOGS_QUERY, {
    variables: {
      contractId: address,
      offset: page * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  })

  useEffect(() => {
    query.startPolling(30 * 1000)
    return () => {
      query.stopPolling()
    }
  }, [])

  if (!query.data) {
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
            <Th>ID</Th>
            <Th>Index</Th>
            <Th>Transaction</Th>
            <Th>Data</Th>
            <Th>Topics</Th>
          </Tr>
        </Thead>
        <Tbody>
          {query.data.evmLogs.nodes.map(
            ({ id, logIndex, transactionId, data, topics }, idx) => (
              <Tr key={`evmLog-${id}`}>
                <Td>{id}</Td>
                <Td>{logIndex}</Td>
                <Td>
                  <StyledLink to={`/transactions/${transactionId}`}>
                    {briefHex(transactionId, 10)}
                  </StyledLink>
                </Td>
                <Td>
                  <Text wordBreak="break-all">{data}</Text>
                </Td>
                <Td>
                  <Box p={4} background="blackAlpha.50">
                    <Text wordBreak="break-all">
                      {topics.length > 0 && JSON.stringify(topics)}
                    </Text>
                  </Box>
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
            {query.data
              ? Math.ceil(query.data?.evmLogs.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              page + 1 >= Math.ceil(query.data.evmLogs.totalCount / PAGE_SIZE)
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

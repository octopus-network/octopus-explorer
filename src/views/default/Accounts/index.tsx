import {
  Flex,
  Box,
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
} from '@chakra-ui/react'
import { useQuery, gql } from '@apollo/client'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import CopyButton from '../../../components/CopyButton'
import StyledLink from 'components/StyledLink'
import { getNativeAmountHuman } from 'libs/appchainUtils'

const ACCOUNT_QUERY = gql`
  query QueryAccounts($offset: Int!, $pageSize: Int!) {
    accounts(offset: $offset, first: $pageSize, orderBy: ID_ASC) {
      nodes {
        id
        freeBalance
        calls {
          totalCount
        }
        transferOut {
          totalCount
        }
        transferIn {
          totalCount
        }
      }
      totalCount
    }
  }
`

const PAGE_SIZE = 20

const Accounts = () => {
  const [page, setPage] = useState(0)
  const [accounts, setAccounts] = useState<any[]>([])

  const { loading, data, stopPolling, startPolling } = useQuery(ACCOUNT_QUERY, {
    variables: {
      offset: page * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  })

  useEffect(() => {
    startPolling(15 * 1000)
    return () => stopPolling()
  }, [startPolling, stopPolling])

  useEffect(() => {
    ;(async () => {
      if (data) {
        setAccounts(data.accounts.nodes.map((account) => account))
      }
    })()
  }, [data])

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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Balance</Th>
                <Th>Transfers</Th>
                <Th>Calls</Th>
              </Tr>
            </Thead>
            <Tbody>
              {accounts.map(
                ({ id, freeBalance, calls, transferOut, transferIn }) => (
                  <Tr key={`account-${id}`}>
                    <Td>
                      <Flex align="center">
                        <StyledLink to={`/accounts/${id}`}>
                          <Heading size="sm" as="h6">
                            {id.slice(0, 18)}...
                          </Heading>
                        </StyledLink>
                        <CopyButton value={id} />
                      </Flex>
                    </Td>
                    <Td>{getNativeAmountHuman(freeBalance)}</Td>
                    <Td>{transferOut.totalCount + transferIn.totalCount}</Td>
                    <Td>{calls.totalCount}</Td>
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
            {data ? Math.ceil(data?.accounts.totalCount / PAGE_SIZE) : 1}
          </Box>
          <IconButton
            disabled={page >= Math.ceil(data?.accounts.totalCount / PAGE_SIZE)}
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setPage(page + 1)}
          />
        </HStack>
      </Flex>
    </div>
  )
}

export default Accounts

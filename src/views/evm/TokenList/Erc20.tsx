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
} from '@chakra-ui/react'
import { useQuery, gql } from '@apollo/client'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import StyledLink from 'components/StyledLink'
import { useParams } from 'react-router-dom'
import { amountToHuman } from 'libs/utils'

const TOKEN_QUERY = gql`
  query QueryTransactions($offset: Int!, $pageSize: Int!) {
    erc20TokenContracts(offset: $offset, first: $pageSize) {
      nodes {
        id
        symbol
        name
        decimals
        totalSupply
        balances {
          totalCount
        }
        erc20Transfers {
          totalCount
        }
      }
      totalCount
    }
  }
`

const PAGE_SIZE = 20

const ERC20TokenList = () => {
  const { appchain } = useParams()
  const [page, setPage] = useState(0)
  const [isOnTable, setIsOnTable] = useState(false)
  const [detailedList, setDetailedList] = useState<any>()

  const { loading, data, stopPolling, startPolling } = useQuery(TOKEN_QUERY, {
    variables: {
      offset: page * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  })

  useEffect(() => {
    startPolling(6000)
    return () => stopPolling()
  }, [startPolling, stopPolling])

  useEffect(() => {
    ;(async () => {
      if (data) {
        setDetailedList(data.erc20TokenContracts.nodes)
      } else {
        setDetailedList(null)
      }
    })()
  }, [data])

  return (
    <>
      <Box
        p={5}
        background="white"
        mt={5}
        boxShadow="sm"
        borderRadius="lg"
        style={{ overflowX: 'scroll' }}
      >
        {!detailedList ? (
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
            variant="striped"
            onMouseEnter={() => setIsOnTable(true)}
            onMouseLeave={() => setIsOnTable(false)}
          >
            <Thead>
              <Tr>
                <Th>Token</Th>
                <Th>Total Supply</Th>
                <Th>Holders</Th>
                <Th>Transfers</Th>
              </Tr>
            </Thead>
            <Tbody>
              {detailedList.map(
                ({
                  id,
                  name,
                  symbol,
                  decimals,
                  totalSupply,
                  balances: holders,
                  erc20Transfers,
                }) => (
                  <Tr key={`transaction-${id}`}>
                    <Td>
                      <StyledLink to={`/accounts/${id}`}>
                        {name}({symbol})
                      </StyledLink>
                    </Td>
                    <Td>{amountToHuman(totalSupply, decimals, 2)}</Td>
                    <Td>{holders.totalCount}</Td>
                    <Td>{erc20Transfers.totalCount}</Td>
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
            {data
              ? Math.ceil(data?.erc20TokenContracts.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              page >=
              Math.ceil(data?.erc20TokenContracts.totalCount / PAGE_SIZE)
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

export default ERC20TokenList

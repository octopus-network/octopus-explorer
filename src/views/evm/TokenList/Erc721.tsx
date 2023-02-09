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
import SearchBox from '../../../components/SearchBox'
import StyledLink from 'components/StyledLink'
import { briefHex } from 'libs/utils'
import { useParams } from 'react-router-dom'

const TOKEN_QUERY = gql`
  query QueryTransactions($offset: Int!, $pageSize: Int!) {
    erc721TokenContracts(offset: $offset, first: $pageSize) {
      nodes {
        id
        symbol
        name
        tokens {
          totalCount
        }
        balances {
          totalCount
        }
        erc721Transfers {
          totalCount
        }
      }
      totalCount
    }
  }
`

const PAGE_SIZE = 20

const Erc721TokenList = () => {
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
        console.log('data', data)
        setDetailedList(data.erc721TokenContracts.nodes)
      } else {
        setDetailedList(null)
      }
    })()
  }, [data])

  return (
    <div>
      <SearchBox></SearchBox>
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
            variant="simple"
            onMouseEnter={() => setIsOnTable(true)}
            onMouseLeave={() => setIsOnTable(false)}
          >
            <Thead>
              <Tr>
                <Th>Contract</Th>
                <Th>Name</Th>
                <Th>Symbol</Th>
                <Th>Tokens</Th>
                <Th>Holders</Th>
                <Th>ERC721 Transfers</Th>
              </Tr>
            </Thead>
            <Tbody>
              {detailedList.map(
                ({
                  id,
                  name,
                  symbol,
                  tokens,
                  totalSupply,
                  balances: holders,
                  erc721Transfers,
                }) => (
                  <Tr key={`transaction-${id}`}>
                    <Td>
                      <StyledLink to={`/accounts/${id}`}>
                        {briefHex(id, 10)}
                      </StyledLink>
                    </Td>
                    <Td>{name}</Td>
                    <Td>{symbol}</Td>
                    <Td>{tokens.totalCount}</Td>
                    <Td>{holders.totalCount}</Td>
                    <Td>{erc721Transfers.totalCount}</Td>
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
              ? Math.ceil(data?.erc721TokenContracts.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              page >=
              Math.ceil(data?.erc721TokenContracts.totalCount / PAGE_SIZE)
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

export default Erc721TokenList

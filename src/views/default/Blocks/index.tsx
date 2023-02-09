import {
  Flex,
  Box,
  Text,
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
import dayjs from 'dayjs'
import { useQuery, gql } from '@apollo/client'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import StyledLink from 'components/StyledLink'

const BLOCKS_QUERY = gql`
  query QueryBlocks($offset: Int!, $pageSize: Int!) {
    blocks(offset: $offset, first: $pageSize, orderBy: NUMBER_DESC) {
      nodes {
        id
        number
        timestamp
        extrinsics {
          totalCount
        }
        events {
          totalCount
        }
      }
      totalCount
    }
  }
`

const PAGE_SIZE = 20

const Blocks = () => {
  const [page, setPage] = useState(0)

  const { loading, data, stopPolling, startPolling } = useQuery(BLOCKS_QUERY, {
    variables: {
      offset: page * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  })

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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Block</Th>
                <Th>Timestamp</Th>
                <Th>Extrinsics</Th>
                <Th>Events</Th>
                <Th>Hash</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.blocks.nodes.map(
                ({ number, id, timestamp, events, extrinsics }) => (
                  <Tr key={`block-${id}`}>
                    <Td>
                      <StyledLink to={`/blocks/${number}`}>
                        <Heading size="sm" as="h6">
                          #{number}
                        </Heading>
                      </StyledLink>
                    </Td>
                    <Td>
                      <HStack spacing={2} mt={1}>
                        <Text color="grey" fontSize="md">
                          {dayjs(timestamp).add(8, 'hours').toNow(true)}
                        </Text>
                      </HStack>
                    </Td>
                    <Td>{extrinsics.totalCount}</Td>
                    <Td>{events.totalCount}</Td>
                    <Td>
                      <StyledLink to={`/blocks/${id}`}>
                        {id.substr(32)}...
                      </StyledLink>
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
            {data ? Math.ceil(data?.blocks.totalCount / PAGE_SIZE) : 1}
          </Box>
          <IconButton
            disabled={page >= Math.ceil(data?.blocks.totalCount / PAGE_SIZE)}
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setPage(page + 1)}
          />
        </HStack>
      </Flex>
    </div>
  )
}

export default Blocks

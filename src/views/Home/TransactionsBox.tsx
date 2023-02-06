import { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Text, Flex, Box, Spinner, HStack, Heading } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { isMobile } from 'react-device-detect'
import StyledLink from 'components/StyledLink'
import { briefHex } from 'libs/utils'
import { getNativeAmountHuman } from 'libs/appchainUtils'

const NEW_TRANSACTION_QUERY = gql`
  query QueryNewTransactions {
    transactions(first: 5, orderBy: TIMESTAMP_DESC) {
      nodes {
        block {
          number
        }
        id
        fromId
        value
        timestamp
      }
    }
  }
`

const TransactionsBox = () => {
  const { loading, data, stopPolling, startPolling } = useQuery(
    NEW_TRANSACTION_QUERY
  )

  useEffect(() => {
    startPolling(6000)
    return () => stopPolling()
  }, [stopPolling, startPolling])

  const nodes = data?.transactions?.nodes
  return (
    <Box p={4} background="white" borderRadius="lg" boxShadow="sm">
      {loading ? (
        <Box p={10} display="flex" alignItems="center" justifyContent="center">
          <Spinner />
        </Box>
      ) : (
        data?.transactions?.nodes.map(
          ({ id, fromId, value, timestamp }, idx) => {
            const isLast = nodes.length - 1 === idx
            return (
              <Flex
                key={`transactin-${id}`}
                alignItems="center"
                borderBottom={!isLast && '1px solid #eee'}
                justify="space-between"
                pt={4}
                pb={4}
              >
                <Box>
                  <StyledLink to={`/transactions/${id}`}>
                    <Heading as="h6" size="sm">
                      {isMobile ? briefHex(id, 10) : briefHex(id, 20)}
                    </Heading>
                  </StyledLink>
                  <HStack spacing={2} mt={1}>
                    <Text color="grey" fontSize="sm">
                      {dayjs(timestamp).add(8, 'hours').toNow(true)}
                    </Text>
                  </HStack>
                </Box>
                <Box
                  display="flex"
                  alignItems="end"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <StyledLink to={`/accounts/${fromId}`}>
                    {isMobile ? briefHex(id, 8) : briefHex(id, 12)}
                  </StyledLink>
                  <div>
                    <Text color="grey" fontSize="sm">
                      {getNativeAmountHuman(value, 4)}
                    </Text>
                  </div>
                </Box>
              </Flex>
            )
          }
        )
      )}
    </Box>
  )
}

export default TransactionsBox

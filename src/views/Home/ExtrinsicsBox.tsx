import { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  Text,
  Flex,
  Box,
  Spinner,
  HStack,
  Tag,
  Heading,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { isMobile } from 'react-device-detect'
import StyledLink from 'components/StyledLink'

const NEW_EXTRINSICS_QUERY = gql`
  query QueryNewExtrinsics {
    extrinsics(first: 5, orderBy: TIMESTAMP_DESC) {
      nodes {
        block {
          number
        }
        id
        method
        section
        timestamp
        blockId
      }
    }
  }
`

const ExtrinsicsBox = () => {
  const { loading, data, stopPolling, startPolling } =
    useQuery(NEW_EXTRINSICS_QUERY)

  useEffect(() => {
    startPolling(6000)
    return () => stopPolling()
  }, [stopPolling, startPolling])

  const total = data?.extrinsics?.nodes
  return (
    <Box p={4} background="white" borderRadius="lg" boxShadow="sm">
      {loading ? (
        <Box p={10} display="flex" alignItems="center" justifyContent="center">
          <Spinner />
        </Box>
      ) : (
        data?.extrinsics?.nodes.map(
          ({ section, id, method, timestamp, blockId }, idx) => {
            const isLast = idx === total.length - 1
            return (
              <Flex
                key={`block-${id}`}
                alignItems="center"
                borderBottom={!isLast && '1px solid #eee'}
                justify="space-between"
                pt={4}
                pb={4}
              >
                <Box>
                  <StyledLink to={`/extrinsics/${id}`}>
                    <Heading as="h6" size="sm">
                      {id.substr(0, isMobile ? 18 : 32)}...
                    </Heading>
                  </StyledLink>
                  <HStack spacing={2} mt={1}>
                    <Text color="grey" fontSize="sm">
                      {dayjs(timestamp).add(8, 'hours').toNow(true)}
                    </Text>
                  </HStack>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Tag size="sm" colorScheme="secondary">
                    {section}.{method}
                  </Tag>
                </Box>
              </Flex>
            )
          }
        )
      )}
    </Box>
  )
}

export default ExtrinsicsBox

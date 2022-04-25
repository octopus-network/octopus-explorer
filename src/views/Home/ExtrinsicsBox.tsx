import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Text,
  Flex,
  Box,
  Link,
  Spinner,
  HStack,
  Tag,
  Icon,
  Heading,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { TimeIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

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
`;

const ExtrinsicsBox = () => {
  const { loading, data, stopPolling, startPolling } =
    useQuery(NEW_EXTRINSICS_QUERY);

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  }, [stopPolling, startPolling]);

  return (
    <Box p={4} background="white" borderRadius="lg" boxShadow="sm">
      {loading ? (
        <Box p={10} display="flex" alignItems="center" justifyContent="center">
          <Spinner />
        </Box>
      ) : (
        data?.extrinsics?.nodes.map(
          ({ section, id, method, timestamp, blockId }, idx) => (
            <Flex
              key={`block-${id}`}
              alignItems="center"
              borderBottom="1px solid #eee"
              justify="space-between"
              pt={4}
              pb={4}
            >
              <Box>
                <Link
                  color="primary.600"
                  as={RouterLink}
                  to={`/extrinsics/${id}`}
                >
                  <Heading as="h6" size="sm">
                    {id.substr(0, isMobile ? 18 : 32)}...
                  </Heading>
                </Link>
                <HStack spacing={2} mt={1}>
                  <Icon as={TimeIcon} ml={3} boxSize={3} color="yellow.600" />
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
        )
      )}
    </Box>
  );
};

export default ExtrinsicsBox;

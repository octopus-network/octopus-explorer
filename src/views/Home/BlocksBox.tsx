import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Text, Flex, Box, Link, Spinner, HStack, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { TimeIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const NEW_BLOCKS_QUERY = gql`
  query QueryNewBlocks {
    blocks(first: 5, orderBy: NUMBER_DESC) {
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
    }
  }
`;

const BlocksBox = () => {
  const { loading, data, stopPolling, startPolling } = useQuery(NEW_BLOCKS_QUERY);

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  }, [stopPolling, startPolling]);

  return (
    <Box p={4} background="white" borderRadius="lg" boxShadow="sm">
      {
        loading ?
        <Box p={10} display="flex" alignItems="center" justifyContent="center">
          <Spinner />
        </Box> :
        data?.blocks?.nodes.map(({ number, id, timestamp, extrinsics, events }, idx) => (
          <Flex key={`block-${id}`} alignItems="center" borderBottom="1px solid #eee"
            justify="space-between" pt={4} pb={4}>
            <Box>
              <Link color="blue.600" as={RouterLink} to={`/blocks/${number}`}>
                  <Heading as="h6" size="sm">#{number}</Heading>
                </Link>
              <HStack spacing={5} mt={1}>
                <Text fontSize="sm" color="grey">{extrinsics.totalCount} extrinsics</Text>
                <Text fontSize="sm" color="grey">{events.totalCount} events</Text>
              </HStack>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <TimeIcon mr={3} color="yellow.600" />
              <Text color="grey" fontSize="sm">{ dayjs(timestamp).add(8, 'hours').toNow(true) }</Text>
            </Box>
          </Flex>
        ))
      }
    </Box>
  )
}

export default BlocksBox;
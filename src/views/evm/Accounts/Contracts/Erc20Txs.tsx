import {
  IconButton,
  Flex,
  HStack,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Tag,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useQuery } from '@apollo/client'
import { getNativeAmountHuman } from '../../../../libs/appchainUtils'
import StyledLink from 'components/StyledLink'
import { briefHex } from 'libs/utils'
import { PAGE_SIZE, CONTRACT_ERC20_TRANSACTIONS_QUERY } from '../queries'
import AccountTag from 'components/AccountTag'

const Erc20Txs = ({ account }) => {
  const { id } = account
  const [detail, setDetail] = useState<any>()
  const [erc20TransfersPage, setErc20TransfersPage] = useState(0)

  const contracterc20TransfersQuery = useQuery(
    CONTRACT_ERC20_TRANSACTIONS_QUERY,
    {
      variables: {
        contractId: id,
        offset: erc20TransfersPage * PAGE_SIZE,
        pageSize: PAGE_SIZE,
      },
    }
  )

  useEffect(() => {
    contracterc20TransfersQuery.startPolling(30 * 1000)
    return () => {
      contracterc20TransfersQuery.stopPolling()
    }
  }, [])

  useEffect(() => {
    if (account && contracterc20TransfersQuery.data) {
      const accountDetail = {
        ...account,
        ...contracterc20TransfersQuery.data,
      }
      setDetail(accountDetail)
    } else {
      setDetail(null)
    }
  }, [contracterc20TransfersQuery])

  return (
    <div>
      {!detail ? (
        <Box p={10} display="flex" alignItems="center" justifyContent="center">
          <Spinner />
        </Box>
      ) : (
        <Table>
          <Thead background="primary.50">
            <Tr>
              <Th>Transaction Id</Th>
              <Th>From</Th>
              <Th></Th>
              <Th>To</Th>
              <Th>Value</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {detail.erc20Transfers.nodes.map(
              ({ id, transactionId, from, to, value, timestamp }, idx) => (
                <Tr key={`transaction-${id}`}>
                  <Td>
                    <StyledLink to={`/transactions/${transactionId}`}>
                      {briefHex(transactionId, 10)}
                    </StyledLink>
                  </Td>
                  <Td>
                    <StyledLink to={`/accounts/${from.id}`}>
                      {briefHex(from.id, 10)}
                    </StyledLink>
                    <AccountTag account={to} />
                  </Td>
                  <Td>
                    <Tag
                      size="sm"
                      colorScheme={from.id === account.id ? 'green' : 'orange'}
                      ml={2}
                    >
                      {from.id === account.id ? 'Out' : 'In'}
                    </Tag>
                  </Td>
                  <Td>
                    <StyledLink to={`/accounts/${to.id}`}>
                      {briefHex(to.id, 10)}
                    </StyledLink>
                    <AccountTag account={to} />
                  </Td>
                  <Td>{getNativeAmountHuman(value)}</Td>
                  <Td>
                    <HStack spacing={2} mt={1}>
                      <Text color="grey" fontSize="sm">
                        {dayjs(timestamp).add(8, 'hours').toNow(true)}
                      </Text>
                    </HStack>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      )}
      <Flex align="center" justify="space-between" mt={4}>
        <div style={{ flexGrow: 1 }} />
        <HStack>
          <IconButton
            aria-label="left"
            icon={<ChevronLeftIcon />}
            disabled={erc20TransfersPage <= 0}
            onClick={() => setErc20TransfersPage(erc20TransfersPage - 1)}
          />
          <Box>
            {erc20TransfersPage + 1} of{' '}
            {detail
              ? Math.ceil(detail?.erc20Transfers.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              erc20TransfersPage + 1 >=
              Math.ceil(detail?.erc20Transfers.totalCount / PAGE_SIZE)
            }
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setErc20TransfersPage(erc20TransfersPage + 1)}
          />
        </HStack>
      </Flex>
    </div>
  )
}

export default Erc20Txs

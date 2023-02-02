import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { amountToHuman } from 'libs/utils'
import { Account } from 'types'
import { useApolloClient } from '@apollo/client'
import { ERC20_HODLER_COUNT, EVM_TRANSACTIONS_COUNT } from './queries'
import { useEffect, useState } from 'react'

export default function Overview({
  account,
  id,
}: {
  account?: Account
  id: string
}) {
  const [holderCount, setHolderCount] = useState('-')
  const [txCount, setTxCount] = useState('-')
  const isERC20Token = account?.erc20TokenContract

  const client = useApolloClient()
  useEffect(() => {
    if (isERC20Token && client) {
      client
        .query({
          query: ERC20_HODLER_COUNT,
          variables: { contractId: id.toLowerCase() },
        })
        .then((result) => {
          setHolderCount(result.data.erc20Balances.totalCount)
        })
        .catch(() => {})

      client
        .query({
          query: EVM_TRANSACTIONS_COUNT,
          variables: { id: id.toLowerCase() },
        })
        .then((result) => {
          setTxCount(result.data.transactions.totalCount)
        })
        .catch(() => {})
    }
  }, [client, isERC20Token])

  return (
    <Box flex={1} background="white" boxShadow="sm" borderRadius="lg">
      <Heading size="md" borderBottom="1px solid #eee" p={4}>
        Overview
      </Heading>
      <Box>
        {!isERC20Token && (
          <HStack borderBottom="1px solid #eee" m={2} p={2}>
            <Text w={100}>Balance:</Text>
            <Text>{amountToHuman(account?.freeBalance, 18, 4)}</Text>
          </HStack>
        )}
        {!isERC20Token && (
          <HStack m={2} p={2}>
            <Text w={100}>Nonce:</Text>
            <Text>{account?.nonce}</Text>
          </HStack>
        )}
        {isERC20Token && (
          <HStack borderBottom="1px solid #eee" m={2} p={2}>
            <Text w={100}>Total Supply:</Text>
            <Text>
              {amountToHuman(
                account.erc20TokenContract.totalSupply,
                account.erc20TokenContract.decimals,
                0
              )}
            </Text>
            <Text>{account.erc20TokenContract.symbol}</Text>
          </HStack>
        )}
        {isERC20Token && (
          <HStack borderBottom="1px solid #eee" m={2} p={2}>
            <Text w={100}>Holders:</Text>
            <Text>{holderCount}</Text>
          </HStack>
        )}
        {isERC20Token && (
          <HStack m={2} p={2}>
            <Text w={100}>Transfers:</Text>
            <Text>{txCount}</Text>
          </HStack>
        )}
      </Box>
    </Box>
  )
}

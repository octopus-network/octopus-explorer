import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import CopyButton from 'components/CopyButton'
import { amountToHuman } from 'libs/utils'
import { Account } from 'types'

export default function Overview({ account }: { account?: Account }) {
  const isERC20Token = account?.erc20TokenContract
  const isContract = account?.isContract
  return (
    <Box flex={1} background="white" boxShadow="sm" borderRadius="lg">
      <Heading size="md" borderBottom="1px solid #eee" p={4}>
        Overview
      </Heading>
      <Box>
        {!isERC20Token && (
          <HStack borderBottom="1px solid #eee" m={2} p={2}>
            <Text>Balance</Text>
            <Text>{amountToHuman(account?.freeBalance, 18, 4)}</Text>
          </HStack>
        )}
        {!isERC20Token && (
          <HStack m={2} p={2}>
            <Text>Nonce</Text>
            <Text>{account?.nonce}</Text>
          </HStack>
        )}
        {isERC20Token && (
          <HStack borderBottom="1px solid #eee" m={2} p={2}>
            <Text>Total Supply</Text>
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
            <Text>Holders</Text>
            <Text>{account.erc20TokenContract.erc20Transfers.totalCount}</Text>
          </HStack>
        )}
        {isERC20Token && (
          <HStack m={2} p={2}>
            <Text>Transfers</Text>
            <Text>{account.erc20TokenContract.erc20Transfers.totalCount}</Text>
          </HStack>
        )}
      </Box>
    </Box>
  )
}

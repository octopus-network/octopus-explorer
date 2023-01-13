import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import CopyButton from 'components/CopyButton'
import StyledLink from 'components/StyledLink'
import { Account } from 'types'

export default function Summary({ account }: { account?: Account }) {
  const isERC20Token = account?.erc20TokenContract
  const isContract = account?.isContract
  return (
    <Box
      flex={1}
      height="100%"
      background="white"
      boxShadow="sm"
      borderRadius="lg"
    >
      <Heading size="md" borderBottom="1px solid #eee" p={4}>
        Summary
      </Heading>
      <Box>
        {isContract && (
          <HStack borderBottom="1px solid #eee" m={2} p={2}>
            <Text w={100}>Contract:</Text>
            <Text>{account.id}</Text>
          </HStack>
        )}
        {isERC20Token && (
          <HStack borderBottom="1px solid #eee" m={2} p={2}>
            <Text w={100}>Decimals:</Text>
            <Text>{account.erc20TokenContract.decimals}</Text>
          </HStack>
        )}
        {isContract && (
          <HStack m={2} p={2}>
            <Text w={100}>Creator:</Text>
            <StyledLink to={`/accounts/${account.creator.id}`}>
              {account.creator.id}
            </StyledLink>
          </HStack>
        )}
      </Box>
    </Box>
  )
}

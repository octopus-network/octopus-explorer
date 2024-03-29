import { Flex, Heading, Text, HStack, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import CopyButton from '../../../components/CopyButton'
import { ACCOUNT_QUERY } from './queries'
import EvmAcountData from './EvmAccountData'
import AppchainData from './AppchainData'
import AccountTag from 'components/AccountTag'
import Overview from './Overview'
import Summary from './Summary'
import { Account } from 'types'

const AccountDetail = () => {
  const { id } = useParams()
  const [account, setAccount] = useState<Account>()

  const accountQuery = useQuery(ACCOUNT_QUERY, {
    variables: { id: id.toLowerCase() },
  })

  useEffect(() => {
    accountQuery.startPolling(30 * 1000)
    return () => {
      accountQuery.stopPolling()
    }
  }, [])

  useEffect(() => {
    if (accountQuery.data) {
      const { account } = accountQuery.data
      if (account) {
        setAccount(account)
      } else {
        // setAccount({
        //   freeBalance: '0',
        //   createdAt: 'Not detected yet.',
        // })
      }
    } else {
      setAccount(null)
    }
  }, [accountQuery])

  const isERC20Token = account?.erc20TokenContract
  const isContract = account?.isContract

  return (
    <div>
      {account && (
        <Flex justify="space-between" align="center">
          <VStack align="flex-start">
            <HStack align="flex-end" gap={2}>
              <Heading size="lg">
                {isContract ? (isERC20Token ? 'Token' : 'Contract') : 'Account'}
              </Heading>
              <Text>
                {isERC20Token
                  ? `${account?.erc20TokenContract.name}(${account?.erc20TokenContract.symbol})`
                  : id}
              </Text>
              {!isERC20Token && <CopyButton value={id} />}
            </HStack>
            <HStack align="flex-start" justify="flex-start" gap={2}>
              <AccountTag account={account} />
            </HStack>
          </VStack>
        </Flex>
      )}
      <HStack align="flex-start" mt={5} gap={4}>
        <Overview id={id} account={account} />
        <Summary account={account} />
      </HStack>
      {account?.id && <EvmAcountData account={account} />}
      {account?.id && <AppchainData account={account} />}
    </div>
  )
}

export default AccountDetail

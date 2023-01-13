import {
  Flex,
  HStack,
  Heading,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { MdApps } from 'react-icons/md'
import {
  EVM_TRANSACTIONS_QUERY,
  EVM_ERC20_TRANSACTIONS_QUERY,
  EVM_ERC1155_TRANSACTIONS_QUERY,
} from './queries'
import { Account } from 'types'
import ERC721Transfers from 'components/Transfers/ERC721'
import CommonTransfers from 'components/Transfers'
import EVMLogs from 'components/Transfers/EVMLogs'
import Holders from 'components/Hodlers'

const EvmAcountData = ({ account }: { account: Account }) => {
  const { id } = account

  return (
    <div>
      <Flex mt={5} align="center" justify="space-between" pt={3} pb={4}>
        <HStack>
          <MdApps />
          <Heading as="h6" size="xs">
            EVM Data
          </Heading>
        </HStack>
      </Flex>
      <Box p={4} background="white" boxShadow="sm" borderRadius="lg">
        <Tabs>
          <TabList>
            <Tab>
              {account?.erc20TokenContract ? 'Transfers' : 'Transactions'}
            </Tab>
            {account && account.erc20TokenContract && <Tab>Holders</Tab>}
            {account && account.isContract && <Tab>EVM Logs</Tab>}
            {!(account && account?.isContract) && <Tab>Erc20 Token Txns</Tab>}
            {!(account && account?.isContract) && <Tab>Erc721 Token Txns</Tab>}
            {!(account && account?.isContract) && <Tab>Erc1155 Token Txns</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
              <CommonTransfers
                address={id}
                query={EVM_TRANSACTIONS_QUERY}
                queryKey="transactions"
              />
            </TabPanel>
            {account && account.erc20TokenContract && (
              <TabPanel>
                <Holders address={id} />
              </TabPanel>
            )}
            {account && account.isContract && (
              <TabPanel>
                <EVMLogs address={id} />
              </TabPanel>
            )}
            {!(account && account?.isContract) && (
              <TabPanel>
                <CommonTransfers
                  address={id}
                  query={EVM_ERC20_TRANSACTIONS_QUERY}
                  queryKey="erc20Transfers"
                />
              </TabPanel>
            )}
            {!(account && account?.isContract) && (
              <TabPanel>
                <ERC721Transfers address={id} />
              </TabPanel>
            )}
            {!(account && account?.isContract) && (
              <TabPanel>
                <CommonTransfers
                  address={id}
                  query={EVM_ERC1155_TRANSACTIONS_QUERY}
                  queryKey="erc1155Transfers"
                />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  )
}

export default EvmAcountData

import { Box, Text } from '@chakra-ui/react'
import { Select, chakraComponents } from 'chakra-react-select'
import { Asset } from 'types'
import { amountToHuman } from 'libs/utils'

const customComponents = {
  Option: ({ children, ...props }: any) => {
    return (
      <chakraComponents.Option {...props}>
        <Box ml={1} flexDirection="column">
          {children}
          {props.data.balance}
        </Box>
      </chakraComponents.Option>
    )
  },
  Input: ({ children, ...props }: any) => {
    let name = ''
    let balance = null

    if (props.hasValue) {
      const value: Asset = props.getValue()[0]
      name = value.tokenContract.name
      balance = value.balance
    }
    return (
      <chakraComponents.Option {...props} selectProps={{ size: 'sm' }}>
        <Box flexDirection="column">
          <Text ml={1} fontSize="lg">
            {name}
          </Text>
          {balance}
        </Box>
      </chakraComponents.Option>
    )
  },
  SingleValue: () => null,
}

export default function Assets({ assets }: { assets: Asset[] }) {
  return (
    <Box flex={1}>
      <Select
        size="lg"
        options={assets.map((t) => {
          return {
            ...t,
            label: t.tokenContract.name,
            balance: (
              <Text ml={1} fontSize="sm" color="grey">
                {`${amountToHuman(t.value, t.tokenContract.decimals)} ${
                  t.tokenContract.symbol
                }`}
              </Text>
            ),
          }
        })}
        components={customComponents}
      />
    </Box>
  )
}

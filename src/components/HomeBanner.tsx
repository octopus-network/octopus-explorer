import { Flex, Input, Button, Center, Text, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import headerBg from 'assets/background.svg'
import { useApolloClient } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { getLinkFromSearch } from '../libs/searchFuncs'

const HomeBanner = () => {
  const navigate = useNavigate()
  const appoloClient = useApolloClient()
  const inputRef = useRef<any>()
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const onInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.style.maxWidth = '480px'
    }
  }

  const onInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.style.maxWidth = '420px'
    }
  }

  const toast = useToast()
  const { appchain } = useParams()
  const onSearch = async () => {
    try {
      setIsSearching(true)
      let link = await getLinkFromSearch(keyword, appoloClient)
      if (link.trim() === '') {
        throw new Error('No result found')
      }
      await new Promise((resolve) => setTimeout(() => resolve(0), 500))
      navigate(`/${appchain}${link}`)
      setIsSearching(false)
    } catch (error) {
      setIsSearching(false)
      toast({
        position: 'top-right',
        title: 'Error',
        description: error.toString(),
        status: 'error',
      })
    }
  }

  return (
    <div
      style={{
        background: `#26262f url(${headerBg})`,
        backgroundSize: '1600px auto',
        backgroundPosition: 'center -110px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Center h="120px" pt="20px">
        <Text color="white" fontSize="5xl">
          Where Web3.0 Happens
        </Text>
      </Center>
      <Center h="180px" pb="100px">
        <Flex
          w="100%"
          maxW="420px"
          ref={inputRef}
          transition="max-width .3s ease"
        >
          <Input
            color="grey"
            background="white"
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch()
              }
            }}
            size="lg"
            flex="1"
            placeholder="Search by block, transaction id"
            borderRightRadius="0"
          />
          <Button
            colorScheme="primary"
            size="lg"
            borderLeftRadius="0"
            onClick={onSearch}
            isLoading={isSearching}
            disabled={isSearching}
          >
            Search
          </Button>
        </Flex>
      </Center>
    </div>
  )
}

export default HomeBanner

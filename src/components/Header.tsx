import { Container, Flex } from '@chakra-ui/layout'
import {
  Box,
  Button,
  HStack,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { BrowserView, isMobile } from 'react-device-detect'
import StyledLink from './StyledLink'

const NavLink = ({ title, to }) => {
  const location = useLocation()
  const pathArr = location.pathname.split('/')
  const isActive = '/' + pathArr[1] == to
  return (
    <StyledLink to={to}>
      <Button
        background="transparent"
        color={isActive ? 'white' : 'whiteAlpha.700'}
        _hover={{ background: 'transparent' }}
        _active={{ background: 'transparent', color: 'white' }}
      >
        {title}
      </Button>
    </StyledLink>
  )
}

const navs = [
  {
    title: 'Home',
    link: '',
  },
  {
    title: 'Accounts',
    link: 'accounts',
  },

  {
    title: 'Blocks',
    link: 'blocks',
  },
  {
    title: 'Transfers',
    link: 'transfers',
  },
  {
    title: 'Extrinsics',
    link: 'extrinsics',
  },
]

const Header = ({
  appchains,
  appchainInfo,
}: {
  appchains: any[]
  appchainInfo: any
}) => {
  return appchains && appchains.length > 0 ? (
    <div style={{ background: '#26262f' }}>
      <Container maxW="container.xl" h="88px">
        <Flex align="center" justify="center" h="100%">
          <Box p="2" pl="0">
            <StyledLink color="" to="">
              <Flex justify="space-between" align="center">
                <Image
                  style={{ display: 'inline-block' }}
                  boxSize="2.2rem"
                  src={
                    appchainInfo.appchain_metadata.fungible_token_metadata.icon
                  }
                  mr="10px"
                  htmlWidth={140}
                  alt="logo"
                />
                <Text
                  fontSize="lg"
                  color="gray.50"
                  style={{ textTransform: 'capitalize', fontWeight: 'bolder' }}
                >
                  {appchainInfo.appchain_id}
                </Text>
              </Flex>
            </StyledLink>
          </Box>
          <Spacer />
          <HStack
            spacing="5px"
            align="center"
            direction={'row'}
            display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}
          >
            {!isMobile &&
              navs.map((nav) => (
                <NavLink
                  key={nav.title}
                  title={nav.title}
                  to={nav.link ? `/${nav.link}` : ''}
                />
              ))}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="Black"
              >
                <Box>
                  <span>{appchainInfo.appchain_id}</span>
                </Box>
              </MenuButton>
              <MenuList bg="#262636" border="none">
                {appchains.map((appchain) => (
                  <Link
                    href={`/${appchain.appchain_id}`}
                    key={appchain.appchain_id}
                    _hover={{ textDecoration: 'none' }}
                  >
                    <MenuItem color="#fff" _focus={{ background: '#555' }}>
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={
                          appchain.appchain_metadata.fungible_token_metadata
                            .icon
                        }
                        alt={appchain.appchain_id}
                        mr="12px"
                      />
                      <span>{appchain.appchain_id}</span>
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          </HStack>
          <Box display={{ md: 'block', lg: 'none' }}>
            <Menu>
              <MenuButton
                colorScheme="white"
                as={IconButton}
                icon={<HamburgerIcon fontSize="2xl" />}
              />
              <MenuList>
                {navs.map((nav) => (
                  <MenuItem key={nav.title}>
                    <StyledLink to={nav.link ? `/${nav.link}` : ''} color="">
                      {nav.title}
                    </StyledLink>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </div>
  ) : null
}

export default Header

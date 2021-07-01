import { Container, Flex } from '@chakra-ui/layout';
import { Box, Button, HStack, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, Link, IconButton, MenuIcon } from '@chakra-ui/react';
import { ChevronDownIcon, ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from 'assets/octopus_logo_white.png';

const NavLink = ({ title, to }) => {
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const isActive = '/' + pathArr[1] == to;
  return (
    <Link as={RouterLink} to={to}>
      <Button background="transparent" color={isActive ? 'white' : 'whiteAlpha.700'}
        _hover={{ background: 'transparent' }}
        _active={{ background: 'transparent', color: 'white' }}>{title}</Button>
    </Link>
  );
} 

const Header = () => {
  return (
    <div style={{ background: '#26262f' }}>
      <Container maxW="container.xl" h="88px">
        <Flex align="center" justify="center" h="100%">
          <Box p="2" pl="0">
            <Image src={logo} htmlWidth={140} alt="logo" />
          </Box>
          <Spacer />
          <HStack spacing="5px" display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
            <NavLink title="Home" to="/home" />
            <NavLink title="Blocks" to="/blocks" />
            <NavLink title="Extrinsics" to="/extrinsics" />
            <Link href="https://testnet.oct.network" target="_blank">
              <Button background="transparent" color="whiteAlpha.700"
                _hover={{ background: 'transparent' }} rightIcon={<ExternalLinkIcon />}
                _active={{ background: 'transparent', color: 'white' }}>Testnet</Button>
            </Link>
            <Menu placement="bottom-end" offset={[0, 20]}>
              <MenuButton colorScheme="white" color="whiteAlpha.700" as={Button} rightIcon={<ChevronDownIcon />}>
                Appchains
              </MenuButton>
              <MenuList>
                <MenuItem>Easydeal</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Box display={{ md: 'block', lg: 'none' }}>
          <Menu>
            <MenuButton colorScheme="white" as={IconButton} icon={<HamburgerIcon fontSize="2xl" />} />
            <MenuList>
              <MenuItem>
                <Link as={RouterLink} to='/home'>Home</Link>
              </MenuItem>
              <MenuItem>
                <Link as={RouterLink} to='/home'>Blocks</Link>
              </MenuItem>
              <MenuItem>
                <Link as={RouterLink} to='/home'>Extrinsics</Link>
              </MenuItem>
            </MenuList>
          </Menu>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}

export default Header;
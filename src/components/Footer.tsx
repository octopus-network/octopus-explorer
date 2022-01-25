import { Container, Flex, Box, Text, HStack } from "@chakra-ui/layout";
import { IconButton, Icon, Link } from "@chakra-ui/react";
import { IoLogoGithub, IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <div style={{ background: "#26262f" }}>
      <Container maxW="container.xl" p={2}>
        <Flex align="center" justifyContent="space-between">
          <Box p={4}>
            <Text color="whiteAlpha.600" fontSize="sm">
              © 2022 Octopus Network -- All Rights Reserved
            </Text>
          </Box>
          <HStack>
            <Link href="https://github.com/octopus-network" target="_blank">
              <IconButton
                variant="link"
                aria-label="github"
                _hover={{ color: "whiteAlpha.800" }}
                icon={<Icon as={IoLogoGithub} boxSize={6} />}
              ></IconButton>
            </Link>
            <Link href="mailto:hi@oct.network">
              <IconButton
                variant="link"
                aria-label="github"
                _hover={{ color: "whiteAlpha.800" }}
                icon={<Icon as={IoMail} boxSize={6} />}
              ></IconButton>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </div>
  );
};

export default Footer;

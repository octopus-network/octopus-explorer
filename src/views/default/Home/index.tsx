import {
  Flex,
  Grid,
  GridItem,
  Button,
  Heading,
  HStack,
  Box,
  Text,
  Divider,
  Icon,
} from "@chakra-ui/react";
import {
  MdApps,
  MdSwapHoriz,
  MdAccountCircle,
  MdTrendingUp,
} from "react-icons/md";
import ExtrinsicsBox from "./ExtrinsicsBox";
import BlocksBox from "./BlocksBox";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import StyledLink from "components/StyledLink";

const GLOBAL_DATA_QUERY = gql`
  query QueryGlobalData {
    blocks {
      totalCount
    }
    extrinsics {
      totalCount
    }
    accounts {
      totalCount
    }
    systemTokenTransfers {
      totalCount
    }
  }
`;

const StateBox = ({ label, value, icon }) => {
  return (
    <Flex align="center" height="100%">
      <Box>
        <Icon as={icon} boxSize={6} color="primary.600" />
      </Box>
      <Flex
        ml={4}
        direction={isMobile ? "column" : "row"}
        align={isMobile ? "flex-start" : "center"}
        justify="space-between"
        flex={1}
      >
        <Text fontSize="sm" textColor="grey">
          {label}
        </Text>
        <Heading as="h6" size="sm">
          {value}
        </Heading>
      </Flex>
    </Flex>
  );
};

const Home = () => {
  const { data, startPolling, stopPolling } = useQuery(GLOBAL_DATA_QUERY);

  useEffect(() => {
    startPolling(6000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  return (
    <div>
      <Box borderRadius="lg" p={3} background="white" mt="-60px" boxShadow="sm">
        <Grid templateColumns="repeat(49, 1fr)">
          <GridItem colSpan={24}>
            <Grid templateRows="repeat(13, 1fr)" h="120px">
              <GridItem rowSpan={6}>
                <StateBox
                  label="Blocks"
                  icon={MdApps}
                  value={data?.blocks.totalCount}
                />
              </GridItem>
              <GridItem rowSpan={1} display="flex" alignItems="center">
                <Divider orientation="horizontal" />
              </GridItem>
              <GridItem rowSpan={6}>
                <StateBox
                  label="Accounts"
                  icon={MdAccountCircle}
                  value={data?.accounts.totalCount}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={1} display="flex" justifyContent="center">
            <Divider orientation="vertical" />
          </GridItem>
          <GridItem colSpan={24}>
            <Grid templateRows="repeat(13, 1fr)" h="120px">
              <GridItem rowSpan={6}>
                <StateBox
                  label="Extrinsics"
                  icon={MdTrendingUp}
                  value={data?.extrinsics.totalCount}
                />
              </GridItem>
              <GridItem rowSpan={1} display="flex" alignItems="center">
                <Divider orientation="horizontal" />
              </GridItem>
              <GridItem rowSpan={6}>
                <StateBox
                  label="Transfers"
                  icon={MdSwapHoriz}
                  value={data?.systemTokenTransfers.totalCount}
                />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
      <Grid gap={6} templateColumns="repeat(6, 1fr)" mt={4}>
        <GridItem colSpan={isMobile ? 6 : 3}>
          <Flex align="center" justify="space-between" pt={3} pb={4}>
            <HStack>
              <MdApps />
              <Heading as="h6" size="xs">
                Latest Blocks
              </Heading>
            </HStack>
            <StyledLink to={`/blocks`}>
              <Button colorScheme="primary" size="sm">
                All
              </Button>
            </StyledLink>
          </Flex>
          <BlocksBox />
        </GridItem>
        <GridItem colSpan={isMobile ? 6 : 3}>
          <Flex align="center" justify="space-between" pt={3} pb={4}>
            <HStack>
              <MdTrendingUp />
              <Heading as="h6" size="xs">
                Latest Extrinsics
              </Heading>
            </HStack>
            <StyledLink to={`/extrinsics`}>
              <Button colorScheme="primary" size="sm">
                All
              </Button>
            </StyledLink>
          </Flex>
          <ExtrinsicsBox />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Home;

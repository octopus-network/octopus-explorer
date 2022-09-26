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
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import SearchBox from "components/SearchBox";

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

const NotFound = () => {
  const { id, appchain } = useParams();
  const { data, startPolling, stopPolling } = useQuery(GLOBAL_DATA_QUERY);

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  return (
    <div>
      <Flex
        align="center"
        justify="center"
        style={{
          position: "absolute",
          top: "100px",
          bottom: "100px",
          left: "20px",
          right: "20px",
        }}
      >
        <div>
          <Text fontSize="6xl" color="secondary.400" align="center">
            404
          </Text>
          <Flex align="center" justify="center" mb={8}>
            <Text style={{ display: "inline-block" }} mr={2} color="gray">
              {id}
            </Text>
            <Text
              style={{ display: "inline-block" }}
              fontSize="2xl"
              color="secondary.600"
            >
              Not Found!
            </Text>
          </Flex>
          <div style={{ minWidth: "40%" }}>
            <Text color="secondary.600" align="center" mb={3}>
              You can try other options.
            </Text>
            <SearchBox></SearchBox>
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default NotFound;

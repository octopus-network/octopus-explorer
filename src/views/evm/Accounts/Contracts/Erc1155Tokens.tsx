import {
  IconButton,
  Flex,
  HStack,
  Icon,
  Heading,
  Box,
  Tab,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Link,
  Tag,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getNativeAmountHuman } from "../../../../libs/polkadotApi";
import CopyButton from "../../../../components/CopyButton";
import SearchBox from "../../../../components/SearchBox";
import StyledLink from "components/StyledLink";
import { MdApps } from "react-icons/md";
import { briefHex } from "libs/utils";
import { PAGE_SIZE, CONTRACT_ERC1155_TOKENS_QUERY } from "../queries";
import AccountTag from "components/AccountTag";

const Erc1155Tokens = ({ account }) => {
  const { id } = account;
  const [detail, setDetail] = useState<any>();
  const [erc1155TokensPage, setErc1155TokensPage] = useState(0);

  const contractErc1155TokensQuery = useQuery(CONTRACT_ERC1155_TOKENS_QUERY, {
    variables: {
      contractId: id,
      offset: erc1155TokensPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  useEffect(() => {
    contractErc1155TokensQuery.startPolling(30 * 1000);
    return () => {
      contractErc1155TokensQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (account && contractErc1155TokensQuery.data) {
      const accountDetail = {
        ...account,
        ...contractErc1155TokensQuery.data,
      };
      setDetail(accountDetail);
    } else {
      setDetail(null);
    }
  }, [contractErc1155TokensQuery]);

  return (
    <div>
      {!detail ? (
        <Box p={10} display="flex" alignItems="center" justifyContent="center">
          <Spinner />
        </Box>
      ) : (
        <Table>
          <Thead background="primary.50">
            <Tr>
              <Th>Id</Th>
              <Th>Token URI</Th>
              <Th>holders</Th>
              <Th>erc1155 Transfers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {detail.erc1155Tokens.nodes.map(
              ({ id, idInContract, uri, balances, erc1155Transfers }, idx) => (
                <Tr key={`transaction-${id}`}>
                  <Td>
                    <StyledLink to={`/erc1155_tokens/${id}`}>
                      {idInContract}
                    </StyledLink>
                  </Td>
                  <Td>
                    <Link href={uri} color="primary.600">
                      {uri}
                    </Link>
                  </Td>
                  <Td>{balances.totalCount}</Td>
                  <Td>{erc1155Transfers.totalCount}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      )}
      <Flex align="center" justify="space-between" mt={4}>
        <div style={{ flexGrow: 1 }} />
        <HStack>
          <IconButton
            aria-label="left"
            icon={<ChevronLeftIcon />}
            disabled={erc1155TokensPage <= 0}
            onClick={() => setErc1155TokensPage(erc1155TokensPage - 1)}
          />
          <Box>
            {erc1155TokensPage + 1} of{" "}
            {detail
              ? Math.ceil(detail?.erc1155Tokens.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              erc1155TokensPage + 1 >=
              Math.ceil(detail?.erc1155Tokens.totalCount / PAGE_SIZE)
            }
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setErc1155TokensPage(erc1155TokensPage + 1)}
          />
        </HStack>
      </Flex>
    </div>
  );
};

export default Erc1155Tokens;

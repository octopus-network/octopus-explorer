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
import { getNativeAmountHuman } from "../../../../libs/appchainUtils";
import CopyButton from "../../../../components/CopyButton";
import SearchBox from "../../../../components/SearchBox";
import StyledLink from "components/StyledLink";
import { MdApps } from "react-icons/md";
import { briefHex } from "libs/utils";
import { PAGE_SIZE, CONTRACT_ERC721_TOKENS_QUERY } from "../queries";
import AccountTag from "components/AccountTag";

const Erc721Tokens = ({ account }) => {
  const { id } = account;
  const [detail, setDetail] = useState<any>();
  const [erc721TokensPage, setErc721TokensPage] = useState(0);

  const contractErc721TokensQuery = useQuery(CONTRACT_ERC721_TOKENS_QUERY, {
    variables: {
      contractId: id,
      offset: erc721TokensPage * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    },
  });

  useEffect(() => {
    contractErc721TokensQuery.startPolling(30 * 1000);
    return () => {
      contractErc721TokensQuery.stopPolling();
    };
  }, []);

  useEffect(() => {
    if (account && contractErc721TokensQuery.data) {
      const accountDetail = {
        ...account,
        ...contractErc721TokensQuery.data,
      };
      setDetail(accountDetail);
    } else {
      setDetail(null);
    }
  }, [contractErc721TokensQuery]);

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
              <Th>erc721 Transfers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {detail.erc721Tokens.nodes.map(
              (
                { id, idInContract, tokenURI, balances, erc721Transfers },
                idx
              ) => (
                <Tr key={`transaction-${id}`}>
                  <Td>
                    <StyledLink to={`/erc721_tokens/${id}`}>
                      {idInContract}
                    </StyledLink>
                  </Td>
                  <Td>
                    <Link href={tokenURI} color="primary.600">
                      {tokenURI}
                    </Link>
                  </Td>
                  <Td>{balances.totalCount}</Td>
                  <Td>{erc721Transfers.totalCount}</Td>
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
            disabled={erc721TokensPage <= 0}
            onClick={() => setErc721TokensPage(erc721TokensPage - 1)}
          />
          <Box>
            {erc721TokensPage + 1} of{" "}
            {detail
              ? Math.ceil(detail?.erc721Tokens.totalCount / PAGE_SIZE)
              : 1}
          </Box>
          <IconButton
            disabled={
              erc721TokensPage + 1 >=
              Math.ceil(detail?.erc721Tokens.totalCount / PAGE_SIZE)
            }
            aria-label="left"
            icon={<ChevronRightIcon />}
            onClick={() => setErc721TokensPage(erc721TokensPage + 1)}
          />
        </HStack>
      </Flex>
    </div>
  );
};

export default Erc721Tokens;

import { ReactComponent as BanknoteIcon } from "@assets/icons/banknote.svg";
import { ReactComponent as CardIcon } from "@assets/icons/credit-card-simple.svg";
import { ReactComponent as MoreIcon } from "@assets/icons/more-horizontal.svg";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Timeline from "@ui/Timeline/Timeline";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { colors } from "../../../chakra-overrides/colors";
import FakeLoader from "../../../ui/FakeLoader/FakeLoader";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";
import { ActionAlert } from "./ActionAlert";
import { historyData, householdData } from "./data";

const getConfig = (state: string | null) => {
  if (state === "done") {
    return {
      description: {
        title: "PHASE 1 - ELIGIBILITY",
        subtitle: "CIVIL SERVANT REQUESTS TO ASSIGN THE CANDIDATE",
      },
      nextStep: "../info?done=true",
      previousStep: "../candidate-list?state=submitted",
    };
  }
  if (state === "scheduling") {
    return {
      description: {
        title: "PHASE 2 - ENROLMENT",
        subtitle: "CIVIL SERVANT SCHEDULES THE PAYMENTS",
      },
      nextStep: "../active-program",
      previousStep: "../candidate-list?state=scheduling",
    };
  }
  return {
    description: {
      title: "PHASE 1 - ELIGIBILITY",
      subtitle: "CIVIL SERVANT REVIEWS THE CANDIDATE",
    },
    nextStep: "../authorise-citizen",
    previousStep: "../candidate-list",
  };
};

export default function ReviewCandidate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, dispatch } = useContext(SimulationContext);
  const [citizen] = useState<any>();
  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      userAuthorized: true,
      ...getConfig(searchParams.get("state")),
    });
  }, []);

  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);
  useEffect(() => {
    if (searchParams.get("state") === "scheduling") {
      setActiveBuildingBlocks({
        [BUILDING_BLOCK.CONSENT]: false,
        [BUILDING_BLOCK.AUTHENTICATION]: false,
        [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
        [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
        [BUILDING_BLOCK.MESSAGING]: false,
        [BUILDING_BLOCK.PAYMENT]: true,
        [BUILDING_BLOCK.REGISTRATION]: true,
        [BUILDING_BLOCK.SCHEDULING]: true,
        [BUILDING_BLOCK.WORKFLOW]: true,
      });
    } else {
      setActiveBuildingBlocks({
        [BUILDING_BLOCK.CONSENT]: false,
        [BUILDING_BLOCK.AUTHENTICATION]: false,
        [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
        [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
        [BUILDING_BLOCK.MESSAGING]: false,
        [BUILDING_BLOCK.PAYMENT]: true,
        [BUILDING_BLOCK.REGISTRATION]: false,
        [BUILDING_BLOCK.SCHEDULING]: false,
        [BUILDING_BLOCK.WORKFLOW]: true,
      });
    }
  }, []);

  return (
    <FakeLoader
      label="Changing perspective to civil servant"
      override={searchParams.get("state") === "scheduling"}
    >
      <Flex w="100%" direction="column" gap="60px">
        <Flex direction="column" gap="20px">
          <Flex justifyContent="space-between">
            <Flex alignItems="center" gap="12px">
              <Heading variant="h2" fontSize="24px">
                Candidate Info
              </Heading>
              <Tag colorScheme="info">Action Required</Tag>
            </Flex>
          </Flex>
          <ActionAlert state={searchParams.get("state")} />
          <Box>
            <Heading variant="h3" fontSize="18px">
              Personal Information
            </Heading>
            <Heading variant="h3" fontSize="18px" color="black.500">
              Social ID: {citizen?.socialCode}
            </Heading>
          </Box>
          <Grid
            w="100%"
            gridTemplateRows="repeat(4, min-content)"
            gridTemplateColumns={{ sm: "1fr", lg: "repeat(2, 1fr)" }}
            gap="23px"
          >
            <Box>
              <Text fontWeight="600">Name</Text>
              <Text>{citizen?.fullName}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Occupation</Text>
              <Text>{citizen?.occupation}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Personal ID Code</Text>
              <Text>{citizen?.idCode}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Home Address</Text>
              <Text>{citizen?.fullAddress}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">E-mail</Text>
              <Text color="gray">{citizen?.email}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Phone Number</Text>
              <Text color="gray">{citizen?.phoneNumber}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Date of Birth</Text>
              <Text>
                {citizen?.dateOfBirth
                  ? new Date(citizen?.dateOfBirth).toLocaleString("et", {
                      day: "2-digit",
                      year: "numeric",
                      month: "2-digit",
                    })
                  : ""}
              </Text>
            </Box>
          </Grid>
          <Flex direction="column" gap="30px">
            <Flex direction={{ sm: "column", lg: "row" }}>
              <Flex w="100%" direction="column" gap="12px">
                <Heading variant="h3" fontSize="18px">
                  Household needs
                </Heading>
                <Flex flexWrap="wrap" gap="4px">
                  {householdData
                    .flatMap((person) => person.needs)
                    .map((need) => {
                      return (
                        <Tag
                          p="6px 12px"
                          mb="12px"
                          colorScheme="gray"
                          variant="outline"
                          key={need}
                        >
                          <TagLabel>{need}</TagLabel>
                        </Tag>
                      );
                    })}
                </Flex>
              </Flex>
              <Flex w="100%" direction="column" gap="12px">
                <Heading variant="h3" fontSize="18px">
                  Recommended Benefit Package
                </Heading>
                {!searchParams.get("state") ? (
                  <Text>
                    Additional information required to decide eligibility and
                    recommend benefit packages
                  </Text>
                ) : (
                  <Flex gap="20px">
                    <Flex
                      h="56px"
                      w="56px"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="8px"
                      border="2px solid var(--chakra-colors-secondary-1000)"
                    >
                      <BanknoteIcon color="var(--chakra-colors-secondary-1000)" />
                    </Flex>
                    <Text>
                      Monthly Package <br /> Monthly Cash help for families in
                      need.
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
            {searchParams.get("state") === "scheduling" && (
              <Box>
                <Heading variant="h3" fontSize="18px" mb="12px">
                  Selected Payment Method
                </Heading>
                <Flex gap="20px">
                  <Flex
                    h="56px"
                    w="56px"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="8px"
                    border="2px solid var(--chakra-colors-secondary-1000)"
                  >
                    <CardIcon color="var(--chakra-colors-secondary-1000)" />
                  </Flex>
                  <Box>
                    <Text>Bank Payment</Text>
                    <Text size="sm" fontWeight="500">
                      Direct cash transfer to beneficaries bank account.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" gap="20px">
          <Heading variant="h3" fontSize="18px">
            Household information
          </Heading>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead
                backgroundColor={colors.secondary[800]}
                color={colors.secondary[0]}
              >
                <Tr>
                  <Th color={colors.secondary[0]}>National ID</Th>
                  <Th color={colors.secondary[0]}>Name</Th>
                  <Th color={colors.secondary[0]}>Relation</Th>
                  <Th color={colors.secondary[0]}>Date of Birth</Th>
                  <Th color={colors.secondary[0]}>Individual Needs</Th>
                  <Th>
                    <IconButton
                      borderRadius="100%"
                      icon={<AddIcon />}
                      aria-label="asd"
                      size="xs"
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {householdData.map((person) => {
                  return (
                    <Tr key={person.personalCode}>
                      <Td>{person.personalCode}</Td>
                      <Td>{person.name}</Td>
                      <Td>{person.relation}</Td>
                      <Td>{person.dateOfBirth}</Td>
                      <Td>
                        <Flex wrap="wrap" gap="4px">
                          {person.needs.map((need) => (
                            <Tag
                              p="6px 12px"
                              variant="outline"
                              colorScheme="gray"
                              key={need}
                            >
                              <TagLabel>{need}</TagLabel>
                            </Tag>
                          ))}
                        </Flex>
                      </Td>
                      <Td>
                        <MoreIcon />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Box>
          <Heading variant="h3" fontSize="18px" mb="20px">
            Bank Account Information
          </Heading>
          <Flex justifyContent="space-between">
            <Box>
              <Text fontWeight="600">Bank Account Owner Name</Text>
              <Text>Thomas Anderson</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Bank Name</Text>
              <Text>Sunshine Bank</Text>
            </Box>
            <Box>
              <Text fontWeight="600">
                International Bank Account Number (IBAN)
              </Text>
              <Text>AA02300209000106531065</Text>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Heading variant="h3" size="sm" mb="20px">
            Bank Account Information
          </Heading>
          <Flex flexDirection="column" gap="20px">
            {historyData.map((historyItem) => (
              <Timeline key={historyItem.title} {...historyItem}></Timeline>
            ))}
          </Flex>
        </Box>
      </Flex>
    </FakeLoader>
  );
}

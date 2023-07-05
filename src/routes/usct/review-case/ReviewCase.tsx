import { ReactComponent as BanknoteIcon } from "@assets/icons/banknote.svg";
import { ReactComponent as ChatIcon } from "@assets/icons/chat.svg";
import { ReactComponent as ArrowIcon } from "@assets/icons/chevron-right.svg";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Alert from "@ui/Alert/Alert";
import Timeline from "@ui/Timeline/Timeline";
import { useContext, useEffect, useState } from "react";
import ChatMessage from "../../../ui/ChatMessage/ChatMessage";
import TextEditor from "../../../ui/TextEditor/TextEditor";
import BankInformation from "../personal/BankInformation";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";

const householdData = [
  {
    name: "Ms Lorem Ipsum",
    personalCode: "12345678910",
    relation: "Wife",
    dateOfBirth: "12.12.1975",
    reason: "Data",
    needs: [],
  },
  {
    name: "Ms Lorem Ipsum",
    personalCode: "12345678910",
    relation: "Wife",
    dateOfBirth: "12.12.1975",
    reason: "Data",
    needs: ["Hearing Support", "Special Support"],
  },
  {
    name: "Ms Lorem Ipsum",
    personalCode: "12345678910",
    relation: "Wife",
    dateOfBirth: "12.12.1975",
    reason: "Data",
    needs: ["Child Care", "Financial Security"],
  },
  {
    name: "Ms Lorem Ipsum",
    personalCode: "12345678910",
    relation: "Wife",
    dateOfBirth: "12.12.1975",
    reason: "Data",
    needs: ["Food", "Health Care", "Education"],
  },
];

const conversation = [
  {
    id: "hdfhdrf5",
    timestamp: 1678891185842,
    content: "hello i need cash quick",
    user: "Shady Man",
  },
  {
    id: "sy43y3s45s35",
    timestamp: 1678891285842,
    content: "im sorry, get a better job?",
    user: "GovStack Person",
  },
  {
    id: "1h3g13f13f",
    timestamp: 1678891385842,
    content: "i want to talk to your manager",
    user: "Shady Man",
  },
  {
    id: "srtsrts315135",
    timestamp: 1678891485842,
    content: "hello i am the manager",
    user: "GovStack Person",
  },
  {
    id: "13gg131e13e",
    timestamp: 1678891585842,
    content: "i want money",
    user: "Shady Man",
  },
  {
    id: "1351035askpdk",
    timestamp: 1678891685842,
    content: "no",
    user: "GovStack Person",
  },
];

const caseHistoryEvents = [
  {
    name: "Case opened",
    date: "23.04.2017",
    info: "#97654321",
    completed: true,
  },
  {
    name: "Informing the Beneficary",
    date: "23.04.2017",
    info: "#97654321",
    completed: true,
  },
];

export default function ReviewCase() {
  const [isInformed, setIsInformed] = useState(false);
  const { state, dispatch } = useContext(SimulationContext);
  const [citizen, setCitizen] = useState<any | null>(null);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      description: {
        title: "PHASE 3 - PAYMENT",
        subtitle: "CIVIL SERVANT INFORMS THE BENEFICIARY ABOUT THEIR QUESTION",
      },
      nextStep: "../active-program?state=done",
      previousStep: "../case-list",
      userAuthorized: true,
    });
  }, []);

  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.AUTHENTICATION]: false,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: true,
      [BUILDING_BLOCK.PAYMENT]: true,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: true,
      [BUILDING_BLOCK.SECURITY]: false,
    });
  }, []);

  return (
    <Flex direction="column">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        gap="20px"
        mb="20px"
      >
        <Heading fontSize="24px">Case #3779394</Heading>
        <ButtonGroup variant="ghost" colorScheme="black">
          <Button>Screen</Button>
          <Button>Contact</Button>
          <Button>Flag</Button>
          <Button>Request</Button>
        </ButtonGroup>
      </Flex>
      <SimpleGrid columns={2} spacing="20px" marginBottom="60px">
        <Flex direction="column">
          <Heading fontSize="16px">Status</Heading>
          <Text>Action Required</Text>
        </Flex>
        <Flex direction="column">
          <Heading fontSize="16px">Reason</Heading>
          <Text>Payment Not Received</Text>
        </Flex>
        <Flex direction="column">
          <Heading fontSize="16px">Social ID Code</Heading>
          <Text>123456789</Text>
        </Flex>
        <Flex direction="column">
          <Heading fontSize="16px">Date Issued</Heading>
          <Text>12.12.2022</Text>
        </Flex>
      </SimpleGrid>
      <Flex direction="column" gap="20px" mb="20px">
        <Heading fontSize="18px">Quick Actions</Heading>
        <Text>
          Quick actions steps are automatically created based on the "reason"
          the beneficiary selected. Please control beneficiaries message before
          using these actions.
        </Text>
        <Alert
          icon={<ChatIcon />}
          content={
            <Text>
              Automatic information to the payment provider <br /> regarding
              payment not received.
            </Text>
          }
          actions={
            <Flex direction="column" gap="12px">
              <InputGroup color="secondary.600">
                <InputLeftElement>
                  <ArrowIcon />
                </InputLeftElement>
                <Input placeholder="#37 - Package Information" />
              </InputGroup>
              <Button colorScheme="admin">Send Message</Button>
            </Flex>
          }
        ></Alert>
      </Flex>
      <Flex
        backgroundColor="#fafafa"
        ml="-60px"
        mr="-60px"
        pl="60px"
        pr="60px"
        pt="30px"
        pb="30px"
        mb="30px"
      >
        <Tabs w="100%" isFitted variant="enclosed">
          <TabList>
            <Tab>Conversation</Tab>
            <Tab>Beneficiary Info</Tab>
            {/* <Tab>Direct the Case</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel pl="0" pr="0" pt="20px">
              <Flex direction="column" gap="20px" mb="20px">
                {conversation.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </Flex>
              <TextEditor />
            </TabPanel>
            <TabPanel padding="0" pt="20px">
              <Flex direction="column" gap="20px">
                <Grid
                  w="100%"
                  gridTemplateRows="repeat(4, min-content)"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap="20px"
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
                    <Text fontWeight="600">Phone Number</Text>
                    <Text>{citizen?.phoneNumber}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="600">E-mail</Text>
                    <Text>{citizen?.email}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="600">Date of Birth</Text>
                    <Text>
                      {citizen?.dateOfBirth
                        ? new Date(citizen?.dateOfBirth).toLocaleDateString(
                            "et",
                            {
                              day: "2-digit",
                              year: "numeric",
                              month: "2-digit",
                            }
                          )
                        : ""}
                    </Text>
                  </Box>
                </Grid>
                <Flex gap="20px">
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
                              key={need}
                              p="6px 12px"
                              mb="12px"
                              variant="outline"
                            >
                              <TagLabel color="secondary.1000">{need}</TagLabel>
                            </Tag>
                          );
                        })}
                    </Flex>
                  </Flex>
                  <Flex w="100%" direction="column" gap="12px">
                    <Heading variant="h3" fontSize="18px">
                      Assigned Benefit Package
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
                        <BanknoteIcon color="var(--chakra-colors-secondary-1000)" />
                      </Flex>
                      <Text>
                        Monthly Package <br /> Monthly Cash help for families in
                        need.
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Flex direction="column" gap="8px">
        <Heading fontSize="16px">Case Attachments</Heading>
        <TableContainer mb="20px">
          <Table>
            <Thead>
              <Tr>
                <Th>File name</Th>
                <Th>File type</Th>
                <Th>Description</Th>
                <Th>Uploaded</Th>
                <Th>Source</Th>
                <Th>icon</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>None</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Box mb="60px">
        <BankInformation />
      </Box>
      <Heading size="sm" mb="20px">
        Case History
      </Heading>
      <Timeline
        icon={<></>}
        title="Case opened"
        events={caseHistoryEvents}
      ></Timeline>
    </Flex>
  );
}

import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ReactComponent as HatIcon } from "../../../assets/icons/hat.svg";
import { EUserType, SimulationContext } from "../USCT";

export default function CaseManagement() {
  const { state, dispatch } = useContext(SimulationContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      description: {
        title: searchParams.get("done") ? "PHASE 3 - PAYMENT" : "PHASE 1 - ELIGIBILITY",
        subtitle: searchParams.get("done") ? "CIVIL SERVANT REVIEWS BENEFICIARY CASES" : "CIVIL SERVANT CHECKS ONGOING RESPONSIBILITES",
      },
      progress: searchParams.get("done") ? 75 : 5,
      userAuthorized: true,
    });
  }, []);

  return (
    <Flex gap="60px" mt="60px" direction="column">
      <Box>
        <Heading variant="h1">
          Unconditional Social <br /> Cash Transfer Program
        </Heading>
      </Box>
      <Flex direction="column" gap="20px">
        <Heading>Hello, Lorem Ipsum!</Heading>
        <Text>You have 1 candidates, 0 cases up for review today!</Text>
        <Flex gap="20px">
          <Flex direction="column" gap="16px">
            <Flex
              w="100%"
              padding="28px 38px"
              gap="35px"
              border="2px solid black"
              borderRadius="8px"
            >
              <Flex
                w="80px"
                h="80px"
                borderRadius="100%"
                backgroundColor="black.900"
                color="black.0"
                alignItems="center"
                justifyContent="center"
                flexShrink="0"
              >
                <Heading color="black.0">{searchParams.get("done") ? 0 : 1}</Heading>
              </Flex>
              <Flex gap="14px" direction="column">
                <Text>Assigned Candidates</Text>
                <Text>Candidate assigned to you for your review</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="flex-end">
              <Button
                colorScheme="admin"
                as={Link}
                to="../candidate-list"
                variant="solid"
              >
                Review Candidates
              </Button>
            </Flex>
          </Flex>
          <Flex direction="column" gap="16px">
            <Flex
              w="100%"
              padding="28px 38px"
              gap="35px"
              border="2px solid black"
              borderRadius="8px"
            >
              <Flex
                w="80px"
                h="80px"
                borderRadius="100%"
                backgroundColor="black.0"
                color="black.900"
                border="1px solid black"
                alignItems="center"
                justifyContent="center"
                flexShrink="0"
              >
                <Heading>{searchParams.get("done") ? 1 : 0}</Heading>
              </Flex>
              <Flex gap="14px" direction="column">
                <Text>Beneficiary Cases</Text>
                <Text>Open Cases assigned to you for your review</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="flex-end">
              <Button
                colorScheme="admin"
                as={Link}
                to="../case-list"
                variant="outline"
                borderWidth="2px"
              >
                Review Cases
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Box w="50%">
          <Heading mb="20px">Program Description</Heading>
          <Text>
            Unconditional Social Cash Transfer helps families meet their basic
            needs for well-being and safety and serves as their path to
            self-sufficiency. Unconditional Social Cash Transfer program
            provides temporary cash benefits and supportive services to the
            neediest families.
          </Text>
        </Box>
        <Flex
          w="50%"
          textAlign="right"
          direction="column"
          alignItems="flex-end"
          gap="20px"
        >
          <Heading>Benefit Packages</Heading>
          <Flex gap="20px">
            <Box>
              <Text fontWeight="600" fontSize="16px">
                Monthly Package
              </Text>
              <Text>Monthly Cash help for families in need</Text>
            </Box>
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
          </Flex>
          <Flex gap="20px">
            <Box>
              <Text fontWeight="600" fontSize="16px">
                Short-Term Package
              </Text>
              <Text>One-time Cash help for families in need</Text>
            </Box>
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
          </Flex>
          <Flex gap="20px">
            <Box>
              <Text fontWeight="600" fontSize="16px">
                Special Package
              </Text>
              <Text>Tailored Package based on family needs</Text>
            </Box>
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" gap="20px">
        <Heading>Program Overview</Heading>
        <Flex gap="24px">
          <Flex
            w="100%"
            border="2px solid black"
            borderRadius="8px"
            minH="200px"
            direction="column"
          >
            <Box h="60px" position="relative" w="100%">
              <Flex
                position="absolute"
                left="0"
                top="0"
                w="60px"
                h="60px"
                borderBottomRightRadius="35px"
                borderColor="black"
                borderBottomWidth="2px"
                borderRightWidth="2px"
              >
                <Box position="relative" left="12px" top="12px">
                  <HatIcon stroke="black" />
                </Box>
              </Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                h="100%"
                w="100%"
                textAlign="center"
              >
                <Text>Budget</Text>
              </Flex>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Heading fontSize="24px">$ 160 324.00</Heading>
              <Text>funded until 2023/12</Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            border="2px solid black"
            borderRadius="8px"
            minH="200px"
            direction="column"
          >
            <Box h="60px" position="relative" w="100%">
              <Flex
                position="absolute"
                left="0"
                top="0"
                w="60px"
                h="60px"
                borderBottomRightRadius="35px"
                borderColor="black"
                borderBottomWidth="2px"
                borderRightWidth="2px"
              >
                <Box position="relative" left="12px" top="12px">
                  <HatIcon stroke="black" />
                </Box>
              </Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                h="100%"
                w="100%"
                textAlign="center"
              >
                <Text>Budget</Text>
              </Flex>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Heading fontSize="24px">$ 160 324.00</Heading>
              <Text>funded until 2023/12</Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            border="2px solid black"
            borderRadius="8px"
            minH="200px"
            direction="column"
          >
            <Box h="60px" position="relative" w="100%">
              <Flex
                position="absolute"
                left="0"
                top="0"
                w="60px"
                h="60px"
                borderBottomRightRadius="35px"
                borderColor="black"
                borderBottomWidth="2px"
                borderRightWidth="2px"
              >
                <Box position="relative" left="12px" top="12px">
                  <HatIcon stroke="black" />
                </Box>
              </Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                h="100%"
                w="100%"
                textAlign="center"
              >
                <Text>Budget</Text>
              </Flex>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Heading fontSize="24px">$ 160 324.00</Heading>
              <Text>funded until 2023/12</Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            border="2px solid black"
            borderRadius="8px"
            minH="200px"
            direction="column"
          >
            <Box h="60px" position="relative" w="100%">
              <Flex
                position="absolute"
                left="0"
                top="0"
                w="60px"
                h="60px"
                borderBottomRightRadius="35px"
                borderColor="black"
                borderBottomWidth="2px"
                borderRightWidth="2px"
              >
                <Box position="relative" left="12px" top="12px">
                  <HatIcon stroke="black" />
                </Box>
              </Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                h="100%"
                w="100%"
                textAlign="center"
              >
                <Text>Budget</Text>
              </Flex>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Heading fontSize="24px">$ 160 324.00</Heading>
              <Text>funded until 2023/12</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Box w="50%">
          <Heading mb="20px">Eligibility Conditions</Heading>
          <Text>
            The eligibility criteria for an unconditional cash transfer service
            can include:
          </Text>
          <UnorderedList>
            <ListItem>Population size or household size</ListItem>
            <ListItem>Income level or financial need</ListItem>
            <ListItem>Residency and/or nationality</ListItem>
            <ListItem>Possession of a valid identification document</ListItem>
            <ListItem>
              Meeting predetermined criteria such as gender, age, or disability
              status
            </ListItem>
          </UnorderedList>
        </Box>
        <Flex
          w="50%"
          textAlign="right"
          direction="column"
          alignItems="flex-end"
          gap="20px"
        >
          <Heading>Benefit Packages</Heading>
          <Flex gap="20px">
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
            <Flex
              w="57px"
              h="57px"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
              border="2px solid black"
            >
              <HatIcon stroke="black" />
            </Flex>
          </Flex>
          <Box>
            <Text>Unemployment Allowance Programs</Text>
            <Text>Education Support Programs</Text>
            <Text>Social Safety Net Programs</Text>
            <Text>Food Support Programs</Text>
            <Text>Public Works Programs</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

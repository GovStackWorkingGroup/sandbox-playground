import { ReactComponent as CalendarIcon } from '@assets/icons/calendar.svg';
import { ReactComponent as GitCompareIcon } from '@assets/icons/git-compare.svg';
import { ReactComponent as HeartShakeIcon } from '@assets/icons/heartshake.svg';
import { ReactComponent as PigIcon } from '@assets/icons/pig.svg';
import { ReactComponent as UsersIcon } from '@assets/icons/users.svg';
import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import IconCard from '@ui/IconCard/IconCard';
import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { colors } from '../../../chakra-overrides/colors';
import FakeLoader from '../../../ui/FakeLoader/FakeLoader';
import Tooltip from '../../../ui/Tooltip/Tooltip';
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from '../USCT';
import { BUILDING_BLOCK } from '../utils';

const getConfig = (state: string | null) => {
  switch (state) {
    case 'done':
      return {
        description: {
          title: 'CIVIL SERVANT REVIEWS BENEFICIARY CASES',
          subtitle: 'PRIMARY TASK',
        },
        previousStep: '../new-conversation',
        nextStep: '../case-list',
      };
    case 'submitted':
      return {
        description: {
          title: '',
          subtitle: '',
        },
        previousStep: '../personal?done=true',
        nextStep: '../candidate-list?state=submitted',
      };
    default:
      return {
        description: {
          title: 'CIVIL SERVANT REVIEWS ASSIGNED CANDIDATES',
          subtitle: 'PRIMARY TASK',
        },
        previousStep: '../case-management',
        nextStep: '../candidate-list',
      };
  }
};

export default function CaseManagement() {
  const { state, dispatch } = useContext(SimulationContext);
  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch({
      type: 'SET_ALL',
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      userAuthorized: true,
      ...getConfig(searchParams.get('state')),
    });
  }, [searchParams]);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.AUTHENTICATION]: false,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: false,
      [BUILDING_BLOCK.PAYMENT]: false,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: true,
    });
  }, []);

  return (
    <FakeLoader
      label="CHANGING PERSPECTIVE TO CIVIL SERVANT"
      override={
        searchParams.get('state') === 'submitted' ||
        searchParams.get('state') === 'done'
      }
    >
      <Flex gap="60px" mt="60px" direction="column">
        <Box>
          <Heading variant="h1">
            Unconditional Social <br /> Cash Transfer Program
          </Heading>
        </Box>
        <Flex direction="column" gap="20px">
          <Heading>Hello, Lorem Ipsum!</Heading>
          <Text>You have 1 candidates, 0 cases up for review today!</Text>
          <Flex gap="20px" direction={{ sm: 'column', xl: 'row' }}>
            <Tooltip
              display="flex"
              letter="A"
              letterPosition="top"
              flexDirection="column"
              gap="16px"
            >
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
                  backgroundColor={colors.secondary[1000]}
                  color={colors.secondary[0]}
                  alignItems="center"
                  justifyContent="center"
                  flexShrink="0"
                >
                  <Heading color={colors.secondary[0]}>
                    {searchParams.get('state') === 'done' ? 0 : 1}
                  </Heading>
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
            </Tooltip>
            <Tooltip
              letter="B"
              letterPosition="top"
              display="flex"
              flexDirection="column"
              gap="16px"
            >
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
                  backgroundColor={colors.secondary[0]}
                  color="secondary.1000"
                  border="1px solid black"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink="0"
                >
                  <Heading>
                    {searchParams.get('state') === 'done' ? 1 : 0}
                  </Heading>
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
            </Tooltip>
          </Flex>
        </Flex>
        <Tooltip letter="C" letterPosition="top">
          <Flex direction={{ sm: 'column', xl: 'row' }} marginBottom="60px">
            <Box w="100%" marginBottom={{ sm: '60px', xl: 0 }}>
              <Heading mb="20px">Program Description</Heading>
              <Text>
                Unconditional Social Cash Transfer helps families meet their
                basic needs for well-being and safety and serves as their path
                to self-sufficiency. Unconditional Social Cash Transfer program
                provides temporary cash benefits and supportive services to the
                neediest families.
              </Text>
            </Box>
            <Flex
              w="100%"
              textAlign={{ sm: 'left', xl: 'right' }}
              direction="column"
              alignItems={{ sm: 'flex-start', xl: 'flex-end' }}
              gap="20px"
            >
              <Heading>Benefit Packages</Heading>
              <Flex gap="20px" direction={{ sm: 'row-reverse', xl: 'row' }}>
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
                  <CalendarIcon stroke="black" />
                </Flex>
              </Flex>
              <Flex gap="20px" direction={{ sm: 'row-reverse', xl: 'row' }}>
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
                  <PigIcon stroke="black" />
                </Flex>
              </Flex>
              <Flex gap="20px" direction={{ sm: 'row-reverse', xl: 'row' }}>
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
                  <HeartShakeIcon stroke="black" />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex gap="60px" direction={{ sm: 'column', xl: 'row' }}>
            <Box w="100%">
              <Heading mb="20px">Eligibility Conditions</Heading>
              <Text>
                The eligibility criteria for an unconditional cash transfer
                service can include:
              </Text>
              <UnorderedList>
                <ListItem>Population size or household size</ListItem>
                <ListItem>Income level or financial need</ListItem>
                <ListItem>Residency and/or nationality</ListItem>
                <ListItem>
                  Possession of a valid identification document
                </ListItem>
                <ListItem>
                  Meeting predetermined criteria such as gender, age, or
                  disability status
                </ListItem>
              </UnorderedList>
            </Box>
            <Box w="100%">
              <Heading mb="20px" textAlign={{ sm: 'left', xl: 'right' }}>
                Program Overview
              </Heading>
              <Flex
                gap={{ sm: '2px', lg: '24px' }}
                flexDirection={{ sm: 'column', lg: 'row' }}
              >
                <IconCard
                  icon={<UsersIcon stroke="black" />}
                  title="Beneficiaries"
                >
                  <Heading fontSize="24px" marginTop="5px">
                    2212
                  </Heading>
                  <Text marginBottom="5px">Households</Text>
                  <Heading fontSize="24px">10105</Heading>
                  <Text>Individuals</Text>
                </IconCard>
                <IconCard
                  icon={<GitCompareIcon stroke="black" />}
                  title="Active Cases"
                >
                  <Heading fontSize="36px" marginTop="24px">
                    32
                  </Heading>
                  <Text>Active Cases</Text>
                </IconCard>
              </Flex>
            </Box>
          </Flex>
        </Tooltip>
      </Flex>
    </FakeLoader>
  );
}

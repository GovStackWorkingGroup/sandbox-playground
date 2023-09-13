import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { Avatar, Box, Button, Flex, Grid, Heading, Spacer, Text } from '@chakra-ui/react';
import { DriverPOC } from '../../driver-poc/types';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../driver-poc/utils/token';

export default function PersonalInformation({
  newCandidate,
  person,
  simulation,
  reviewed,
}: {
  newCandidate?: boolean;
  person: DriverPOC.Person | null;
  simulation?: boolean;
  reviewed?: boolean;
}) {
const navigate = useNavigate();
const id = useParams<{ id: string }>();
const isRegistryAdministrator = getRole() === "ROLE_REGISTRY_ADMINISTRATION";
  // const SimulationIcon = reviewed ? YisIcon : FileWarningIcon;

  return (
    <Flex gap="24px" direction="column">
      <Flex>
          {(newCandidate)?(<Heading mb="40px">New Candidate</Heading>):(<Heading fontSize="18px">Candidate Information</Heading>)}
          <Spacer/>
          {(isRegistryAdministrator && !newCandidate)?(
          <Button onClick={() => navigate(`/driver-poc/candidate/edit/personalInformation/${id.id}`, {state: {newCandidate: false}})} variant="outline" colorScheme="admin" w="180px" leftIcon={<EditIcon />}>
            Edit
          </Button>
          ):""
        }
      </Flex>
      <Flex gap="40px" direction={{ base: 'column', xl: 'row' }}>
        <Avatar
          borderRadius="8px"
          maxH="254px"
          maxW="192px"
          width="100%"
          height="auto"
        />
        <Grid
          w="100%"
          gridTemplateRows="repeat(4, min-content)"
          gridTemplateColumns={{ sm: 'repeat(2, 1fr)' }}
          gap="20px"
        >
          <Box>
            <Text fontWeight="600">Name</Text>
            <Text>{`${person?.firstName} ${person?.lastName}`}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Date of Birth</Text>
            <Text>{person?.dateOfBirth}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Personal ID Code</Text>
            <Text>{person?.personalIdCode}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Occupation</Text>
            <Text>{person?.occupation}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Region / District</Text>
            <Text>{person?.region}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Municipality</Text>
            <Text>{person?.municipality}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Home Address</Text>
            <Text>{person?.homeAddress}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">ZIP Code</Text>
            <Text>{person?.zipCode}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Phone Number</Text>
            <Text>{person?.phoneNumber}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Email Address</Text>
            <Text>{person?.email}</Text>
          </Box>
        </Grid>
      </Flex>
    </Flex>
  );
}

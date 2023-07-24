import { ReactComponent as FileWarningIcon } from '@assets/icons/file-warning.svg';
import { ReactComponent as YisIcon } from '@assets/icons/yis-circle.svg';
import { Avatar, Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/react';
import { DriverPOC } from '../../driver-poc/types';

export default function PersonalInformation({
  person,
  simulation,
  reviewed,
}: {
  person: DriverPOC.Person | null;
  simulation?: boolean;
  reviewed?: boolean;
}) {
  const SimulationIcon = reviewed ? YisIcon : FileWarningIcon;

  return (
    <Flex gap="24px" direction="column">
      <Heading fontSize="18px">Personal Information</Heading>
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
            <Text>12345678910</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Social ID Code</Text>
            <Text>123456789</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Home Address</Text>
            <Text>{person?.financialAddress}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Occupation</Text>
            <Text>Unemployed</Text>
          </Box>
          <Box>
            <Flex alignItems="center" gap="10px">
              <Text fontWeight="600">E-mail</Text>
              {simulation && <SimulationIcon height="20px" width="20px" />}
            </Flex>
            {simulation ? (
              <Text color="gray">tom@myspace.com</Text>
            ) : (
              <Text color="gray">{person?.email}</Text>
            )}
          </Box>
          <Box>
            <Flex alignItems="center" gap="10px">
              <Text fontWeight="600">Phone Number</Text>
              {simulation && <SimulationIcon height="20px" width="20px" />}
            </Flex>
            <Text color="gray">(+00) 94 843 432</Text>
          </Box>
        </Grid>
      </Flex>
      <Text>
        If the shown information is not up to date, please update the
        information via the{' '}
        <Link textDecoration="underline" href="#">
          citizen portal
        </Link>
        .
      </Text>
    </Flex>
  );
}

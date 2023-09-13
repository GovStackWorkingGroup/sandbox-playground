import { ReactComponent as FileWarningIcon } from '@assets/icons/file-warning.svg';
import { ReactComponent as YisIcon } from '@assets/icons/yis-circle.svg';
import { ReactComponent as SaveIcon } from '@assets/icons/save.svg';
import { Avatar, Box, Button, ButtonGroup, Center, Flex, Grid, Heading, Input, Spinner, Text} from '@chakra-ui/react';
import { DriverPOC } from '../../driver-poc/types';
import {useNavigate, useParams } from 'react-router-dom';
import { useState, useContext, ChangeEvent} from 'react';
import { useQuery } from 'react-query';
import { RPCContext } from '../../driver-poc/rpc';

export default function PersonalInformationEdit({
  candidatei,
  handleContinue,
  handleBack,
  newCandidate,
  setCandidateData,
  simulation,
  reviewed,
}: {
  candidatei?: DriverPOC.Candidate;
  handleContinue?:any;
  handleBack?:any;
  newCandidate?: boolean;
  setCandidateData?: any;
  simulation?: boolean;
  reviewed?: boolean;
}) {
  const id = useParams<{ id: string }>();
  const rpc = useContext(RPCContext);
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<DriverPOC.Candidate>({id: 0,
    person: {
      id: 0,
      personalIdCode: '',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      region: '',
      homeAddress: '',
      phoneNumber: '',
      occupation: '',
      municipality: '',
      zipCode: '',
      bankAccountOwnerName: '',
      financialAddress: '',
      iban: '',
      bankName: '',
      financialModality: '',
    },
    packages: [],
    relative: null
    });

    const [enabled, setEnabled] = useState(false);
    const saveCandidateInfo = async () => {
      rpc.updateCandidate(candidate);
      return navigate(`/driver-poc/candidate/${id.id}`);
    }

    const validateFields = () => {
      const inputs = Array.from(document.querySelectorAll('input'));
      setEnabled(inputs.every((target) => target.value !== ""));
    }

    const updateData = (e: ChangeEvent<HTMLInputElement>) => {
      if (!newCandidate) {
        candidate.person = Object.assign({}, candidate.person,
        { [e.target.name]: e.target.value });
      } else {
        setCandidateData(e);
      }
      validateFields();
    }

    if (!newCandidate) {
      const { isFetching } = useQuery(
        `candidate-${id}`,
        async () => {
          if (id) {
            const res = await rpc.getCandidateInfo(Number(id.id));
            return (res.person != null)?(setCandidate(res)):("");
          }
        }
      );
      if (isFetching) {
        <Center>
          <Spinner />
        </Center>;
      }
    }
  const SimulationIcon = reviewed ? YisIcon : FileWarningIcon;

  return (
    <Flex gap="24px" direction="column">
        <>
     {newCandidate?(<Heading mb="40px">New Candidate</Heading>):""}
          <Heading fontSize="18px">{newCandidate?"Candidate Information":"Applicant information"}</Heading>
        <Flex gap="40px"direction={{ base: 'column', xl: 'row' }}>
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
            <Flex>
              <Flex width="100%" justifyContent="flex-start" paddingEnd="4px"><Input name="firstName" placeholder="First Name" disabled={!newCandidate} onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.firstName:candidate.person.firstName}/></Flex>
              <Flex width="100%" justifyContent="flex-end" paddingStart="4px"><Input name="lastName" placeholder="Last Name" disabled={!newCandidate} onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.lastName:candidate.person.lastName} /></Flex>
            </Flex>
          </Box>
          <Box>
            <Text fontWeight="600">Date of Birth</Text>
            <Input name="dateOfBirth" placeholder="dd/mm/yyyy" disabled={!newCandidate} onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.dateOfBirth:candidate.person.dateOfBirth} />
          </Box>
          <Box>
            <Text fontWeight="600">Personal ID Code</Text>
            <Input name="personalIdCode" placeholder="(9 Digit Personal Code on ID)" disabled={!newCandidate} onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.personalIdCode:candidate.person.personalIdCode}/>
          </Box>
          <Box>
            <Text fontWeight="600">Occupation</Text>
            <Input name="occupation" placeholder="Job Title" onChange={(e) => updateData(e)}  defaultValue={candidatei?candidatei.person.occupation:candidate.person.occupation}/>
          </Box>
          <Box>
            <Text fontWeight="600">Region / District</Text>
            <Input name="region" placeholder="Registration District" onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.region:candidate.person.region} />
          </Box>
          <Box>
            <Text fontWeight="600">Municipality</Text>
            <Input name="municipality" placeholder="Registration Municipality" onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.municipality:candidate.person.municipality} />
          </Box>
          <Box>
            <Text fontWeight="600">Home Address</Text>
            <Input name="homeAddress" placeholder="Street Name - Apt/House No" onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.homeAddress:candidate.person.homeAddress} />
          </Box>
          <Box>
            <Text fontWeight="600">ZIP Code</Text>
            <Input name="zipCode" placeholder="xxxxxxx" onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.zipCode:candidate.person.zipCode} />
          </Box>
          <Box>
            <Flex alignItems="center" gap="10px">
              <Text fontWeight="600">Phone Number</Text>
              {simulation && <SimulationIcon height="20px" width="20px" />}
            </Flex>
            <Input name="phoneNumber" placeholder="Phone Number" onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.phoneNumber:candidate.person.phoneNumber} />
          </Box>
          <Box>
            <Text fontWeight="600">Email Address</Text>
            <Input type="email" name="email" placeholder="Email Address" onChange={(e) => updateData(e)} defaultValue={candidatei?candidatei.person.email:candidate.person.email} />
          </Box>
        </Grid>
        </Flex>
        <Flex gap="20px" justifyContent="flex-end">
          <ButtonGroup>
          <Button colorScheme="admin" onClick={() => navigate((!newCandidate)?navigate('/driver-poc/candidate/'+id.id):handleBack())} w="180px" variant="outline">
              Back
            </Button>
            <Button disabled={!enabled} colorScheme={!enabled?"disabled":"admin"} onClick={() => enabled?(!newCandidate)?saveCandidateInfo():handleContinue():""} w="180px" leftIcon={<SaveIcon/>}>{!newCandidate?"Save":"Next"}</Button>
          </ButtonGroup>
        </Flex>
      </>
    </Flex>

  );
}

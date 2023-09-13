import { useContext, useState } from "react";
import { Box, Button, ButtonGroup, Center, CircularProgress, Flex, Heading, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, VStack, useSteps } from "@chakra-ui/react";
import PersonalInformation from '../usct/personal/PersonalInformation';
import PersonalInformationEdit from "../usct/personal/PersonalInformationEdit";
import BankInformation from '../usct/personal/BankInformation';
import BankInformationEdit from "../usct/personal/BankInformationEdit";
import { RPCContext } from "./rpc";
import { DriverPOC } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SaveIcon } from '@assets/icons/save.svg';

  export default function CreateCandidate() {
    const rpc = useContext(RPCContext);
    const [isBeingCreated, setIsBeingCreated] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [createdCandidateId, setCreatedCandidateId] = useState(Number);
    const [candidate] = useState<DriverPOC.Candidate>(
        {id: 0,
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

    const handleBack = () => {
        if (activeStep == 0) {
            navigate('/driver-poc/candidates');
        } else {
            setActiveStep(activeStep-1);
        }
    }

    const handleContinue = () => {
        return setActiveStep(activeStep+1);
    }

    const createCandidate = async () => {
        setIsBeingCreated(true);
        const res = await rpc.createCandidate(candidate);
        setCreatedCandidateId(res.id);
        if (res) {
            setIsCreated(true);
        }
    }

    const updateData = (e: { target: { name: any; value: any; }; }) => {
        candidate.person = Object.assign({}, candidate.person,
            { [e.target.name]: e.target.value });
      }

    const steps = [
        { title: 'Personal Information', description: 'Personal Information', component: <PersonalInformationEdit candidatei={candidate} newCandidate setCandidateData={updateData} handleContinue={handleContinue} handleBack={handleBack} /> },
        { title: 'Bank Information', description: 'Bank Information',  component: <BankInformationEdit candidatei={candidate} setCandidateData={updateData} handleContinue={handleContinue} handleBack={handleBack}/>},
        { title: 'Candidate Preview', description: 'Preview',  component: <CandidatePreview candidate={candidate} handleContinue={createCandidate} handleBack={handleBack}/>}
    ];

    const navigate = useNavigate();

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    if (isCreated) {
        return (
          <Center display="flex" margin="auto">
            <VStack maxW="640px" gap="40px">
              <Heading size="md" mb="20px">
                New candidate successfully created
              </Heading>
              <Box>
                <Button mb="10px" maxW="380px" w="100%" colorScheme="admin">
                  Home
                </Button>
                <ButtonGroup
                  maxW="380px"
                  w="100%"
                  colorScheme="admin"
                  variant="outline"
                  gap="20px"
                >
                  <Button as={Link} to="/driver-poc/candidates" w="100%">
                    Candidate list
                  </Button>
                  <Button as={Link} to={"/driver-poc/candidate/"+createdCandidateId} w="100%">
                    Go to candidate
                  </Button>
                </ButtonGroup>
              </Box>
            </VStack>
          </Center>
        );
      }
      if (isBeingCreated) {
        return (
          <Center display="flex" margin="auto">
            <VStack gap="40px">
              <CircularProgress isIndeterminate size={100} mb="40px" />
              <Heading mb="20px">Creating new candidate ...</Heading>
              {/* <Text>Please wait! This process might take some time.</Text> */}
            </VStack>
          </Center>
        );
      }

    return (
    <Flex direction="column" gap="50px">
        <Flex justifyContent="center">
            <Stepper width="50%" size='md' index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                    </Box>
                    <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </Flex>
        <Flex width="100%" justifyContent="center">
            {steps[activeStep].component}
        </Flex>
    </Flex>
    )
}

const CandidatePreview = ({ candidate, handleContinue, handleBack }:{ candidate: DriverPOC.Candidate, handleContinue: any, handleBack: any }) => {
    return (
        <Flex width="100%" justifyContent="center" direction="column" gap="50px">
            <PersonalInformation person={candidate.person} newCandidate/>,
            <BankInformation candidate={candidate} newCandidate />

            <Flex justifyContent="flex-end">
            <ButtonGroup colorScheme="admin" >
            <Button onClick={() => handleBack()} w="180px" variant="outline">
                Back
                </Button>
                <Button type="submit" colorScheme={"admin"} onClick={() => handleContinue()} w="180px" leftIcon={<SaveIcon/>}>Create</Button>
            </ButtonGroup>
            </Flex>
        </Flex>
    )
}

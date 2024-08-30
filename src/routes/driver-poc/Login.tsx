import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import { RPCContext } from "./rpc";
import { useAuthentication } from "./utils/useAuthentication";

interface IUser {
  username: string;
  role: string;
  value: string;
}

const users = [
  {
    username: "max.bob@gov.stack",
    role: "Enrollment Officer",
    value: "enrollment-officer",
  },
  {
    username: "susie.may@gov.stack",
    role: "Payment Officer",
    value: "payment-officer",
  },
];

export default function Login() {
  const { login } = useAuthentication();
  const rpc = useContext(RPCContext);
  const [user, setUser] = useState<IUser>();
  const [urlParams] = useSearchParams();
  const [loginFailed, setLoginFailed] = useState(false);

  const { data: authMode, isLoading } = useQuery(
    "authMode",
    rpc.getAuthMode
  );

  const handleLogin = () => {
   login(user?.value);
  };

  useEffect(() => {
    if (urlParams.has("error")) setLoginFailed(true);
  },[])

  return (
    <>
      {isLoading?(
        <Flex justifyContent="center" alignItems="center" w="100%">
          <Spinner size="lg" />
        </Flex>
      ):(
        (authMode == "mosip")?(
          <>
            <Center minH="100vh" flexGrow={1}>
              <VStack gap="20px" w="100%" maxW="400px">
                <Heading>Log In</Heading>
                <Button
                    colorScheme="admin"
                    w="100%"
                    onClick={() => {
                      handleLogin();
                    }}
                >
                  Log in with e-Signet
                </Button>
                { loginFailed ? ( <Text color="red">Login failed! Please try again!</Text> ) : ("") }
              </VStack>
            </Center>
          </>
        ):(authMode == "local")?(
          <>
            <Center minH="100vh" flexGrow={1}>
              <VStack gap="20px" w="100%" maxW="400px">
                <Heading>Log In</Heading>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Menu matchWidth>
                    <MenuButton
                      textAlign="left"
                      _expanded={{ bg: "transparent" }}
                      w="100%"
                      as={Button}
                      backgroundColor="transparent"
                      border={`1px solid ${colors.secondary[1000]}`}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {!user ? "Select a user" : user.username}
                    </MenuButton>
                    <MenuList>
                      {users.map((user) => {
                        return (
                          <MenuItem key={user.value} onClick={() => setUser(user)}>
                            <Flex
                              w="100%"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Text>{user.username}</Text>
                              <Text size="sm" color={colors.secondary[400]}>
                                [{user.role}]
                              </Text>
                            </Flex>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Menu>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    border={`1px solid ${colors.secondary[1000]}`}
                    type="password"
                    placeholder="Password"
                    onChange={() => {}}
                    value={!user ? "" : "password"}
                  />
                </FormControl>
                <Button
                  colorScheme={!user ? "disabled" : "admin"}
                  w="100%"
                  disabled={!user}
                  onClick={() => handleLogin()}
                >
                  Log In
                </Button>
              </VStack>
            </Center>
          </>
        ):(
          <Flex justifyContent="center" alignItems="center" w="100%">
            <Heading size="md" textAlign="center">Something went wrong while getting the authentication method!<br/>
            Please try again!</Heading>
          </Flex>
        )
      )}
    </>
  );
}

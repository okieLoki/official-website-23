import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast
} from "@chakra-ui/react";
import SignupForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserPage = () => {

  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async (username: string, password: string, key: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/signup", {
        username,
        password,
        key,
      });

      if (response.status === 201) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true
        });
      } else {
        toast({
          title: "Account creation failed.",
          description: "We've failed to create your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", {
        username,
        password,
      }, {
        withCredentials: true,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (response.status === 200) {

        toast({
          title: "Login successful.",
          description: "We've logged you in.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

        localStorage.setItem('isLoggedIn', 'true')
        navigate("/team/view");
      } else {
        toast({
          title: "Login failed.",
          description: "We've failed to log you in.",
          status: "error",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container
      maxW="xl"
      mt="10vh" 
      p="6"
      boxShadow="lg"
      rounded="lg"
      bg="white"
    >
      <Tabs isFitted>
        <TabList justifyContent="center"> 
          <Tab _focus={{ boxShadow: "none" }}>Sign Up</Tab>
          <Tab _focus={{ boxShadow: "none" }}>Log In</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignupForm handleSignup={handleSignup} />
          </TabPanel>
          <TabPanel>
            <LoginForm handleLogin={handleLogin} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default UserPage;

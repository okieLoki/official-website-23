import { useState } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";

interface SignupFormProps {
  handleSignup: (username: string, password: string, key: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");

  const handleSubmit = () => {
    handleSignup(username, password, key);
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        placeholder="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Button onClick={handleSubmit}>Sign Up</Button>
    </VStack>
  );
};

export default SignupForm;

import { useState } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";

interface LoginFormProps {
  handleLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    handleLogin(username, password);
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
      <Button onClick={handleSubmit}>Log In</Button>
    </VStack>
  );
};

export default LoginForm;

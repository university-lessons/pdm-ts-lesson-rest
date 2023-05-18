import { useState } from "react";
import { Alert, Button, Text } from "react-native";
import CreateCar from "./src/pages/CreateCar";
import Home from "./src/pages/Home";
import api from "./src/services/api";

export default function App() {
  const [token, setToken] = useState<string>();

  if (!token)
    return (
      <>
        <Text>
          Can u keep a secret? you should know that fulano can login with
          pdm123pdm
        </Text>

        <Button
          title="login"
          onPress={async () => {
            try {
              const result = await api.post(
                "/api/collections/users/auth-with-password",
                {
                  identity: "fulano",
                  password: "pdm123pdm",
                }
              );

              setToken(result.data.token);
            } catch (error) {
              Alert.alert(error.message);
            }
          }}
        />
      </>
    );

  return (
    <>
      <Home token={token} />
      <CreateCar token={token} />
    </>
  );
}

import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import api from "./src/services/api";
import type { Car } from "./src/services/api";

export default function App() {
  const [token, setToken] = useState<string>();
  const [cars, setCars] = useState<Car[]>([]);

  const login = async () => {
    try {
      const response = await api.post(
        "/api/collections/users/auth-with-password",
        {
          identity: "fulano",
          password: "pdm123pdm",
        }
      );

      setToken(response.data.token);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const getAll = async () => {
    try {
      const response = await api.get<{ items: Car[] }>(
        "/api/collections/cars/records",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCars(response.data.items);
    } catch (error: any) {
      Alert.alert("Something went wrong! Try again later...");
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  if (!token)
    return (
      <View style={styles.container}>
        <Button onPress={login} title="login" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>Welcome! You're logged in!</Text>
      <ScrollView>
        {cars.map((car) => (
          <Text key={car.id}>
            {car.model} {car.brand} {car.hp}
          </Text>
        ))}
      </ScrollView>
      <Button onPress={getAll} title="getAll" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import api from "../services/api";
import { Car } from "../types/Car";

interface Props {
  token: string;
}

export default function CreateCar({ token }: Props) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");

  const handleCreate = async () => {
    const data = {
      model,
      brand,
      hp: parseInt(hp),
    };

    // na outra pagina fizemos com Promise.then, aqui com async/await
    const createdCar = await api.post<Car>(
      "/api/collections/cars/records",
      data,
      {
        headers: {
          Authorization: token,
          "content-type": "application/json",
        },
      }
    );

    if (createdCar.status === 200) {
      Alert.alert("Created! Reload to see results!", createdCar.data.model);
    } else {
      console.log(createdCar);
      Alert.alert("Error!", "Error Creating Car!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars API CREATE</Text>

      <TextInput value={brand} onChangeText={setBrand} placeholder="brand" />
      <TextInput value={model} onChangeText={setModel} placeholder="model" />
      <TextInput
        value={hp}
        onChangeText={(text) => setHp(text.replace(/[^0-9]/g, ""))}
        placeholder="hp"
        keyboardType="number-pad"
      />

      <Button title="Create Car" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
});

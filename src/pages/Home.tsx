import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import api from "../services/api";
import { Car } from "../types/Car";

interface Props {
  token: string;
}

export default function Home({ token }: Props) {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // exemplo com then-catch (na outra página usaremos async-await)
    api
      .get("/api/collections/cars/records", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCars(response.data.items);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars API LIST</Text>

      <StatusBar style="auto" />

      <FlatList
        data={cars}
        renderItem={({ item }) => {
          // console.log(item);

          return (
            <View style={styles.item}>
              <Text>{item.id}</Text>
              <Text>{item.brand}</Text>
              <Text>{item.model}</Text>
            </View>
          );
        }}
        keyExtractor={(car) => car.id}
        style={styles.flatlist}
      />
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
  flatlist: {
    padding: 16,
    width: "100%",
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  item: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 16,
  },
});

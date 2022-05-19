import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";

import api from "../services/api";

const renderItem = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.item}>
      <Text>{item.id}</Text>
      <Text>{item.brand}</Text>
      <Text>{item.model}</Text>
    </View>
  );
};

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars").then((response) => {
      setCars(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars API LIST</Text>

      <StatusBar style="auto" />

      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={(car) => car.id}
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
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  item: {
    flexDirection: "row",
    marginBottom: 16,
  },
});

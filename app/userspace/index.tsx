import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";

export default function Home() {
  const { token } = useTokenContext();
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

      <Link href="/userspace/create_car">Create a new Car</Link>

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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    padding: 16,
    width: "100%",
    flex: 1,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  item: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 16,
  },
});

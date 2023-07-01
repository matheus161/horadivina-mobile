import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import religionService from "../../services/religionService";

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import colors from "../../themes/colors";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await religionService.getAllReligions();
      console.log(data);
      setData(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao carregar os dados, tente novamente!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleShowReligion = ({ item }) => (
    <Animatable.View
      animation={"fadeIn"}
      delay={500}
      style={styles.itemContainer}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.itemAvatar} />
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
    </Animatable.View>
  );

  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Religiões</Text>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <SafeAreaView style={{ flex: 1 }}>
          <TextInput
            placeholder="Pesquisar"
            clearButtonMode="always"
            style={styles.searchBox}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
          />

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={colors.appPrimary}
              style={styles.activityIndicator}
            />
          ) : (
            <FlatList
              data={data}
              renderItem={handleShowReligion}
              ItemSeparatorComponent={itemSeparator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: "40%" }}
            />
          )}
        </SafeAreaView>
      </Animatable.View>
    </View>
  );
}

import React, { useEffect, useState, useRef } from "react";
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
import { Toast } from "react-native-toast-message/lib/src/Toast";

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import colors from "../../themes/colors";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const timeoutRef = useRef(null);

  const fetchData = async (searchQuery) => {
    setIsLoading(true);
    try {
      const data = await religionService.getAllReligions(
        searchQuery.toLowerCase()
      );
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

  const delayedSearch = (value) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchData(value);
    }, 2000);
  };

  useEffect(() => {
    //fetchData(searchQuery);
    delayedSearch(searchQuery);
  }, [searchQuery]);

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
            onChangeText={setSearchQuery}
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

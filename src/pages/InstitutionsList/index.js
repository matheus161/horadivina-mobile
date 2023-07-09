import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import institutionsListService from "../../services/institutionsListService";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import colors from "../../themes/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InstitutionsList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [location, setLocation] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const timeoutRef = useRef(null);

  const fetchData = async (searchQuery, item, page, limit) => {
    setIsLoading(true);
    try {
      let location = await AsyncStorage.getItem("USER_LOCATION");
      setLocation(JSON.parse(location));

      const coords = JSON.parse(location);
      const lat = coords ? coords.latitude : null;
      const lon = coords ? coords.longitude : null;

      const institutions = await institutionsListService.getAllInstitutions(
        searchQuery.toLowerCase(),
        item._id,
        page,
        limit,
        lat,
        lon
      );
      console.log(institutions);
      //Ordena os itens com base na distância
      // institutions.paginatedResults.sort(
      //   (a, b) => handleLocation(a.address) - handleLocation(b.address)
      // );

      setData((prevData) => {
        if (page === 0) {
          return institutions;
        } else {
          return {
            ...prevData,
            paginatedResults: [
              ...prevData.paginatedResults,
              ...institutions.paginatedResults,
            ],
          };
        }
      });
      setSearchBar(institutions.totalItens > 0);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao carregar os dados, tente novamente!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const delayedSearch = (searchQuery, item) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchData(searchQuery, item, page, limit);
    }, 500);
  };

  useEffect(() => {
    //fetchData(searchQuery, item);
    delayedSearch(searchQuery, item);
  }, [searchQuery, item, page]);

  function handleLocation(item) {
    if (location && location.coords) {
      const lat1 = parseFloat(location.coords.latitude) * (Math.PI / 180);
      const long1 = parseFloat(location.coords.longitude) * (Math.PI / 180);
      const lat2 = parseFloat(item.lat) * (Math.PI / 180);
      const long2 = parseFloat(item.long) * (Math.PI / 180);
      const distance =
        Math.acos(
          Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)
        ) * 6371;
      return distance;
    }
    return 0;
  }

  const handleShowInstitutions = ({ item }) => (
    <View style={styles.buttonContainer}>
      <TouchableWithoutFeedback>
        <Animatable.View
          animation={"fadeIn"}
          delay={500}
          style={styles.itemContainer}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.itemAvatar} />
          </View>
          <View style={styles.institutionContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemLocal}>{item.manager}</Text>
            <Text style={styles.itemCity}>
              {item.address.city} - {item.address.state}
            </Text>
            <Text style={styles.itemDistance}>
              {/* {item.distancia > 1000
                ? (item.distancia / 1000).toFixed(2) + " Km"
                : item.distancia} */}
              {item.distancia}
            </Text>
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={styles.favoriteButton}>
        <Icon
          name={item.favorite ? "heart" : "heart-o"}
          size={20}
          color={item.favorite ? "red" : "black"}
        />
      </TouchableWithoutFeedback>
    </View>
  );

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const emptyListMessage = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.noResultMesage}>
          Sem resultados para esta localidade.
        </Text>
        <Image
          source={require("../../assets/icons8-nada-foi-encontrado-100.png")}
        />
      </View>
    );
  };

  const loadMoreData = () => {
    if (page + 1 < data.totalPages) setPage(page + 1);
  };

  function FooterList({ isLoading }) {
    if (!isLoading) return null;

    return (
      <View style={styles.loading}>
        <ActivityIndicator size={25} color={colors.appPrimary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={25} color={colors.fontPrimary} />
        </TouchableWithoutFeedback>

        <Text style={styles.message}>{item.name}</Text>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <SafeAreaView style={{ flex: 1 }}>
          {searchBar && (
            <TextInput
              placeholder="Pesquisar"
              clearButtonMode="always"
              style={styles.searchBox}
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setPage(0);
              }}
            />
          )}

          {isLoading && page == 0 ? (
            <ActivityIndicator
              size="large"
              color={colors.appPrimary}
              style={styles.activityIndicator}
            />
          ) : (
            <FlatList
              data={data.paginatedResults}
              renderItem={handleShowInstitutions}
              ItemSeparatorComponent={itemSeparator}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={emptyListMessage}
              contentContainerStyle={{ paddingBottom: "5%" }}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={<FooterList isLoading={isLoading} />}
            />
          )}
        </SafeAreaView>
      </Animatable.View>
    </View>
  );
}

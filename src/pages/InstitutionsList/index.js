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
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState(0);

  const timeoutRef = useRef(null);

  const getUserLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const storedLocation = await AsyncStorage.getItem("USER_LOCATION");
      const parsedLocation = JSON.parse(storedLocation);
      console.log(parsedLocation);
      setLocation(parsedLocation);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const fetchData = async (searchQuery, page, location) => {
    setIsLoading(true);
    try {
      const institutions = await institutionsListService.getAllInstitutions(
        searchQuery.toLowerCase(),
        item._id,
        page,
        location.coords.latitude,
        location.coords.longitude
      );

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

  const delayedSearch = (searchQuery, page, location) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchData(searchQuery, page, location);
    }, 500);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    delayedSearch(searchQuery, page, location);
  }, [searchQuery, page, location]);

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
            <Text style={styles.itemDistance}>{item.distancia}</Text>
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

          {isLoading && isLoadingLocation && page == 0 ? (
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

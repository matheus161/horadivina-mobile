import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import userService from "../../services/userService";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import colors from "../../themes/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InsitutionsItem from "../../components/InstitutionItem";

export default function Favorites() {
  const navigation = useNavigation();
  const [searchBar, setSearchBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const getUserLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const storedLocation = await AsyncStorage.getItem("USER_LOCATION");
      const parsedLocation = JSON.parse(storedLocation);
      setLocation(parsedLocation);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const getUser = async () => {
    const userId = await AsyncStorage.getItem("USER_ID");
    const token = await AsyncStorage.getItem("TOKEN");
    console.log("USERID e TOKEN", userId, token);
    setUserId(userId);
    setToken(token);
  };

  const fetchData = async (userId, searchQuery, location) => {
    setIsLoading(true);
    try {
      const institutions =
        await userService.getFavoritedInstitutionsFilteredByReligion(
          userId,
          token,
          searchQuery.toLowerCase(),
          location.coords.latitude,
          location.coords.longitude
        );
      console.log(institutions.data[0]);
      setData(institutions.data);
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

  useEffect(() => {
    getUserLocation();
    getUser();
  }, []);

  useEffect(() => {
    if (userId && location.coords) {
      fetchData(userId, searchQuery, location);
    }
  }, [searchQuery, location, userId]);

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const emptyListMessage = () => {
    return searchQuery === "" ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.noResultMesage}>
          Sem resultados para esta localidade.
        </Text>
        <Image
          source={require("../../assets/icons8-nada-foi-encontrado-100.png")}
        />
      </View>
    ) : (
      <>
        <TextInput
          placeholder="Pesquisar"
          clearButtonMode="always"
          style={styles.searchBox}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20%",
          }}
        >
          <Text style={styles.noResultMesage}>
            Sem resultados dessa instituição em sua localidade.
          </Text>
          <Image
            source={require("../../assets/icons8-nada-foi-encontrado-100.png")}
          />
        </View>
      </>
    );
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
        <Text style={styles.message}>Favoritos</Text>
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
                //setPage(0);
              }}
            />
          )}

          {isLoading && isLoadingLocation ? (
            <ActivityIndicator
              size="large"
              color={colors.appPrimary}
              style={styles.activityIndicator}
            />
          ) : (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <InsitutionsItem item={item} token={token} />
              )}
              ItemSeparatorComponent={itemSeparator}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={emptyListMessage}
              contentContainerStyle={{ paddingBottom: "5%" }}
              //onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={<FooterList isLoading={isLoading} />}
              //extraData={favoriteChanged}
            />
          )}
        </SafeAreaView>
      </Animatable.View>
    </View>
  );
}

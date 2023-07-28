import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import userService from "../../services/userService";
import Toast from "react-native-toast-message/lib/src/Toast";

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import colors from "../../themes/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/FontAwesome";

//import InsitutionsItem from "../../components/InstitutionItem";
import institutionsListService from "../../services/institutionsListService";

const InstitutionsItem = ({ item, token }) => {
  //console.log("Institution Item", item.institution);
  const [isFavorite, setIsFavorite] = useState(item.favorite);
  const [isSubscribed, setIsSubscribed] = useState(item.subscribed);

  const handleFavorite = async () => {
    if (isFavorite) {
      await institutionsListService.remFavorite(item._id, token);
      Toast.show({
        type: "info",
        text1: "Instituição removida dos favoritos!",
      });
      setIsFavorite(false);
    } else {
      await institutionsListService.addFavorite(item._id, token);
      Toast.show({
        type: "success",
        text1: "Instituição adicionada aos favoritos!",
      });
      setIsFavorite(true);
    }
  };

  const handleSubscribed = async () => {
    if (isSubscribed) {
      await institutionsListService.unsubscribe(item._id, token);
      Toast.show({
        type: "info",
        text1: "Notificações desativadas com sucesso!",
      });
      setIsSubscribed(false);
    } else {
      await institutionsListService.subscribe(item._id, token);
      Toast.show({
        type: "success",
        text1: "Notificações ativadas com sucesso!",
      });
      setIsSubscribed(true);
    }
  };

  return (
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
              {item.city} - {item.state}
            </Text>
            <Text style={styles.itemDistance}>{item.distancia}</Text>
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>

      <View style={styles.favoriteContainer}>
        <TouchableWithoutFeedback
          onPress={() => handleSubscribed(item)}
          style={styles.favoriteButton}
        >
          {isSubscribed ? (
            <Icon name="bell" size={30} />
          ) : (
            <Icon name="bell-o" size={30} />
          )}
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => handleFavorite(item)}
          style={styles.favoriteButton}
        >
          <Icon
            name={isFavorite ? "heart" : "heart-o"}
            size={30}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default function Favorites() {
  const navigation = useNavigation();
  const [searchBar, setSearchBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [userId, setUserId] = useState("64c2c5673fe8b9003308cf87");
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzJjNTY3M2ZlOGI5MDAzMzA4Y2Y4NyIsImlhdCI6MTY5MDQ4NzM5NCwiZXhwIjoxNjk1NjcxMzk0fQ.DwacPSD_zP9sxYL3Vhi0plUAPnw7Z6HhTZZ5tYTW5I8"
  );

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
      const {
        data: { institutions },
      } = await userService.getFavoritedInstitutionsFilteredByReligion(
        userId,
        token,
        searchQuery.toLowerCase(),
        "-11.275476858506398",
        "-37.443791523029226"
      );
      console.log(institutions[0]);
      setData(institutions);
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

  // useEffect(() => {
  //   getUserLocation();
  //   getUser();
  // }, []);

  useEffect(() => {
    // if (userId && location.coords && token) {
    //   fetchData(userId, searchQuery, location);
    // }
    fetchData(userId, searchQuery, location);
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
                <InstitutionsItem item={item.institutions} token={token} />
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

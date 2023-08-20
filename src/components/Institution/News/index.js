import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import newService from "../../../services/newsService";
import Toast from "react-native-toast-message";
import moment from "moment";
import "moment/locale/pt-br";

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import colors from "../../../themes/colors";
import { useNavigation } from "@react-navigation/native";

export default function News({ institution }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataTotalItens, setDataTotalItens] = useState(0);
  const navigation = useNavigation();
  const [page, setPage] = useState(0);

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const news = await newService.getAllNewsByInstitution(
        institution._id,
        page
      );
      setData((prevData) => [...prevData, ...news.paginatedResults]);
      setDataTotalItens(news.totalitens);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao carregar as notícias, tente novamente!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const navigateToPage = (item) => {
    navigation.navigate("NewsDetail", { item });
  };

  const handleNews = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateToPage(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {moment(item.data).locale("pt-br").format("DD [de] MMMM [de] YYYY")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const loadMoreData = () => {
    const totalPages = Math.ceil(dataTotalItens / 5);
    if (page + 1 < totalPages) setPage(page + 1);
  };

  function FooterList({ isLoading }) {
    if (!isLoading) return null;

    return (
      <View style={styles.loading}>
        <ActivityIndicator size={25} color={colors.appPrimary} />
      </View>
    );
  }

  const emptyListMessage = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20%",
        }}
      >
        <Text style={styles.noResultMesage}>Não há notícias cadastradas.</Text>
        <Image
          source={require("../../../assets/icons8-nada-foi-encontrado-100.png")}
        />
      </View>
    );
  };

  return (
    <Animatable.View animation={"fadeIn"} delay={1000}>
      {isLoading && page === 0 ? (
        <ActivityIndicator
          size={20}
          color={colors.appPrimary}
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={handleNews}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyListMessage}
          contentContainerStyle={{ paddingBottom: "20%" }}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      )}
    </Animatable.View>
  );
}

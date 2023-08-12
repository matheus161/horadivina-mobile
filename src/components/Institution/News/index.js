import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import newService from "../../../services/newService";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import moment from "moment";
import "moment/locale/pt-br";

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import colors from "../../../themes/colors";
import { useNavigation } from "@react-navigation/native";

export default function News({ institution }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await newService.getAllNewsByInstitution(institution._id);
      console.log(data.paginatedResults);
      setData(data.paginatedResults);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao carregar a notícias, tente novamente!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToPage = (item) => {
    navigation.navigate("NewsDetail", { item });
  };

  const handleNews = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateToPage(item)}
    >
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      <Image
        //source={require("../../../assets/image.jpg")}
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

  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.appPrimary}
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={handleNews}
          itemSeparator={itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: "20%" }}
        />
      )}
    </View>
  );
}

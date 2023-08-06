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

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import colors from "../../../themes/colors";

export default function News({ institution }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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
        text2: "Erro ao carregar os dados, tente novamente!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNews = ({ item }) => (
    <TouchableOpacity style={styles.container}>
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      <Image
        source={require("../../../assets/image.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
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
          // contentContainerStyle={{ paddingBottom: "40%" }}
        />
      )}
    </View>
  );
}

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import institutionsListService from "../../services/institutionsListService";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNavigation } from "@react-navigation/native";

import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

export default function Institution({
  item,
  token,
  onChangeFavorite,
  isFavoriteScreen,
}) {
  const [isFavorite, setIsFavorite] = useState(item.favorite);
  const [isSubscribed, setIsSubscribed] = useState(item.subscribed);
  const navigation = useNavigation();

  const handleFavorite = async () => {
    if (isFavorite) {
      await institutionsListService.remFavorite(item._id, token);
      if (isSubscribed) {
        await institutionsListService.unsubscribe(item._id, token);
        setIsSubscribed(false);
      }
      Toast.show({
        type: "info",
        text1: "Instituição removida dos favoritos!",
      });
      setIsFavorite(false);
      if (isFavoriteScreen) {
        onChangeFavorite();
      }
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
      if (!isFavorite) {
        await institutionsListService.addFavorite(item._id, token);
        setIsFavorite(true);
      }
      Toast.show({
        type: "success",
        text1: "Notificações ativadas com sucesso!",
      });
      setIsSubscribed(true);
    }
  };

  useEffect(() => {
    setIsFavorite(item.favorite);
    setIsSubscribed(item.subscribed);
  }, [item]);

  const navigateToPage = (item) => {
    navigation.navigate("InstitutionDetail", { item });
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableWithoutFeedback onPress={() => navigateToPage(item)}>
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

      <View style={styles.favoriteContainer}>
        <TouchableOpacity
          onPress={() => handleSubscribed(item)}
          style={styles.favoriteButton}
        >
          {isSubscribed ? (
            <Icon name="bell" size={30} />
          ) : (
            <Icon name="bell-o" size={30} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleFavorite(item)}
          style={styles.favoriteButton}
        >
          <Icon
            name={isFavorite ? "heart" : "heart-o"}
            size={30}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

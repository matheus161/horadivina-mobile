import React, { useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import institutionsListService from "../../services/institutionsListService";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

export default function Institution({ item, token, onChangeFavorite }) {
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
      await onChangeFavorite();
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
              {item.address.city} - {item.address.state}
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
}

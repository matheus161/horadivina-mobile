import React, { useState, useEffect } from "react";
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

import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import colors from "../../themes/colors";

export default function InstitutionsList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const intituicoes = [
    {
      id: 1,
      name: "Paróquia Nossa Senhora de Guadalupe",
      avatar:
        "https://drive.google.com/uc?export=view&id=1rIr0XERrdCj1-6Q5yPJALmZR_AlyMw9v",
      local: "Paróquia de Estância",
      cidade: "Estância - SE",
      distancia: "2,0 km",
      favorite: false,
    },
    {
      id: 2,
      name: "Igreja Nossa Senhora do Rosário",
      avatar:
        "https://drive.google.com/uc?export=view&id=1rIr0XERrdCj1-6Q5yPJALmZR_AlyMw9v",
      local: "Paróquia de Estância",
      cidade: "Estância - SE",
      distancia: "400m",
      favorite: false,
    },
    {
      id: 3,
      name: "Igreja Nossa Senhora de Fátima",
      avatar:
        "https://drive.google.com/uc?export=view&id=1rIr0XERrdCj1-6Q5yPJALmZR_AlyMw9v",
      local: "Paróquia de Estância",
      cidade: "Estância - SE",
      distancia: "3,0 km",
      favorite: true,
    },
    {
      id: 4,
      name: "Igreja Nossa Senhora de Fátima",
      avatar:
        "https://drive.google.com/uc?export=view&id=1rIr0XERrdCj1-6Q5yPJALmZR_AlyMw9v",
      local: "Paróquia de Estância",
      cidade: "Estância - SE",
      distancia: "3,0 km",
      favorite: true,
    },
    {
      id: 5,
      name: "Igreja Nossa Senhora de Fátima",
      avatar:
        "https://drive.google.com/uc?export=view&id=1rIr0XERrdCj1-6Q5yPJALmZR_AlyMw9v",
      local: "Paróquia de Estância",
      cidade: "Estância - SE",
      distancia: "3,0 km",
      favorite: false,
    },
    {
      id: 6,
      name: "Igreja Nossa Senhora de Fátima",
      avatar:
        "https://drive.google.com/uc?export=view&id=1rIr0XERrdCj1-6Q5yPJALmZR_AlyMw9v",
      local: "Paróquia de Estância",
      cidade: "Estância - SE",
      distancia: "3,0 km",
      favorite: false,
    },
  ];

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
            <Text style={styles.itemLocal}>{item.name}</Text>
            <Text style={styles.itemCity}>{item.cidade}</Text>
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
          <TextInput
            placeholder="Pesquisar"
            clearButtonMode="always"
            style={styles.searchBox}
            autoCapitalize="none"
            autoCorrect={false}
            //value={searchQuery}
            //onChangeText={setSearchQuery}
          />

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={colors.appPrimary}
              style={styles.activityIndicator}
            />
          ) : (
            <FlatList
              data={intituicoes}
              renderItem={handleShowInstitutions}
              ItemSeparatorComponent={itemSeparator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: "5%" }}
            />
          )}
        </SafeAreaView>
      </Animatable.View>
    </View>
  );
}

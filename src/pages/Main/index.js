import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import colors from "../../themes/colors";
import SearchBar from "../../components/SearchBar/Index";

export default function Main() {
  const religions = [
    {
      id: 1,
      name: "Catolicismo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 2,
      name: "Protestante",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 3,
      name: "Ubanda",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 4,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 5,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 6,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 7,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 8,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 9,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 10,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
    {
      id: 11,
      name: "Exemplo",
      image: require("../../assets/igreja-white.png"),
    },
  ];

  const handleShowReligion = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.avatarContainer}>
        <Image source={item.image} style={styles.itemAvatar} />
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );

  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Hora Divina</Text>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <SafeAreaView style={{ flex: 1, paddingBottom: 75 }}>
          <FlatList
            data={religions}
            renderItem={handleShowReligion}
            ItemSeparatorComponent={itemSeparator}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appPrimary,
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    marginStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.fontPrimary,
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  avatarContainer: {
    backgroundColor: colors.appPrimary,
    borderRadius: 100,
    height: 89,
    width: 89,
    justifyContent: "center",
    alignItems: "center",
  },
  itemAvatar: {
    height: 55,
    width: 55,
  },
  itemName: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 13,
  },
});

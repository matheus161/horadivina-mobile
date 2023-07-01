import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

import colors from "../../themes/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} autoFocus />
      <TouchableOpacity style={styles.buttonSearch}>
        <Icon name="search" color="#fff" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: colors.appThird,
    borderRadius: 30,
  },
  buttonSearch: {
    width: width * 0.7,
    height: 60,
    backgroundColor: colors.appFourthy,
    right: 0,
    position: "absolute",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 60,
    marginLeft: 20,
    color: colors.fontPrimary,
  },
});

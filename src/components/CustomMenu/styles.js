import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

const styles = StyleSheet.create({
  itemName: {
    fontWeight: "600",
    fontSize: 20,
  },
  separator: {
    margin: 10,
  },
  // selectedButton: {
  //   backgroundColor: colors.appPrimary,
  //   borderColor: "#007bff",
  //   borderRadius: 5, // Valor pode ser ajustado conforme o desejado
  //   padding: 3, // Valor pode ser ajustado conforme o desejado
  // },
  selectedText: {
    //color: colors.fontPrimary,
    textDecorationLine: "underline",
  },
});

export default styles;

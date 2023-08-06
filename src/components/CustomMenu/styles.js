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
  button: {
    padding: 10,
  },
  selectedButton: {
    backgroundColor: colors.appPrimary,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    color: colors.fontPrimary,
    //textDecorationLine: "underline",
  },
});

export default styles;

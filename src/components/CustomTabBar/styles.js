import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 99,
    flexDirection: "row",
    marginBottom: Platform.OS === "ios" ? 38 : 42,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.appPrimary,
    gap: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
  },
  buttonTab: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerButtom: {
    padding: 8,
    borderRadius: 99,
  },
});

export default styles;

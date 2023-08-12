import { StyleSheet } from "react-native";
import colors from "../../../themes/colors";

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    padding: "2%",
    width: "100%",
    height: 275,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  title: {
    backgroundColor: `${colors.appPrimary}80`,
    color: colors.fontPrimary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    // fontWeight: "bold",
  },
  date: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  bottomContainer: {
    position: "absolute", // Position the title and date at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    padding: 7,
  },
});

export default styles;

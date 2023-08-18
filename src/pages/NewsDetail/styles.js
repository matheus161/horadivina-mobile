import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appPrimary,
  },
  containerHeader: {
    borderRadius: 25,
    marginBottom: -50,
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.fontPrimary,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    paddingRight: "10%",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingTop: "5%",
    alignItems: "center",
  },
  itemAvatar: {
    width: "100%",
    height: 275,
  },
  textOverlay: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 6,
  },
  data: {
    fontSize: 16,
    padding: 10,
  },
  scrollView: {
    marginBottom: "20%",
  },
  description: {
    textAlign: "justify",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default styles;

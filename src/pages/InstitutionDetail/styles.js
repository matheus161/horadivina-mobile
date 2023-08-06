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
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Cor da sombra em rgba (preto com 50% de opacidade)
    textShadowOffset: { width: 1, height: 2 }, // Posição da sombra (horizontal e vertical)
    textShadowRadius: 3, // Desfoque da sombra
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
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.appPrimary,
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.fontPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: colors.fontSecondary,
  },
  labelError: {
    alignSelf: "flex-start",
    color: colors.error,
    marginBottom: 8,
  },
  itemAvatar: {
    width: "100%",
    height: 225,
  },
  avatarContainer: {
    //position: "relative",
  },
  textOverlay: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    textShadowColor: "rgba(0, 0, 0, 0.8)", // Cor da sombra em rgba (preto com 80% de opacidade)
    textShadowOffset: { width: 2, height: 4 }, // Posição da sombra (horizontal e vertical)
    textShadowRadius: 6, // Desfoque da sombra
  },
});

export default styles;

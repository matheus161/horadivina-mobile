import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appPrimary,
  },
  containerHeader: {
    flexDirection: "row",
    marginTop: "14%", // Deixar menos para baixo
    marginBottom: "8%",
    marginStart: "5%",
    alignItems: "center",
  },
  backButton: {
    marginRight: 20,
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.fontPrimary,
    marginLeft: 10,
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
    backgroundColor: colors.fontPrimary,
    borderRadius: 100,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  itemAvatar: {
    borderRadius: 50,
    height: "100%",
    width: "100%",
  },
  itemName: {
    fontWeight: "600",
    fontSize: 16,
  },
  itemLocal: {
    fontSize: 14,
    color: colors.grey,
  },
  itemCity: {
    fontSize: 14,
    color: colors.fontFourthy,
  },
  itemDistance: {
    fontSize: 14,
    color: colors.fontFourthy,
  },
  favoriteButton: {
    alignContent: "center",
    paddingBottom: "1%",
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  institutionContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 13,
  },
  buttonContainer: {
    //flexDirection: "row",
    //justifyContent: "space-between",
    //alignItems: "flex-end", // Opcional: alinha os botões na extremidade inferior
    marginHorizontal: 10, // Opcional: adiciona margem horizontal para espaçar os botões da borda
    marginBottom: 10,
  },
  favoriteContainer: {
    padding: "2%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "space-around",
  },
  noResultMesage: { color: colors.appPrimary, fontSize: 24 },
  loading: { padding: 10 },
});

export default styles;

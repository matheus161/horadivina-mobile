import { StyleSheet } from "react-native";
import colors from "../../../themes/colors";

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  iconContainer: {
    marginRight: 13,
    alignItems: "center",
  },
  infoAddress: {
    flex: 1,
    // marginLeft: 13,
    // justifyContent: "center",
    // alignContent: "center",
  },
  title: {
    // flex: 1,
    fontWeight: "600",
    fontSize: 16,
  },
  detail: {
    fontSize: 14,
    color: colors.grey,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
});

export default styles;

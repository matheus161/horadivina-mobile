import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../themes/colors";

import * as Animatable from "react-native-animatable";

export default function CustomTabBar({ state, descriptors, navigation }) {
  const [keyboardShow, setKeyboardShow] = React.useState();
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    !keyboardShow && (
      <View style={styles.container}>
        <Animatable.View
          style={styles.content}
          animation={"fadeInUp"}
          delay={500}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.buttomTab}
              >
                <View style={{ alignItems: "center", padding: 4 }}>
                  <View
                    style={[
                      styles.innerButtom,
                      {
                        backgroundColor: isFocused
                          ? colors.appThird
                          : "transparent",
                      },
                    ]}
                  >
                    <Ionicons
                      name={options.tabBarIcon}
                      size={34}
                      color={isFocused ? colors.appFourthy : "#FFF"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </Animatable.View>
      </View>
    )
  );
}

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

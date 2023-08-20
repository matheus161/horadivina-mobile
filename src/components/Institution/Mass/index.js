import React from "react";
import { ScrollView } from "react-native";

import styles from "./styles";
import InfoDetail from "../InfoDetail";

export default function Mass({ institution }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <InfoDetail
        text1={"Domingo"}
        text2={
          institution.dailyEvents.domingo
            ? institution.dailyEvents.domingo
            : "-"
        }
        separator
      />
      <InfoDetail
        text1={"Segunda"}
        text2={
          institution.dailyEvents.segunda
            ? institution.dailyEvents.segunda
            : "-"
        }
        separator
      />
      <InfoDetail
        text1={"Terça"}
        text2={
          institution.dailyEvents.terca ? institution.dailyEvents.terca : "-"
        }
        separator
      />
      <InfoDetail
        text1={"Quarta"}
        text2={
          institution.dailyEvents.quarta ? institution.dailyEvents.quarta : "-"
        }
        separator
      />
      <InfoDetail
        text1={"Quinta"}
        text2={
          institution.dailyEvents.quinta ? institution.dailyEvents.quinta : "-"
        }
        separator
      />
      <InfoDetail
        text1={"Sexta"}
        text2={
          institution.dailyEvents.sexta ? institution.dailyEvents.sexta : "-"
        }
      />
    </ScrollView>
  );
}

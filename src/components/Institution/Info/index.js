import React, { useState } from "react";
import { ScrollView } from "react-native";

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import ItemDetail from "../InfoDetail";

export default function Info({ institution }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ItemDetail
        text1={institution.name}
        text2={institution.address.street}
        text3={institution.address.number}
        icon={"map-marker"}
        separator
      />
      {institution.information.number && (
        <ItemDetail
          text1={institution.information.number}
          icon={"cellphone"}
          separator
        />
      )}
      {institution.information.whatsapp && (
        <ItemDetail
          text1={institution.information.whatsapp}
          icon={"whatsapp"}
          separator
        />
      )}
      {institution.information.email && (
        <ItemDetail
          text1={institution.information.email}
          icon={"email"}
          separator
        />
      )}
      {institution.information.instagram && (
        <ItemDetail
          text1={"Instagram"}
          text2={institution.information.instagram}
          icon={"instagram"}
          separator
        />
      )}
      {institution.information.facebook && (
        <ItemDetail
          text1={"Facebook"}
          text2={institution.information.facebook}
          icon={"facebook"}
          separator
        />
      )}
      {institution.information.website && (
        <ItemDetail
          text1={"Site"}
          text2={institution.information.website}
          icon={"web"}
        />
      )}
    </ScrollView>
  );
}

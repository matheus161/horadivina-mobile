import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import * as Animatable from "react-native-animatable";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function DonationDetail({
  icon,
  bankName,
  accountType,
  agency,
  accountNumber,
  owner,
  pix,
  isPix,
  separator,
}) {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name={icon} size={30} />
        </TouchableOpacity>

        {isPix ? (
          <View style={styles.infoAddress}>
            <Text style={styles.title}>Chave Pix</Text>
            <Text style={styles.detail}>Proprietário: {owner}</Text>
            <Text style={styles.detail}>Banco: {bankName}</Text>
            <Text style={styles.detail}>Chave: {pix}</Text>
          </View>
        ) : (
          <View style={styles.infoAddress}>
            <Text style={styles.title}>Transferência Bancária</Text>
            <Text style={styles.detail}>Banco: {bankName}</Text>
            <Text style={styles.detail}>Tipo de Conta: {accountType}</Text>
            <Text style={styles.detail}>Agência: {agency}</Text>
            <Text style={styles.detail}>Conta: {accountNumber}</Text>
            <Text style={styles.detail}>Proprietário: {owner} </Text>
          </View>
        )}
      </View>
      {separator && <View style={styles.separator} />}
    </>
  );
}

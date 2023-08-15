import React from "react";
import { ScrollView } from "react-native";

import styles from "./styles";
import DonationDetail from "../DonationDetail";

export default function Donations({ institution }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {institution.account && (
        <DonationDetail
          icon={"donate"}
          bankName={institution.account.bankName}
          accountType={institution.account.accountType}
          agency={institution.account.agency}
          accountNumber={institution.account.accountNumber}
          owner={institution.account.owner}
          separator
        />
      )}
      {institution.pix && (
        <DonationDetail
          icon={"donate"}
          bankName={institution.pix.bankName}
          owner={institution.pix.owner}
          pix={institution.pix.key}
          isPix
        />
      )}
    </ScrollView>
  );
}

import * as React from "react";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import TouchableIcon from "../composites/TouchableIcon";
import Text from "../components/Text";
import AccountCard from "../composites/AccountCard";
import { COLOR, SIZE } from "../services/enums";
import { RouterStoreInterface } from "../store/_router";
import { BtcStoreInterface } from "../store/_btc";
import { EthStoreInterface } from "../store/_eth";
import { AccountsStoreInterface } from "../store/_accounts";

// --- types --- //
export interface Props {
  router?: RouterStoreInterface;
  accounts?: AccountsStoreInterface;
  btc?: BtcStoreInterface;
  eth?: EthStoreInterface;
}

export interface State {
  isDeleting: boolean;
}

// --- styling --- //
const AccountActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const BalanceView = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 65px;
`;

const AccountView = (styled as any).FlatList``;

@inject("router", "accounts", "btc", "eth")
@observer
class AccountsView extends React.Component<Props, State> {
  // --- state --- //
  state = {
    isDeleting: false
  };

  // --- methods --- //
  onAddAccount = () => this.props.router.push("/overlay/add-account", { overlay: true });

  onRemoveAccount = () => this.setState({ isDeleting: !this.state.isDeleting });

  generateItemKey = (account: any, index: number) => `${account.address}-${index}`;

  // --- render --- //
  render() {
    const accounts = [...this.props.btc.accounts, ...this.props.eth.accounts];
    const { isDeleting } = this.state;
    return [
      <AccountActions key="account-actions">
        <TouchableIcon
          onPress={this.onAddAccount}
          src={require("../../assets/images/icon-add-account.png")}
          width="27px"
          height="27px"
        />
        <TouchableIcon
          onPress={this.onRemoveAccount}
          src={require("../../assets/images/icon-remove-account.png")}
          width="27px"
          height="27px"
        />
      </AccountActions>,
      <BalanceView key="account-balance">
        <Text color={COLOR.grey} shadow>
          Total Balance
        </Text>
        <Text size={SIZE.big} color={COLOR.lightGrey} shadow>
          $1,280
        </Text>
      </BalanceView>,
      <AccountView
        key="account-list"
        data={accounts}
        keyExtractor={this.generateItemKey}
        renderItem={({ item }) => (
          <AccountCard
            onDelete={this.props.accounts.deleteAccount}
            isDeleting={isDeleting}
            account={item}
          />
        )}
      />
    ];
  }
}

export default AccountsView;

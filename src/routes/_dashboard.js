/* @flow */
import React, { Component } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Route } from "react-router-native";
import Background from "../components/Background";
import AccountsView from "../views/AccountsView";
import TransactionsView from "../views/TransactionsView";
import SettingsView from "../views/SettingsView";
import Navigation from "../composites/Navigation";
import { isIphoneX } from "../services/utilities";

// -- styling --------------------------------------------------------------- //
const Container = styled(View)`
  padding-top: ${isIphoneX() ? "65px" : "40px"};
  padding-bottom: ${isIphoneX() ? "94px" : "71px"};
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

class Dashboard extends Component<{}> {
  // -- render -------------------------------------------------------------- //
  render() {
    return (
      <Background>
        <Container>
          <Route exact path="/" component={AccountsView} />
          <Route path="/transactions" component={TransactionsView} />
          <Route path="/settings" component={SettingsView} />
        </Container>
        <Navigation />
      </Background>
    );
  }
}

export default Dashboard;

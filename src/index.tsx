import * as React from "react";
import { StatusBar, Platform } from "react-native";
import { Provider } from "mobx-react/native";
import Router from "./routes";
import store from "./store";
import { androidStatusbar } from "./style/color";

class App extends React.Component<{}, {}> {
  // --- render --- //
  render() {
    return [
      <StatusBar
        barStyle="light-content"
        backgroundColor={Platform.OS === "android" ? androidStatusbar : "transparent"}
        key="statusbar"
      />,
      <Provider {...store} key="provider">
        <Router />
      </Provider>
    ];
  }
}

export default App;

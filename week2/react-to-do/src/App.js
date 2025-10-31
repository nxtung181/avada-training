import React from "react";
import TodoList from "./components/todolist/TodoList.js";
import Header from "./components/header/Header.js";
import { AppProvider } from '@shopify/polaris';

function App() {
  return (
    <AppProvider i18n={{}}>
      <Header>
        <TodoList />
      </Header>
    </AppProvider>
  );
}

export default App;
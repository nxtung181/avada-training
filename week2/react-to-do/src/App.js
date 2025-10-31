import TodoList from "./components/todolist/TodoList.js";
import Header from "./components/header/Header.js";
import { AppProvider } from '@shopify/polaris';
import { Frame } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={{}}>
      <Frame
        topBar={<Header />}
      >
        <TodoList />
      </Frame>
    </AppProvider>
  );
}

export default App;
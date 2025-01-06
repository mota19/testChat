import { FC } from "react";
import Chat from "./pages/Chat";
import { store } from "./Redux/Store/store";
import { Provider } from "react-redux";

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <Chat></Chat>
      </Provider>
    </>
  );
};

export default App;

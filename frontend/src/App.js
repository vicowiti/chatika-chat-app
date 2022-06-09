import { Route, Routes } from "react-router-dom";
import ChatsPage from "./pages/ChatsPage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;

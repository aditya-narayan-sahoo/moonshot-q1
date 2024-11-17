import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MasterDetailPage from "./pages/MasterDetailPage";
import { EmailProvider } from "./context/EmailContext";
import Header from "./components/Header";
const App = () => {
  return (
    <EmailProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/email/:id" element={<MasterDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </EmailProvider>
  );
};

export default App;

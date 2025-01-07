import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import { ToastContainer, toast } from "react-toastify";
import ItemDetails from "./pages/ItemDetailsPage";
import Authentication from "./pages/Authentication";
import Verify from "./pages/Verify";
import ItemDetailsPage from "./pages/ItemDetailsPage";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/itemDetail" element={<ItemDetails></ItemDetails>}></Route>
        <Route path="/auth" element={<Authentication></Authentication>}></Route>
        <Route path="/verify" element={<Verify></Verify>}></Route>
        <Route
          path="/itemDetails/"
          element={<ItemDetailsPage/>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

export default function RootLayout() {
  return (
    <>
      <NavbarComponent />
      <div>
        <Outlet />
      </div>
      <FooterComponent />
    </>
  );
}

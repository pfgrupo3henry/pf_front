import { useState, useEffect, useRef } from "react";
import { Badge } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { RiShoppingCartLine } from "react-icons/ri";
import DropdownShoppingCart from "./DropdownShoppingCart";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const Swal = require("sweetalert2");
  const { isAuthenticated } = useAuth0();
  const cookie = new Cookies();
  const cookieId = cookie.get("firstname");
  const [shoppingCartRender, setShoppingCartRender] = useState(false);
  const shoppingCartRef = useRef(null);
  const shoppingChart = useSelector((state) => state.shoppingChart);

  const handleLoginClick = () => {
    Swal.fire({
      title: "Error!",
      text: "Debes iniciar sesion",
      icon: "error",
      confirmButtonText: "Ok",
    }).then((res) => {
      window.location.href = "/login";
    });
  };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        shoppingCartRef.current &&
        !shoppingCartRef.current.contains(e.target)
      ) {
        setShoppingCartRender(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleShoppingCartClick = () => {
    setShoppingCartRender(!shoppingCartRender);
  };

  return (
    <div ref={shoppingCartRef} className="main">
      <Badge
        count={shoppingChart.products ? shoppingChart.products.length : "0"}
        size="small"
        style={{ backgroundColor: "#1976D2" }}>
        <RiShoppingCartLine
          onClick={() => {
            isAuthenticated || cookieId
              ? handleShoppingCartClick()
              : handleLoginClick();
          }}
          className={!isAuthenticated && !cookieId ? "cartAux" : "cart"}
        />
      </Badge>
      {shoppingCartRender && <DropdownShoppingCart />}
    </div>
  );
};

export default ShoppingCart;

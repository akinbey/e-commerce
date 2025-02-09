import React, { useState } from "react";
import "../css/Header.css";
import { SlBasket } from "react-icons/sl";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlices";
import { setSearchTerm } from "../redux/slices/searchSlices"; // ⬅ Arama işlemi için ekledik

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((store) => store.basket); //sepette kac farklı ürün oldugunu aldık ve sepetin üstüne kac adet ürün oldugunu yazdırıcaz. (length ile)

  // dark tema
  const [theme, setTheme] = useState(false); //! theme için bir state tanımladık

  const changeTheme = () => {
    const root = document.querySelector("#root"); //! root'u yakaladık
    const body = document.body; //!  body'yi yakaladık
    console.log(root); //! root'u consolda gördük
    if (!theme) {
      //! state'de false olarak tanımlandı. tıklandıgında arka plan siyah, yazılar beyaz olucak ve true olur
      root.style.backgroundColor = "black";
      root.style.color = "#fff";
      body.style.backgroundColor = "black"; //! body içerisinin arkaplanını siyah yapar
      body.style.color = "#fff"; //! body içerisini beyaz yapar
    } else {
      root.style.backgroundColor = "#fff"; //! true iken tıkladıgımızda calısır ve false olur
      root.style.color = "black";
      body.style.backgroundColor = "#fff"; //! body içerisinin arkaplanını beyaz yapar
      body.style.color = "black"; //! body içerisini siyah yapar
    }
    setTheme(!theme);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: "1rem",
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        className="flex-row"
        onClick={() => navigate("/")}
      >
        <img className="logo" src="./src/images/logo.png" alt="" />
        <p className="logo-text">AKIN A.Ş</p>
      </div>

      <div className="flex-row">
        <input
          className="search-input"
          type="text"
          placeholder="Bir şeyler ara"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))} // ⬅ Redux’a kaydediyoruz
        />
        <div>
          {/* theme true ise ay çıkar, false ise günes cıkar */}
          {theme ? (
            <FaMoon className="icons" onClick={changeTheme} />
          ) : (
            <CiLight
              className="icons"
              onClick={changeTheme}
              style={{ marginRight: "0.5rem" }}
            />
          )}
          <Badge
            onClick={() => dispatch(setDrawer())}
            badgeContent={products.length}
            color="error"
          >
            <SlBasket
              className="icons"
              style={{ marginBottom: "0.80rem", marginRight: "0.6rem" }}
            />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;

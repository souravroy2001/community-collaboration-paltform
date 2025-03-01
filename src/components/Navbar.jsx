import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoCloseSharp, IoSunny } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosMoon } from "react-icons/io";
import { ThemeProvider } from "../context/ThemeAuth";
import { LogAuthContext } from "../context/LogAuth";
import { doSignout } from "../firebase/auth";
import { Avatar } from "./ui/avatar";

function Navbar() {
  const [menuToggle, setMenuToggle] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeProvider);
  const { userLogin } = useContext(LogAuthContext);

  function toggleMenu() {
    setMenuToggle((prev) => !prev);
  }

  return (
    <>
      <Flex
        justify={"space-between"}
        align={"center"}
        w={"100%"}
        p={5}
        bg={theme ? "gray.200" : "gray.800"}
        position={"fixed"}
        top={0}
        zIndex={9999}
      >
        <Box w={"10%"}>
          <Link to={"/"}>
            <Image
              src={
                theme
                  ? "https://souravlife.com/wp-content/uploads/2024/09/a-logo-for-sourav-roy-with-subtle-tech-inspired-el-hqK357erTi-pPerV4yEa8Q-DdmIt3WnRX2tO4sjiJfgcg-removebg-preview-1.png"
                  : "https://souravlife.com/work/library/image/Sourav%20Roy%20White%20Red%20Logo.png"
              }
              w={"100px"}
            />
          </Link>
        </Box>
        <Flex
          w={"70%"}
          justify={"end"}
          align={"center"}
          fontSize={"2xl"}
          gap={5}
        >
          <Flex
            w={"70%"}
            justify={"space-around"}
            align={"center"}
            fontSize={"2xl"}
            id="largeMenu"
            color={theme ? "#000" : "#fff"}
          >
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/people"}>People</NavLink>
            <NavLink to={"/salary"}>Add Todo</NavLink>
            <NavLink to={"/calendar"}>Calendar</NavLink>
            {userLogin ? (
              <NavLink to={"./logout"} onClick={doSignout}>
                Logout
              </NavLink>
            ) : (
              <NavLink to={"/login"}>Login</NavLink>
            )}
          </Flex>
          <Flex
            w={"fit-content"}
            justify={"space-around"}
            align={"center"}
            fontSize={"2xl"}
            gap={5}
          >
            <Button onClick={toggleTheme}>
              {theme ? <IoSunny /> : <IoIosMoon />}
            </Button>
            {userLogin && (
              <Avatar
                name="Sourav Roy"
                src={
                  theme
                    ? "/Default Profile Image In Black Color.svg"
                    : "/Default Profile Image In White Color.svg"
                }
              />
            )}
            <Button id="hamburger" display={"none"} onClick={toggleMenu}>
              {menuToggle ? <GiHamburgerMenu /> : <IoCloseSharp />}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;

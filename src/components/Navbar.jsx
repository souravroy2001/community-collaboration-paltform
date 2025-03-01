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
import { ProfileProvider } from "@/context/ProfileContext";

function Navbar() {
  const [menuToggle, setMenuToggle] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeProvider);
  const { userLogin } = useContext(LogAuthContext);
  const { profileImage } = useContext(ProfileProvider)

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
        bg={theme ? "gray.200" : "#131c2e"}
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
            <NavLink to={"/community"}>Community</NavLink>
            <NavLink to={"/post-creator"}>Post Creator</NavLink>
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
                as={Link}
                to="/profile"
                name="Sourav Roy"
                src={profileImage}
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

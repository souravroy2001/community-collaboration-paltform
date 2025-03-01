import React, { useContext, useState } from "react";
import LoginPage, {
  Logo,
  Username,
  Password,
  Footer,
  Title,
} from "@react-login-page/page6";
import { LogAuthContext } from "../context/LogAuth";
import { Link } from "react-router-dom";
import { Image, Alert, Flex, Button } from "@chakra-ui/react";
import { loginUser, registerWithGoogleUser } from "../firebase/auth";
import { ThemeProvider } from "../context/ThemeAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
function LoginForm() {
  const { theme } = useContext(ThemeProvider);
  const { userLogin, loading, currentUser } = useContext(LogAuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const finalData = Object.fromEntries(formData);

    try {
      await loginUser(finalData.email, finalData.password);
      setError("Login successful");
    } catch (error) {
      setError("Failed to login:", error.message);
    }
  }

  async function handleGoogleLogin() {
    try {
      await registerWithGoogleUser();
      setError("Google login successful");
    } catch (error) {
      setError("Google login failed:", error.message);
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <LoginPage
        style={{
          height: 990,
          background: theme ? "#edeff3" : "#080710",
          color: theme ? "#000" : "#fff",
        }}
      >
        <Title>
          <Logo>
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
          </Logo>
        </Title>

        <Flex
          position={"absolute"}
          top={"400px"}
          justify={"center"}
          align={"center"}
          flexDir={"column"}
          width={"100%"}
          zIndex={99}
        >
          {error && (
            <Alert
              background={theme ? "#edeff3" : "#080710"}
              color={theme ? "#000" : "#fff"}
              w={400}
              position={"absolute"}
              top={-180}
              rounded={"2xl"}
              status="error"
              mb={4}
            >
              {error}
            </Alert>
          )}
          <Button
            bg={theme ? "#eff1f5" : "#28272f"}
            color={theme ? "#000" : "#fff"}
            mt={-300}
            onClick={handleGoogleLogin}
            cursor={"pointer"}
          >
             <IoLogoGoogle />
          </Button>
        </Flex>

        <Username visible={false} />
        <Password visible={false} />
        <Username
          required
          type="email"
          keyname="Email"
          index={2}
          placeholder="Enter Your Email"
          label="Email"
        />
        <Password
          required
          keyname="Password"
          index={3}
          label="Password"
          placeholder="Enter Your Password"
          type={showPassword ? "text" : "password"}
        />

        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          id="showPassword"
          position={"absolute"}
          top={"calc(550px - 30px)"}
          right={"calc(630px - 70px)"}
        >
          {showPassword ? (
            <FaEyeSlash color={"#fff"} />
          ) : (
            <FaEye color={"#fff"} />
          )}
        </Button>

        <Footer style={{ color: theme ? "#000" : "#fff" }}>
          Not a member?{" "}
          <Link style={{ color: theme ? "#000" : "#fff" }} to={"/register"}>
            Sign up now
          </Link>
        </Footer>
      </LoginPage>
    </form>
  );
}

export default LoginForm;

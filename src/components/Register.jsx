import React, { useContext, useState, useCallback } from "react";
import LoginPage, {
  Logo,
  Footer,
  Username,
  Password,
  Title,
} from "@react-login-page/page6";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeAuth";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import _ from "lodash";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser, registerWithGoogleUser } from "../firebase/auth";
import { IoLogoGoogle } from "react-icons/io5";

function Register() {
  const { theme } = useContext(ThemeProvider);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  // Function to validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordStrength(
        "Password must include at least one uppercase letter."
      );
    } else if (!/[a-z]/.test(password)) {
      setPasswordStrength(
        "Password must include at least one lowercase letter."
      );
    } else if (!/\d/.test(password)) {
      setPasswordStrength("Password must include at least one number.");
    } else if (!/[@$!%*?&]/.test(password)) {
      setPasswordStrength(
        "Password must include at least one special character."
      );
    } else if (password.length < 8) {
      setPasswordStrength("Password must be at least 8 characters long.");
    } else {
      setPasswordStrength("Strong password!");
    }
  };

  const throttledValidatePasswordStrength = useCallback(
    _.throttle(validatePasswordStrength, 300),
    []
  );

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      throttledValidatePasswordStrength(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password } = formData;

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsRegistering(true);

    try {
      await registerUser(name, email, password);
      console.log("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      const errorCode = err.code;

      let errorMessage = "An error occurred.";
      if (errorCode === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (errorCode === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (errorCode === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      }

      setError(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <LoginPage
          style={{
            height: 990,
            background: theme ? "#edeff3" : "#080710",
            color: theme ? "#000" : "#fff",
          }}
        >
          <Title>
            <Logo>
              <Link to={"/dashboard"}>
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

          <Username visible={false} />
          <Password visible={false} />

          <Username
            required
            keyname="Name"
            name="name"
            index={1}
            placeholder="Enter Name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Username
            required
            type="email"
            keyname="Email"
            name="email"
            index={2}
            placeholder="Enter Your Email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Password
            required
            keyname="Password"
            name="password"
            index={3}
            label="Password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleInputChange}
            type={showPassword ? "text" : "password"}
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            id="showPassword"
            position={"absolute"}
            top={"calc(590px - 25px)"}
            right={"calc(640px - 80px)"}
          >
            {showPassword ? (
              <FaEyeSlash className="eyeIcon" color={"#fff"} />
            ) : (
              <FaEye className="eyeIcon" color={"#fff"} />
            )}
          </Button>

          <Footer style={{ color: theme ? "#000" : "#fff" }}>
            Already have an account?{" "}
            <Link style={{ color: theme ? "#000" : "#fff" }} to={"/login"}>
              Sign in now
            </Link>
          </Footer>
        </LoginPage>
      </form>

      <Flex
        position={"absolute"}
        top={"400px"}
        justify={"center"}
        align={"center"}
        flexDir={"column"}
        width={"100%"}
        zIndex={99}
      >
        <Box>
          {error && (
            <Text
              position={"absolute"}
              top={"310px"}
              left={650}
              style={{ color: "#f00", marginBottom: "10px" }}
            >
              {error}
            </Text>
          )}
        </Box>
        <Box>
          <Text
            color={passwordStrength === "Strong password!" ? "green" : "red"}
            fontSize={"14px"}
            position={"absolute"}
            top={"210px"}
            textAlign={"center"}
            left={"550px"}
          >
            {passwordStrength && passwordStrength}
          </Text>
        </Box>
        <Button
          bg={theme ? "#eff1f5" : "#28272f"}
          color={theme ? "#000" : "#fff"}
          mt={-400}
          onClick={registerWithGoogleUser}
          cursor={"pointer"}
        >
          <IoLogoGoogle />
        </Button>
      </Flex>
    </>
  );
}

export default Register;

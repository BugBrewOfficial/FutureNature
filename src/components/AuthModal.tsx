import { useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import CustomInputError from "./CustomInputError";
import { userApi } from "../api/userApi";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<"PHONE" | "OTP" | "REGISTER">("PHONE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const truncated = digits.slice(0, 10);
    if (truncated.length > 5) {
      return `${truncated.slice(0, 5)} ${truncated.slice(5)}`;
    }
    return truncated;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }
  };

  const validateIndianMobile = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, "");
    return /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateRegistration = () => {
    const newErrors: Record<string, string> = {};
    if (!signupData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!signupData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!signupData.password || signupData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerOtp = async () => {
    const cleanPhone = phoneNumber.replace(/\s/g, "");
    if (!validateIndianMobile(cleanPhone)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Please enter a valid 10-digit Indian mobile number",
      }));
      return;
    }

    try {
      await userApi.triggerOtp(cleanPhone);
      toast.success("OTP sent successfully");
      setStep("OTP");
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        otp: "Please enter a valid 6-digit OTP",
      }));
      return;
    }

    const cleanPhone = phoneNumber.replace(/\s/g, "");
    try {
      const response = await userApi.verifyOtp(cleanPhone, otp);
      const data = response.data;

      if (!data.status) {
        setErrors((prev) => ({ ...prev, otp: data.message || "Invalid OTP" }));
        return;
      }

      if (data.data.code === "EXISTING_CUSTOMER") {
        Cookies.set("token", data.data.token, { expires: 7 });
        toast.success("Login successful");
        onClose();
        resetState();
      } else if (data.data.code === "NEW_CUSTOMER") {
        setStep("REGISTER");
        toast.success("OTP verified. Please complete your profile.");
        setErrors({});
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying OTP");
    }
  };

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegistration()) return;

    const cleanPhone = phoneNumber.replace(/\s/g, "");

    try {
      await userApi.register({
        ...signupData,
        mobileNumber: cleanPhone,
      });

      toast.success("Registration successful");
      onClose();
      resetState();
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  const resetState = () => {
    setStep("PHONE");
    setPhoneNumber("");
    setOtp("");
    setSignupData({
      firstName: "",
      lastName: "",
      password: "",
    });
    setErrors({});
  };

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  return (
    <>
      <Toaster />
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 9998,
          animation: "fadeIn 0.3s ease-in-out",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "30px 40px 35px",
          width: "90%",
          maxWidth: "460px",
          maxHeight: "90vh",
          overflowY: "auto",
          zIndex: 9999,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          animation: "slideUp 0.3s ease-in-out",
          transition: "max-width 0.3s ease",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: "#999",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
            e.currentTarget.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#999";
          }}
        >
          ×
        </button>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <Image
            src="/Assets/logo.png"
            alt="FutureNature Logo"
            width={130}
            height={65}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {step === "REGISTER" ? "Complete Profile" : "Login / Sign up"}
        </h2>

        {step === "PHONE" && (
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#1f2937",
                marginBottom: "5px",
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="XXXXX XXXXX"
              maxLength={11} // 10 digits + 1 space
              style={{
                width: "100%",
                padding: "14px 18px",
                fontSize: "15px",
                border: `2px solid ${errors.phoneNumber ? "#ef4444" : "#e5e7eb"
                  }`,
                borderRadius: "12px",
                backgroundColor: "white",
                color: "#1f2937",
                outline: "none",
                transition: "border-color 0.2s",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
              onFocus={(e) =>
              (e.currentTarget.style.borderColor = errors.phoneNumber
                ? "#ef4444"
                : "#FFB400")
              }
              onBlur={(e) =>
              (e.currentTarget.style.borderColor = errors.phoneNumber
                ? "#ef4444"
                : "#e5e7eb")
              }
            />
            <CustomInputError message={errors.phoneNumber} />
            <button
              onClick={triggerOtp}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "17px",
                fontWeight: "700",
                color: "#1f2937",
                backgroundColor: "#FFB400",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                marginTop: "20px",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(255, 180, 0, 0.3)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#FFB400";
                e.currentTarget.style.color = "#1f2937";
              }}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === "OTP" && (
          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#1f2937",
                marginBottom: "5px",
              }}
            >
              Enter OTP sent to <b>{phoneNumber}</b>
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                margin: "20px 0",
              }}
            >
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                renderSeparator={<span style={{ width: "8px" }}></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "45px",
                  height: "55px",
                  fontSize: "20px",
                  fontWeight: "600",
                  textAlign: "center",
                  border: `2px solid ${errors.otp ? "#ef4444" : "#e5e7eb"}`,
                  borderRadius: "12px",
                  backgroundColor: "white",
                  color: "#1f2937",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                }}
              />
              <CustomInputError message={errors.otp} />
            </div>
            <button
              onClick={verifyOtp}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "17px",
                fontWeight: "700",
                color: "#1f2937",
                backgroundColor: "#FFB400",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(255, 180, 0, 0.3)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#FFB400";
                e.currentTarget.style.color = "#1f2937";
              }}
            >
              Verify & Login
            </button>
            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              <button
                onClick={() => setStep("PHONE")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#FFB400",
                  fontWeight: "600",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Change Number
              </button>
            </p>
          </div>
        )}

        {step === "REGISTER" && (
          <form onSubmit={registerUser}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "5px",
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: `1px solid ${errors.firstName ? "#ef4444" : "#e5e7eb"
                      }`,
                  }}
                />
                <CustomInputError message={errors.firstName} />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "5px",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: `1px solid ${errors.lastName ? "#ef4444" : "#e5e7eb"
                      }`,
                  }}
                />
                <CustomInputError message={errors.lastName} />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "5px",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: `1px solid ${errors.password ? "#ef4444" : "#e5e7eb"
                      }`,
                  }}
                />
                <CustomInputError message={errors.password} />
              </div>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "17px",
                fontWeight: "700",
                color: "#1f2937",
                backgroundColor: "#FFB400",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(255, 180, 0, 0.3)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#FFB400";
                e.currentTarget.style.color = "#1f2937";
              }}
            >
              Complete Registration
            </button>
          </form>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}

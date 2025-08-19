import React, { useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  type CredentialResponse,
} from "@react-oauth/google";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { customAxiosInstance } from "@/api/axios";

const APP_URL = import.meta.env.DEV
  ? "http://localhost:5173"
  : "https://app.postifyai.com";

const CTA = () => {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"signup" | "code-login">("signup");
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;

    try {
      await customAxiosInstance({
        url: "/auth/browser/start/",
        method: "POST",
        data: { email: email },
      });

      setStep("code-login");
    } catch (error: any) {
      // 401 means the code was sent successfully
      if (error?.response?.status === 401) {
        console.debug("Code sent successfully");
        setStep("code-login");
        return;
      }

      // Handle other errors
      console.error(error);
    }
  };

  const handleCodeLogin = async (code: string) => {
    try {
      await customAxiosInstance({
        url: "/auth/browser/code/confirm/",
        method: "POST",
        data: { code: code },
      });

      console.log("Logged in with code");
      setIsUserAuthenticated(true);
      // Navigate to the app in a new tab
      window.open(`${APP_URL}`, "_blank");
    } catch (error: any) {
      console.error("Error logging in with code", error);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No credential found");
      return;
    }

    // Send the credential to the allauth api provider token endpoint
    try {
      await customAxiosInstance({
        url: "/auth/browser/provider/token/",
        method: "POST",
        data: {
          provider: "google",
          process: "login",
          token: {
            client_id: credentialResponse.clientId ?? "",
            id_token: credentialResponse.credential,
          },
        },
      });

      console.debug("Logged in with Google");
      setIsUserAuthenticated(true);

      // Navigate to the app in a new tab
      window.open(`${APP_URL}`, "_blank");
    } catch (error: any) {
      console.error("Error logging in with Google", error);
    }
  };

  // CSS animation styles
  const flashButtonStyle = {
    animation: "flashGradient 4s steps(1, jump-end) infinite",
    background: "#000000",
    border: "2px solid var(--color-primary)",
  };

  // Add CSS keyframes to document head
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes flashGradient {
        0%, 50% {
          background: #000000;
        }
        25%, 75% {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%);
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // useEffect to check if the user is logged in
  React.useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await customAxiosInstance({
          url: "/auth/user/me/",
          method: "GET",
        });

        setIsUserAuthenticated(true);
      } catch (error: any) {
        console.error("Error checking if user is logged in", error);
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-2xl px-8 pb-8 pt-2 border border-gray-100 relative">
      {/* Green Speech Bubble Banner */}
      <div
        className="hidden lg:block absolute -top-10 left-18 bg-green-400 text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg transform rotate-10 whitespace-nowrap"
        //   style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%);"
      >
        ✨ Your first SEO blog post is free!
      </div>

      <div className="mt-6">
        {step === "signup" && !isUserAuthenticated && (
          <form onSubmit={handleEmailLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-500"
                required
              />
            </div>

            {/* Main CTA Button with Flash Animation */}
            <button
              type="submit"
              data-umami-event="Signup button"
              className="hidden sm:block w-full text-white py-3 px-6 rounded-lg font-semibold text-center mb-4 hover:cursor-pointer hover:scale-105 hover:shadow-lg"
              style={flashButtonStyle}
            >
              Create your first SEO blog post now →
            </button>

            <button
              type="submit"
              data-umami-event="Signup button"
              className="block sm:hidden w-full text-white py-3 px-6 rounded-lg font-semibold text-center mb-4 hover:cursor-pointer hover:scale-105 hover:shadow-lg"
              style={flashButtonStyle}
            >
              Create your first SEO blog post now →
            </button>
          </form>
        )}

        {step === "code-login" && !isUserAuthenticated && (
          <div className="flex flex-col items-center justify-center my-10">
            <div className="text-muted-foreground text-center text-sm">
              We've sent you a code to your email. Please enter it below.
            </div>
            <div className="flex w-full justify-center">
              <InputOTP maxLength={6} onComplete={handleCodeLogin}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        )}

        {isUserAuthenticated && (
          <div
            onClick={() => {
              window.location.href = APP_URL;
            }}
            className="text-center text-sm text-white mt-12 mb-4 hover:cursor-pointer rounded-lg p-4 transition-colors"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)",
            }}
          >
            Go to the App
          </div>
        )}

        {/* Stats */}
        <div className="text-center text-sm text-gray-600 mb-4">
          ⭐ 2.318 SEO blog posts created this month
        </div>

        {!isUserAuthenticated && (
          <>
            {/* <!-- Separator with " o " in the middle --> */}
            <div className="flex justify-center items-center">
              <div className="w-full h-px bg-gray-200 my-4"></div>
              <span className="text-gray-500 px-2">or</span>
              <div className="w-full h-px bg-gray-200 my-4"></div>
            </div>

            {/* Google Login */}
            <GoogleOAuthProvider clientId="370259082711-8t6vtage248pl6vjaulcom3nve1qes1r.apps.googleusercontent.com">
              <div className="flex justify-center w-full">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log("Google Login Failed")}
                  // useOneTap // Optional: show auto-login prompt
                  theme="outline"
                  type="standard"
                  shape="circle"
                  text="signin_with"
                  size="large"
                />
              </div>
            </GoogleOAuthProvider>
          </>
        )}

        <div className="text-center text-xs text-gray-500 mt-3">
          If you already have an account, we'll log you in automatically
        </div>
      </div>
    </div>
  );
};

export default CTA;

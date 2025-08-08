import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const CTA = () => {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const processNewUser = async (email: string) => {
    // Send the email to the waitlist
    try {
      const response = await fetch("https://waitlist.hlab.es/waitlist/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waitlist_name: "postifyai_signup",
          email: email,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        "We're having problems signing you up. Please try again later."
      );
    }

    // Add the email to the url
    window.history.pushState({}, "", `?email=${email}#pricing`);

    // Redirect the user to the pricing section #pricing
    // window.location.href = '#pricing';
    // document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    const section = document.getElementById("pricing");
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY + 350;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the email from the form
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;

    // The form will not submit if the email is invalid due to the "required" and "type=email" attributes
    setStatus("loading");

    processNewUser(email);
  };

  const handleGoogleLogin = (credentialResponse: any) => {
    console.log("Google login");
    const decoded: any = jwtDecode(credentialResponse.credential);
    const email = decoded.email;
    console.log("Collected email:", email);

    processNewUser(email);
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

  return (
    <div className="bg-white rounded-2xl shadow-2xl px-8 pb-8 pt-2 border border-gray-100 relative">
      {/* Green Speech Bubble Banner */}
      <div
        className="hidden lg:block absolute -top-6 left-12 bg-green-400 text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg transform rotate-10 whitespace-nowrap"
        //   style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%);"
      >
        ✨ Create your first SEO blog post in seconds!
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit}>
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

        {/* Stats */}
        <div className="text-center text-sm text-gray-600 mb-4">
          ⭐ 2.318 SEO blog posts created this month
        </div>

        {/* <!-- Separator with " o " in the middle --> */}
        <div className="flex justify-center items-center">
          <div className="w-full h-px bg-gray-200 my-4"></div>
          <span className="text-gray-500 px-2">or</span>
          <div className="w-full h-px bg-gray-200 my-4"></div>
        </div>

        {/* Google Login */}
        <GoogleOAuthProvider clientId="485134929350-3re79pjtshq7dhhvcike13e9a1nmh1c5.apps.googleusercontent.com">
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

        <div className="text-center text-xs text-gray-500 mt-3">
          If you already have an account, we'll log you in automatically
        </div>
      </div>
    </div>
  );
};

export default CTA;

import { customAxiosInstance } from "@/api/axios";
import { useState } from "react";

const PricingTable = () => {
  const [isYearly, setIsYearly] = useState(true);

  const checkIfLoggedIn = async () => {
    try {
      await customAxiosInstance({
        url: "/auth/user/me/",
        method: "GET",
      });

      return true;
    } catch (error) {
      console.error("Error checking if user is logged in", error);
      return false;
    }
  };

  const handleClick = async (plan: string) => {
    if (plan === "github") {
      window.open("https://github.com/dontic/postifyai", "_blank");
      return;
    }

    // Check if the user is authenticated
    const isUserAuthenticated = await checkIfLoggedIn();

    if (!isUserAuthenticated) {
      window.location.href = "/#hero";
      return;
    }

    // Otherwise, redirect the user to the app in a new window
    window.open(`https://app.postifyai.com`, "_blank");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-default mb-4">
            Transparent pricing
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center mt-8 mb-8">
            <div className="flex items-center justify-center">
              <span
                className={`mr-3 text-lg font-medium ${!isYearly ? "text-default" : "text-muted"}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative hover:cursor-pointer inline-flex items-center h-8 rounded-full w-16 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isYearly ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform ${
                    isYearly ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`ml-3 text-lg font-medium ${isYearly ? "text-default" : "text-muted"}`}
              >
                Yearly
              </span>
            </div>
            <div className="mt-3 h-6 flex items-center">
              {isYearly && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  2 months free!
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-default mb-2">
                Open Source
              </h3>
              <p className="text-muted mb-6">For casual use</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-default">
                  {isYearly ? "Free" : "Free"}
                </span>
              </div>
              <div className="text-center mb-6">
                <span className="text-lg text-muted font-medium">
                  Postify AI is an open-source project!
                </span>
              </div>

              <button
                data-umami-event="GitHub Repo"
                onClick={() => handleClick("github")}
                className="flex w-full text-center justify-center hover:cursor-pointer bg-gray-100 text-default py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                GitHub Repo →
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Completely free to use version
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Basic blog articles</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Perfect for technical people that know how to code
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Self host with Docker</span>
              </div>
            </div>
          </div>

          {/* Standard Plan (Popular) */}
          <div className="bg-white border-2 border-primary rounded-2xl p-8 shadow-lg relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                {" "}
                Most popular{" "}
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-default mb-2">Standard</h3>
              <p className="text-muted mb-6">Covers all your needs</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  💶 ${isYearly ? "24.90" : "29.90"}
                </span>
                <span className="text-muted ml-2">/month</span>
              </div>
              {isYearly ? (
                <div className="text-center mb-6">
                  <span className="text-lg text-muted font-medium">
                    $298.80 billed annually
                  </span>
                  <span className="block text-sm text-green-600 font-medium">
                    You get 2 months free!
                  </span>
                </div>
              ) : (
                <div className="text-center mb-6">
                  <span
                    className="text-lg text-muted hover:cursor-pointer underline decoration-1 decoration-blue-400 hover:text-blue-400"
                    onClick={() => setIsYearly(true)}
                  >
                    or $24.90/month
                  </span>
                  <span
                    onClick={() => setIsYearly(true)}
                    className="block text-sm text-green-600 font-medium hover:cursor-pointer hover:underline decoration-1 decoration-blue-400 hover:text-blue-400"
                  >
                    Save 2 months by paying yearly!
                  </span>
                </div>
              )}
              <button
                data-umami-event="Standard plan"
                onClick={() => handleClick("standard")}
                className="w-full cta-primary mb-6"
              >
                Start for free! →
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  <strong>Zero configuration, zero maintenance</strong>
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Up to 10 blog posts per month
                  <br />
                  ($2.90 per post after that)
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Brand analysis</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Enhanced genaration</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Keyword research</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Catered blog post title ideas
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Tech support</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Integration with your CMS (comming soon!)
                </span>
              </div>
            </div>
          </div>

          {/* Pay as you go Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-default mb-2">
                Pay as you go
              </h3>
              <p className="text-muted mb-6">Perfect for casual use</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-default">
                  💶 $4,90
                </span>
                <span className="text-muted ml-2">/blog post</span>
              </div>
              <div className="text-center mb-6">
                <span className="text-lg text-muted font-medium">
                  Add credits to your account and just pay for what you need.
                </span>
              </div>

              <button
                data-umami-event="Pay as you go"
                onClick={() => handleClick("pay-as-you-go")}
                className="flex w-full text-center justify-center hover:cursor-pointer bg-gray-100 text-default py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Start for free! →
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Zero configuration, zero maintenance
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Basic blog generation</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Manual brand awareness</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Automatic competitor awareness
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          {/* Money Back Guarantee - Prominent */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <svg
                className="w-6 h-6 text-green-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="text-lg font-semibold text-green-800">
                30 days money back guarantee
              </span>
            </div>
            <p className="text-green-700">
              If you're not completely satisfied, we'll refund your money, no
              questions asked
            </p>
          </div>

          <p className="text-muted mb-6">
            Have questions?{" "}
            <a href="#faq" className="text-primary hover:underline">
              Check our FAQ
            </a>{" "}
            o{" "}
            <a href="/contact/" className="text-primary hover:underline">
              contact us
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-muted">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              30 days free trial
            </div>
            <div className="flex items-center text-muted">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              No commitment
            </div>
            <div className="flex items-center text-muted">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Instant cancellation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;

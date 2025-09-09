import React from 'react';

const DOBResetScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6 w-80">
        {/* Heading Text */}
        <h2 className="text-lg font-semibold text-center mb-4">
          Enter Your Date of Birth
        </h2>

        {/* Date Input */}
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Date of Birth"
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DOBResetScreen;

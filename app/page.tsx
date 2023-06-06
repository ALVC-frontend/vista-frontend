"use client";
import React, { useState } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold"> 🕊️ Vista-Platform</h1>
        </div>
        <p className="text-black-700" style={{ fontFamily: 'Cursive', fontSize: '20px'}}>
        Welcome to Vista-platform. A world of you.
        Click on the button below to get started.
        </p>


        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={openModal}
        >
          start vista
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg z-20">
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Link 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Link 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Link 3
                </a>
              </li>
            </ul>
            <button
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

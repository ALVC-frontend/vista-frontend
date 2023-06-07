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
        <p className="text-black-700" style={{ fontFamily: 'Consolas', fontSize: '20px'}}>
        Welcome to Vista-platform. A world of you.
        Click on the button below to get started.
        </p>

        <br/>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={openModal}
        >
         <div style={{ display: 'flex', alignItems: 'center' }}>
  <span>start vista</span>
  <svg className="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z"/>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="9" strokeDasharray=".001 4.03" />
  </svg>
</div>

        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg z-20">
          <h2 className="text-xl font-bold mb-4">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Go To &nbsp;
            <svg className="h-6 w-6 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 16 16 12 12 8" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
          </span>
        </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="/articles"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                    Articles
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="/cities"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                 Cities
                </a>
              </li>
              <li>
                <a
                  href="/data-imports"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Data-imports
                </a>
              </li>
              <li>
                <a
                  href="organisations"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Organisations
                </a>
              </li>
              <li>
                <a
                  href="/partner-categories"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Partner-Categories
                </a>
              </li>
              <li>
                <a
                  href="/preference-group"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Preference-Groups
                </a>
              </li>
              <li>
                <a
                  href="/questions"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Questions
                </a>
              </li>
              <li>
                <a
                  href="/releases"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Releases
                </a>
              </li>
              <li>
                <a
                  href="/videos"
                  className="block px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Videos
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

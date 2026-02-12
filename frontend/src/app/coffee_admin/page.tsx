'use client';

import { useState } from 'react';

export default function AdminPortal() {
  const [passkey, setPasskey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkPasskey = () => {
    // an Env Var (passed to the client) works for a V1.
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setIsAuthorized(true);
    } else {
      alert("Wrong brew! Access denied.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfaf7] text-[#4a3f35]">
        <h1 className="text-2xl font-serif mb-4">Chapters & Filter Coffee Admin</h1>
        <input 
          type="password" 
          placeholder="Enter Secret Passkey"
          className="p-2 border border-[#d1ccc0] rounded mb-2 bg-white"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
        />
        <button 
          onClick={checkPasskey}
          className="bg-[#6b8e23] text-white px-6 py-2 rounded hover:bg-[#556b2f] transition"
        >
          Enter Library
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#fdfaf7] min-h-screen font-serif">
      <h1 className="text-3xl text-[#2f4f4f] mb-6">Welcome, Librarian.</h1>
      <p className="mb-4">Hi, I'm susan!</p>
      
      <div className="border-2 border-dashed border-[#d1ccc0] p-12 text-center text-[#8c857b]">
        [ AI Chat Interface Coming here, woohooo!!]
      </div>
    </div>
  );
}
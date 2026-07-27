"use client";

import React, { useState } from "react";

interface OwnerData {
  ownerName: string;
  email: string;
  phone: string;
  address: string;
}

interface OwnerRegistrationFormProps {
  onSubmit: (data: OwnerData) => void;
}

export default function OwnerRegistrationForm({
  onSubmit,
}: OwnerRegistrationFormProps) {

  const [formData, setFormData] = useState<OwnerData>({
    ownerName: "",
    email: "",
    phone: "",
    address: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
  };


  return (
    <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-xl">

      <div className="mb-6">
        <h2 className="text-xl font-black text-white">
          Owner Registration
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Enter store owner details before creating your ecommerce store.
        </p>
      </div>


      <form onSubmit={handleSubmit} className="space-y-4">


        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Owner Name
          </label>

          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Enter owner name"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
          />
        </div>



        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="owner@gmail.com"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
          />
        </div>



        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
          />
        </div>



        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter owner address"
            rows={3}
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 resize-none"
          />
        </div>



        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold text-white transition"
        >
          Continue →
        </button>


      </form>

    </div>
  );
}
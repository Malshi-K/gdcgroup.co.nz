"use client"
import { useState } from "react";
import Image from "next/image";
import axios from "axios"; // Add axios for API requests

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobNumber: "",
    feedback: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    const hubspotFormId = process.env.NEXT_PUBLIC_HUBSPOT_REVIEW_FORM_ID;

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

    const payload = {
      fields: [
        { name: "firstname", value: formData.firstName },
        { name: "lastname", value: formData.lastName },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "job_number", value: formData.jobNumber },
        { name: "message", value: formData.feedback },
      ],
    };

    try {
      await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("Thank you for your feedback!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobNumber: "",
        feedback: "",
      });
    } catch (error) {
      console.error("Error submitting form to HubSpot:", error);
      setMessage(
        "There was an error submitting your feedback. Please try again."
      );
    }
  };

  return (
    <div className="bg-off-white">
      <div className="max-w-xl mx-auto p-6">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/gdc-group-logo.png"
            alt="GDC Group Logo"
            className="mb-4 w-60"
            width={240}
            height={96}
          />
          <h2 className="text-2xl text-primary-navy font-semibold">
            Share Your Experience
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-light rounded-md text-black" // Ensure text color is visible
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-light rounded-md text-black" // Ensure text color is visible
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-dark">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@address.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-light rounded-md text-black" // Ensure text color is visible
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="phone"
                placeholder="+xx xx xxx xxxx"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-light rounded-md text-black" // Ensure text color is visible
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark">
                Job Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jobNumber"
                placeholder="Job Number"
                value={formData.jobNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-light rounded-md text-black" // Ensure text color is visible
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-dark">
              Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              type="text"
              name="feedback"
              placeholder="Your feedback..."
              value={formData.feedback}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-light rounded-md text-black" // Ensure text color is visible
              required
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-primary-blue-dark transition"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-dark border-l-4 border-accent-teal pl-3">{message}</p>}
      </div>
    </div>
  );
}

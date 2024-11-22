// components/CareerForm.js
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function CareerForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    field_of_interest: [],
    resume: null,
    // do_you_agree_to_our_contact_policy_: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "field_of_interest") {
      setFormData((prevState) => ({
        ...prevState,
        field_of_interest: checked
          ? [...prevState.field_of_interest, value]
          : prevState.field_of_interest.filter((field) => field !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let fileUrls = [];

    // Handle file uploads if files are selected
    if (formData.resume && formData.resume.length > 0) {
      try {
        for (let file of formData.resume) {
          const fileData = new FormData();
          fileData.append("file", file);

          const response = await axios.post("/api/upload", fileData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          fileUrls.push(...response.data.url); // URLs returned from HubSpot File Manager
        }
      } catch (uploadError) {
        setError("Error uploading files. Please try again.");
        console.error("File upload error:", uploadError);
        return;
      }
    }

    // Prepare the data for HubSpot
    const payload = {
      fields: [
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "address", value: formData.address },
        { name: "city", value: formData.city },
        { name: "state", value: formData.state },
        { name: "zip_code", value: formData.zip_code },
        { name: "country", value: formData.country },
        {
          name: "field_of_interest",
          value: formData.field_of_interest.join("; "),
        },
        {
          name: "resume",
          value: fileUrls.join(", "), // Include the HubSpot File URLs here
        },
        // {
        //   name: "do_you_agree_to_our_contact_policy_",
        //   value: formData.do_you_agree_to_our_contact_policy_,
        // },
      ],
    };

    try {
      // Use environment variables for the HubSpot API URL
      const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const hubspotFormId = process.env.NEXT_PUBLIC_HUBSPOT_CAREER_FORM_ID;
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

      // Make the POST request to HubSpot API
      await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess("Your application has been submitted successfully.");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        field_of_interest: [],
        resume: null,
        // do_you_agree_to_our_contact_policy_: false,
      });
    } catch (error) {
      setError(
        "There was an error submitting your application. Please try again."
      );
      console.error(
        "Error submitting to HubSpot:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 m-6 bg-white shadow-xl rounded-md">
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/images/GDC LOGOS 2024 BLUE.webp"
          alt="Logo"
          className="mb-4 w-60"
          width={240}
          height={96}
        />
        <h1 className="text-2xl text-customBlue font-semibold">Apply Now</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@address.com"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="071 234 5678"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="state"
              placeholder="State / Province / Region"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="text"
              name="zip_code"
              placeholder="Zip Code"
              value={formData.zip_code}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          {/* <div className="mb-4">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div> */}

          <div className="mb-4">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
            >
              <option value="">--- Select country ---</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Australia">Australia</option>
              <option value="UK">UK</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Singapore">Singapore</option>
              <option value="Sri Lanka">Sri Lanka</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Field of Interest
          </label>
          <div className="flex flex-col">
            {[
              "Civil",
              "Structural",
              "Architectural",
              "Geotechnical",
              "Planning",
              "Admin",
            ].map((field) => (
              <label
                key={field}
                className="inline-flex items-center mt-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  name="field_of_interest"
                  value={field}
                  onChange={handleChange}
                  checked={formData.field_of_interest.includes(field)}
                  className="mr-2"
                />
                {field}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cover Letter & Resume
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
            onClick={() => document.getElementById("resume-upload").click()}
          >
            <input
              type="file"
              id="resume-upload"
              name="resume"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-gray-500">
              Click or drag files to this area to upload. You can upload up to 2
              files.
            </p>
            {formData.resume && (
              <div className="mt-2 text-sm text-gray-600">
                {Array.from(formData.resume).map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* <div className="mb-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="do_you_agree_to_our_contact_policy_"
              checked={formData.do_you_agree_to_our_contact_policy_}
              onChange={handleChange}
              className="mr-2"
            />
            Do you agree to our&nbsp;
            <a href="#" className="text-blue-500 underline">
              contact policy
            </a>
            &nbsp;?
          </label>
        </div> */}

        <button
          type="submit"
          className="w-full bg-customBlue text-white py-2 px-4 rounded-md hover:bg-customYellow transition"
        >
          Submit Application
        </button>

        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}

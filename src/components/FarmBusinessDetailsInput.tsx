import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/arrow-icon.svg";

type BDAuth = {
  businessName: string;
  businessLocation: string;
  scaleBusiness: string;
  typeProduce: string;
};

function BusinessDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BDAuth>({
    businessName: "",
    businessLocation: "",
    scaleBusiness: "",
    typeProduce: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { businessName, businessLocation, scaleBusiness, typeProduce } =
      formData;

    if (!businessName || !businessLocation || !scaleBusiness || !typeProduce) {
      setError("Please fill in all fields before continuing.");
      return;
    }

    setError(null);
    // Later: send API request here
    navigate("/verifyd");
  };

  return (
    <div className="mt-2 md:mt-0 flex flex-col h-full">
      {/* Header */}
      <div className="relative gap-3 mb-6">
        <Link to="/createaccount">
          <img
            src={logo}
            className="w-6 absolute -left-4 md:-left-8top-0.5 hover:opacity-50"
            alt="Back"
          />
        </Link>
        <h1 className="text-green-btn font-bold text-md sm:text-lg">
          Farm/Business Details
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Business Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="businessName" className="font-medium">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            placeholder="Enter Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Business Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="businessLocation" className="font-medium">
            Farm/Business Location
          </label>
          <input
            type="text"
            id="businessLocation"
            name="businessLocation"
            placeholder="Enter Farm/Business Location"
            value={formData.businessLocation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Scale of Business */}
        <div className="flex flex-col gap-1">
          <label htmlFor="scaleBusiness" className="font-medium">
            Scale of Business
          </label>
          <select
            id="scaleBusiness"
            name="scaleBusiness"
            value={formData.scaleBusiness}
            onChange={handleChange}
            className="w-full text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Scale Of Business</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Type of Produce */}
        <div className="flex flex-col gap-1">
          <label htmlFor="typeProduce" className="font-medium">
            Type of Produce
          </label>
          <select
            id="typeProduce"
            name="typeProduce"
            value={formData.typeProduce}
            onChange={handleChange}
            className="w-full text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Type of Produce</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-btn text-white md:w-[300px] md:mx-auto py-2 rounded-md hover:bg-green-dark transition-colors mt-4 cursor-pointer"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default BusinessDetails;

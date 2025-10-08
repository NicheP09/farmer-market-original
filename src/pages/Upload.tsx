import React from "react";
import Sidebar from "../components/dashboard-components/Sidebar";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Produce {
  id: number;
  name: string;
  price: string;
  quantity: string;
  category: string;
  status: "Draft" | "Published";
  image: string;
}

const UploadProduceForm: React.FC = () => {
  const [produceList, setProduceList] = useState<Produce[]>([
    {
      id: 1,
      name: "Tomatoes",
      price: "₦1,200/kg",
      quantity: "50kg",
      category: "Fruits",
      status: "Draft",
      image: "https://via.placeholder.com/60x40.png?text=Tomatoes",
    },
    {
      id: 2,
      name: "Brown Rice",
      price: "₦4,200/kg",
      quantity: "30kg",
      category: "Grains",
      status: "Published",
      image: "https://via.placeholder.com/60x40.png?text=Rice",
    },
  ]);

  // Placeholder for backend integration
  const handleDelete = (id: number) => {
    setProduceList(produceList.filter((item) => item.id !== id));
    // later: call API DELETE /produce/:id
  };

  const handleEdit = (id: number) => {
    console.log("Edit item:", id);
    // later: navigate to edit page or open modal
  };
  return (
    <div className="flex w-full min-h-screen font-dm-sans">
      {/* Sidebar */}
      <Sidebar />
      <div className="mt-12 ">
        <div>Upload Produce</div>
        <div className="mb-8">
          <span></span>
          <img src="" alt="" />
        </div>

        <form className="space-y-6 max-w-3xl">
          {/* Produce Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Produce Name
            </label>
            <input
              type="text"
              placeholder="Enter the name of Produce"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Food Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Food Category
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Select food category</option>
            </select>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity Available (kg/bag)
              </label>
              <input
                type="number"
                placeholder="How many (Kg) do you have in store"
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Price per Unit (Naira per kg/bag)
              </label>
              <input
                type="number"
                placeholder="Enter amount per unit"
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Description
            </label>
            <textarea
              placeholder="Say something about the produce"
              className="w-full border rounded-md px-4 py-2 h-24"
            ></textarea>
          </div>

          {/* Available */}
          <div>
            <label className="block text-sm font-medium mb-2">Available</label>
            <input type="date" className="w-full border rounded-md px-4 py-2" />
          </div>

          {/* Start */}
          <div>
            <label className="block text-sm font-medium mb-2">Start</label>
            <input type="date" className="w-full border rounded-md px-4 py-2" />
          </div>

          {/* Farm Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Farm Location
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Select food category</option>
            </select>
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              className="w-full py-2 border-1 border-black/30 rounded-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-12 flex gap-2">
            <button
              type="submit"
              className="max-w-2xl bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700"
            >
              Submit
            </button>
            <button
              type="submit"
              className="max-w-2xl bg-transparent border border-green text-black font-bold py-3 px-6 rounded-md hover:bg-green-700"
            >
              Save as draft
            </button>
          </div>
        </form>

        <div className="mt-24 border-t-2 border-black/40 w-full">
          <h2 className="text-2xl font-bold mb-6">Uploaded Produce</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-3 px-4">#Order ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Categories</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {produceList.map((item) => (
                  <tr key={item.id} className="border-b text-gray-700">
                    <td className="py-3 px-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.price}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">{item.status}</td>
                    <td className="py-3 px-4 flex space-x-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Pencil size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduceForm;

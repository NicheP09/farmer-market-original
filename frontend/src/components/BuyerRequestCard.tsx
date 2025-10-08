
// --- TypeScript Interfaces ---
interface RequestedItem {
  name: string;
  quantity: number;
}

export interface BuyerRequest {
  // Exporting so it can be used in App.tsx
  id: string;
  name: string;
  location: string;
  distance: string;
  time: string;
  items: RequestedItem[];
  avatarUrl: string;
}

interface BuyerRequestCardProps {
  request: BuyerRequest;
}
// -----------------------------

export const BuyerRequestCard: React.FC<BuyerRequestCardProps> = ({
  request,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      {/* Buyer Info */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={request.avatarUrl}
          alt={request.name}
        />
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {request.name}
          </h3>
          <p className="text-sm text-gray-500">{request.location}</p>
        </div>
        <div className="ml-auto text-right text-sm text-gray-500">
          <p>{request.distance}</p>
          <p>{request.time}</p>
        </div>
      </div>

      {/* Requested Items */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Requested Item:
        </p>
        {request.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm text-gray-800 py-1 border-b border-gray-100 last:border-b-0"
          >
            <span>{item.name}:</span>
            <span className="font-medium">
              {item.quantity.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button className="w-full py-2 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out">
        Claim Order
      </button>
    </div>
  );
};

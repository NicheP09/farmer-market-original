import { useState } from "react";
import { X } from "lucide-react";
import type { User } from "./UserTable";

interface Props {
  user: User | null;
  onClose: () => void;
  onReject?: (user: User) => void;
  onMoreInfo?: (user: User) => void;
  onApprove?: (user: User) => void;
}

const UserDetailsModal = ({
  user,
  onClose,
  onReject,
  onMoreInfo,
  onApprove,
}: Props) => {
  const [viewImage, setViewImage] = useState<string | null>(null);

  if (!user) return null;
  return (
    <>
      {/* MODAL */}
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-end z-50 px-10 animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative animate-slideup"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-7 right-7 text-black hover:text-[#8c8c8c] "
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold mb-6 border-b text-black">
            User Details
          </h2>

          {/* User Info */}
          <div className="flex flex-col gap-2 text-black">
            <p className="p-5 shadow-md">
              <strong>Name:</strong> {user.name}
            </p>

            <p className="p-5 shadow-md">
              <strong>Role:</strong> {user.role}
            </p>

            <p className="p-5 shadow-md">
              <strong>Contact:</strong> {user.contact}
            </p>

            {/* DOCUMENTS */}
            <div className="mt-5">
              <h3 className="font-semibold mb-2 text-black">
                Submitted Document:
              </h3>

              <div className="flex justify-between items-center px-5 py-2 mb-2 shadow-md">
                <span>ID</span>
                <button
                  onClick={() => setViewImage(user.idImage || null)}
                  className="bg-[#e6e6e6] hover:bg-pri hover:text-white transition px-5 py-2 "
                >
                  View
                </button>
              </div>
              <div className="flex justify-between items-center px-5 py-2 shadow-md">
                <span>CAC</span>
                <button
                  onClick={() => setViewImage(user.cacImage || null)}
                  className="bg-[#e6e6e6] hover:bg-pri hover:text-white transition px-5 py-2 "
                >
                  View
                </button>
              </div>
            </div>

            {/* FOOTER BTNS */}
            <div className="mt-5 mb-3">
              <div className="flex justify-between items-center gap-2">
                {/* REJECT BUTTON */}
                <button
                  onClick={() => {
                    onReject?.(user);
                    onClose();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-6 rounded-md"
                >
                  Reject
                </button>

                {/* MORE INFO BUTTON */}
                <button
                  onClick={() => {
                    onMoreInfo?.(user);
                  }}
                  className="border text-black py-1.5 px-6 rounded-md"
                >
                  More info
                </button>

                {/* ACCEPT BUTTON */}
                <button
                  onClick={() => {
                    onApprove?.(user);
                  }}
                  className="bg-pri hover:bg-green-600 text-white py-1.5 px-6 rounded-md"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Viewer */}
      {viewImage && (
        <div
          className="
            fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4
            /* animate-fadeIn */
          "
          onClick={() => setViewImage(null)}
        >
          <div
            className="
              bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full relative
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewImage(null)}
              aria-label="Close document viewer"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            {viewImage ? (
              <img
                src={viewImage}
                alt="Document"
                className="w-[60%] h-auto mx-auto rounded-md"
              />
            ) : (
              <p className="text-center text-gray-500 py-8">
                No document available
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetailsModal;

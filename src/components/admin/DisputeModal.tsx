import { useState } from "react";
import { X } from "lucide-react";
import type { Dispute } from "./DisputeTable";

interface Props {
  dispute: Dispute | null;
  onClose: () => void;
  onBlacklist?: (dispute: Dispute) => void;
  onAdjustPayment?: (dispute: Dispute) => void;
  onRefund?: (dispute: Dispute) => void;
}

const DisputeModal = ({
  dispute,
  onClose,
  onBlacklist,
  onAdjustPayment,
  onRefund,
}: Props) => {
  const [viewImage, setViewImage] = useState<string | null>(null);

  if (!dispute) return null;
  return (
    <>
      {/* MODAL */}
      <div
        className="fixed top-0 left-0 inset-0 bg-black/50 flex items-center justify-end z-50 px-10 animate-fadeIn"
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
            Dispute Details
          </h2>

          {/* User Info */}
          <div className="flex flex-col gap-2 text-black">
            <p className="px-5 py-2 shadow-md">
              <strong>Name:</strong> {dispute.name}
            </p>

            <div className="flex gap-[10%] w-full items-center">
              <p className="px-5 py-2 shadow-md w-[30%] ">
                <strong>Order Id:</strong> {dispute.orderId}
              </p>

              <p className="px-5 py-2 shadow-md w-[60%] ">
                <strong>Order Date:</strong> {dispute.date}
              </p>
            </div>

            <div className="flex gap-4 w-full items-center">
              <p className="px-5 py-2 shadow-md w-[50%] ">
                <strong>Contact:</strong> 08132400000
              </p>

              <p className="px-5 py-2 shadow-md w-[50%] ">
                <strong>Order:</strong> 2 bags of Brown rice
              </p>
            </div>

            <p className="px-5 py-2 shadow-md">
              <strong>Delivery Address:</strong> No 27 Aba Road, Umuahia, Abia
              State
            </p>

            <div className="flex justify-between items-center px-5 py-1 mb-2 shadow-md">
              <span>
                <strong>Evidence:</strong> Payment Receipt
              </span>
              <button
                onClick={() => setViewImage(dispute.image || null)}
                className="bg-[#e6e6e6] hover:bg-pri hover:text-white transition px-5 py-1 "
              >
                View
              </button>
            </div>

            <p className="px-5 py-2 shadow-md">
              <strong>Status:</strong> {dispute.status}
            </p>

            {/* DOCUMENTS */}
            <div className="mt-3">
              <h3 className="font-semibold mb-2 text-black">
                Submitted Document:
              </h3>

              <div>
                <textarea
                  name=""
                  id=""
                  className="w-full border rounded-sm py-1 px-6"
                ></textarea>
              </div>
            </div>

            {/* FOOTER BTNS */}
            <div className="mt-3 mb-3">
              <div className="flex justify-between items-center gap-2">
                {/* REJECT BUTTON */}
                <button
                  onClick={() => {
                    onBlacklist?.(dispute);
                    onClose();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-6 rounded-md"
                >
                  Blacklist
                </button>

                {/* MORE INFO BUTTON */}
                <button
                  onClick={() => {
                    onAdjustPayment?.(dispute);
                  }}
                  className="border text-black py-1.5 px-6 rounded-md"
                >
                  Adjust Payment
                </button>

                {/* ACCEPT BUTTON */}
                <button
                  onClick={() => {
                    onRefund?.(dispute);
                  }}
                  className="bg-pri hover:bg-green-600 text-white py-1.5 px-6 rounded-md"
                >
                  Refund
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
                className="w-[70%] h-auto mx-auto rounded-md"
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

export default DisputeModal;

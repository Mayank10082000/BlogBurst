import React from "react";
import { AlertOctagon } from "lucide-react";

const ConfirmationDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Unsaved Changes",
  message = "You have not published your blog yet. Are you sure you want to discard it?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="flex items-center text-amber-600 mb-4">
          <AlertOctagon className="h-6 w-6 mr-2" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

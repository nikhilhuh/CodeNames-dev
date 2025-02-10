import React from "react";
import { MdError } from "react-icons/md";

interface ErrorModalProps {
  error: string;
  onClose: ()=>void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 z-50 max-h-[80vh] w-[90%] md:w-[50%] lg:w-[40%] overflow-hidden rounded-xl text-[1.2rem] p-4 flex flex-col items-center gap-5 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="text-red-500 font-semibold md:text-[2.5rem] text-[1.5rem]">
            <MdError />
          </div>
          <p className="text-red-500 font-semibold md:text-[1.5rem] text-[1.2rem] font-serif">
            Error
          </p>
        </div>
        <div className="max-w-[80%] break-words text-center">
          {error}
        </div>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded-md"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;

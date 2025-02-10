import React from "react";

interface InfoModalProps {
  info: string;
  onClose: () => void;
}
const InfoModal: React.FC<InfoModalProps> = ({ info, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out opacity-100 pointer-events-auto`}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 z-50 max-h-[80vh] overflow-hidden rounded-xl lg:text-[1.2rem] md:text-[1rem] text-[0.8rem]">
        <div className="flex flex-col items-center justify-center gap-6 lg:px-4 lg:py-2 p-2">
          <div className="max-w-[80%] break-words text-center">{info}</div>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-4 py-2 rounded-md"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;

import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-100">Page Not Found</p>
      <p className="mt-2 text-gray-200">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={handleGoBack}
        className="mt-6 px-6 py-2 text-black bg-yellow-500 rounded-lg shadow-lg drop-shadow-lg hover:scale-110 transition-all"
      >
        Go Back
      </button>
    </div>
  );
};

export default Error404;

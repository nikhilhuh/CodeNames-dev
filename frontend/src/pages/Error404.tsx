import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <p className="mt-4 text-xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={handleGoBack}
        className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition-all"
      >
        Go Back
      </button>
    </div>
  );
};

export default Error404;

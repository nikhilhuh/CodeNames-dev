import React, { useEffect, useState } from "react";
import BackgroundImg from "./assets/images/miscellaneous/bg-raster.svg";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useRoom } from "./context/RoomContext";

const App: React.FC = () => {
  const [background , setBackground] = useState<string>("bg-red-800");
  const { room } = useRoom();

  useEffect(() => {
    if (room) {
      if(room.winner?.team === "red") setBackground("bg-red-800"); 
      else if (room.winner?.team === "blue") setBackground("bg-blue-500");
      else if (room.turn === "blue") setBackground("bg-blue-500");
      else setBackground("bg-red-800");
    }
  }, [room]);
  

  return (
    <div
      className={`min-h-screen max-h-screen overflow-hidden bg-cover bg-center ${background} bg-no-repeat`}
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;

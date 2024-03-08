import { useEffect, useState } from "react";
import "./App.css";
import { Socket, io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!socket) {
      const s = io("http://localhost:3000");

      setSocket(s);
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  const serverSuccess = (dataFromServer: string) => {
    console.log("Got " + dataFromServer + " from server");
  };

  return (
    <>
      <button
        onClick={() => {
          socket?.emit("show_me_money", serverSuccess);
        }}
      >
        Test
      </button>
    </>
  );
}

export default App;

import { Socket, io } from "socket.io-client";
import "./App.css";
import { useEffect, useState } from "react";
import { AddUser } from "./components/AddUser";
import { Person } from "./models/Person";

function App() {
  // fetch("http://localhost:3000").then((response: Response) => {
  //   response.json().then((data) => {
  //     console.log(data);
  //   });
  // });

  const [socket, setSocket] = useState<Socket>();
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const s = io("http://localhost:3000");

    s.on("persons_updated", (persons: Person[]) => {
      setPersons(persons);
    });

    setSocket(s);

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <>
      <AddUser socket={socket} />
      <ul>
        {persons.map((p) => (
          <li key={p.name}>
            {p.name} - {p.age}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

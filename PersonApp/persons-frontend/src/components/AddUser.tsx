import { ChangeEvent, FormEvent, useState } from "react";
import { Socket } from "socket.io-client";
import { Person } from "../models/Person";

interface IAddUserProps {
  socket: Socket | undefined;
}

export const AddUser = ({ socket }: IAddUserProps) => {
  const [person, setPerson] = useState<Person>({
    name: "",
    age: 0,
    isMarried: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text")
      setPerson({ ...person, [e.target.name]: e.target.value });
    if (e.target.type === "number")
      setPerson({ ...person, [e.target.name]: +e.target.value });
    if (e.target.type === "checkbox")
      setPerson({ ...person, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    socket?.emit("add_user", person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        value={person.age}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="isMarried"
        checked={person.isMarried}
        onChange={handleChange}
      />
      <button>Spara</button>
    </form>
  );
};

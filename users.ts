import { v4 as uuidv4, validate as uuidValidate } from "uuid";
export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const Users: User[] = [];

export const UserController = {
  readAll: () => Users,
  readId: (id: string) => Users.find((item: User) => item.id === id),
  deleteuser: (id: string) => {
    const index = Users.findIndex((item) => item.id === id);
    Users.splice(index, 1);
  },
  addNewuser: ({ username, age, hobbies }: User) => {
    if (username && age && hobbies) {
      if (!Array.isArray(hobbies)) return false;
      let id = uuidv4();
      Users.push({
        id: id,
        username: username,
        age: age,
        hobbies: hobbies,
      });
      return UserController.readId(id);
    } else return false;
  },
  updateUser: (id: string, { username, age, hobbies }: User) => {
    Users.map((item) => {
      if (item.id == id) {
        if (username) item.username = username;
        if (age) item.age = age;
        if (hobbies) item.hobbies = hobbies;
      }
      return item;
    });
  },
  chechId: (id: string) => uuidValidate(id),
};

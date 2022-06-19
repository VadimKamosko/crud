import { v4 as uuidv4, validate as uuidValidate } from "uuid";
export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let Users: User[] = [];

export const UserController = {
  readAll: () => Users,
  readId: (id: string) => Users.find((item: User) => item.id === id),
  deleteuser: (id: string) => (Users = Users.filter((item) => item.id !== id)),
  addNewuser: ({ username, age, hobbies }: User) => {   
    if (username && age && hobbies) {
      Users.push({
        id: uuidv4(),
        username: username,
        age: age,
        hobbies: hobbies,
      });
      return Users[Users.length - 1];
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

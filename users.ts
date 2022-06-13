export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let Users: User[] = [
  // {
  //   id: "1",
  //   username: "Vadim",
  //   age: 23,
  //   hobbies: ["sport", "videogames"],
  // },
  // {
  //   id: "2",
  //   username: "Artyom",
  //   age: 23,
  //   hobbies: ["dispute", "WOT"],
  // },
];

export const UserController = {
  readAll: () => Users,
  readId: (id: string) => Users.find((item: User) => item.id === id),
  deleteuser: (id: string) => (Users = Users.filter((item) => item.id !== id)),
  addNewuser: ({ username, age, hobbies }: User) => {
    if (username && age && hobbies) {
      Users.push({
        id: Users.length ? (+Users[Users.length - 1].id + 1).toString() : "1",
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
};

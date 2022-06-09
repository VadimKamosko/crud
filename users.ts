interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let Users: User[] = [
  {
    id: "1",
    username: "Vadim",
    age: 23,
    hobbies: ["sportt", "videogames"],
  },
  {
    id: "2",
    username: "Artyom",
    age: 23,
    hobbies: ["dispute", "WOT"],
  },
];

export let UserController = {
  readAll: () => Users,
  readId: (id: string) => Users.find((item: User) => item.id === id),
};

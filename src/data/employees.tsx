export interface EmployeesProps {
  id: number;
  name: string;
  pos: string;
  stack: string;
  exp: string;
  speak: string;
  time: number;
}

export const employees: Array<EmployeesProps> = [
  {
    id: 1,
    name: "Stepan Stepanko",
    pos: "DEV",
    stack: "NET",
    exp: "LM",
    speak: "BS",
    time: 40,
  },
  {
    id: 2,
    name: "Mykola Mykolyik",
    pos: "DEV",
    stack: "XM",
    exp: "MM",
    speak: "SFS",
    time: 40,
  },
  {
    id: 3,
    name: "Nadia Nadiyko",
    pos: "QA",
    stack: "M",
    exp: "H",
    speak: "CL",
    time: 30,
  },
  {
    id: 4,
    name: "James Bond",
    pos: "MP",
    stack: "D",
    exp: "MM",
    speak: "BS",
    time: 40,
  },
  {
    id: 5,
    name: "Ivanko Ivanenko",
    pos: "DEV",
    stack: "MP",
    exp: "LH",
    speak: "SFS",
    time: 40,
  },
  {
    id: 6,
    name: "Bart Simpson",
    pos: "D",
    stack: "XM",
    exp: "LM",
    speak: "CL",
    time: 40,
  },
  {
    id: 7,
    name: "Maria Marienko",
    pos: "BA",
    stack: "QA",
    exp: "H",
    speak: "BS",
    time: 20,
  },
  {
    id: 8,
    name: "Yurko Yurchenko",
    pos: "QA",
    stack: "NET",
    exp: "LH",
    speak: "FS",
    time: 40,
  },
  {
    id: 9,
    name: "Jack Sparow",
    pos: "S",
    stack: "BA",
    exp: "MM",
    speak: "CL",
    time: 35,
  },
  {
    id: 10,
    name: "Stefania Stefanko",
    pos: "DEV",
    stack: "PM",
    exp: "LM",
    speak: "SFS",
    time: 40,
  },
];

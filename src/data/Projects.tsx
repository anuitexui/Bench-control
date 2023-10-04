export interface ProjectStaffProps {
  id: number;
  name: string;
  time: number;
  start: string;
  end: string;
  billingType: string;
}

export interface ProjectProps {
  id: number;
  name: string;
  lead: ProjectStaffProps;
  ba: ProjectStaffProps;
  pm: ProjectStaffProps;
  start: string;
  end: string;
  devs: Array<ProjectStaffProps>;
  qas: Array<ProjectStaffProps>;
  isActive: boolean;
}

export const projects: Array<ProjectProps> = [
  {
    id: 0,
    name: "Project 1",
    lead: {
      id: 151,
      name: "Nick Niko",
      time: 15,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    ba: {
      id: 7,
      name: "Maria Marienko",
      time: 17,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "UB",
    },
    pm: {
      id: 11,
      name: "Mitchel Jordan",
      time: 15,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    start: "2023-09-12",
    end: "2023-10-12",
    devs: [
      {
        id: 2,
        name: "Mykola Mykolyik",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
      {
        id: 5,
        name: "Ivanko Ivanenko",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
      {
        id: 10,
        name: "Stefania Stefanko",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
    ],
    qas: [
      {
        id: 3,
        name: "Nadia Nadiyko",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
    ],
    isActive: true,
  },
  {
    id: 1,
    name: "Project 2",
    lead: {
      id: 131,
      name: "Samuel Samm",
      time: 15,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    ba: {
      id: 7,
      name: "Maria Marienko",
      time: 20,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    pm: {
      id: 11,
      name: "Mitchel Jordan",
      time: 20,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    start: "2023-07-26",
    end: "2023-11-20",
    devs: [
      {
        id: 13,
        name: "Mark Markov",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
      {
        id: 12,
        name: "Homer Simpson",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "UB",
      },
    ],
    qas: [
      {
        id: 14,
        name: "Katerina Katerenko",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
    ],
    isActive: true,
  },
  {
    id: 2,
    name: "New Project 3",
    lead: {
      id: 131,
      name: "Samuel Samm",
      time: 20,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    ba: {
      id: 7,
      name: "Maria Marienko",
      time: 10,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    pm: {
      id: 11,
      name: "Mitchel Jordan",
      time: 15,
      start: "2023-09-12",
      end: "2023-10-12",
      billingType: "B",
    },
    start: "2023-07-26",
    end: "2023-11-20",
    devs: [
      {
        id: 1,
        name: "Stepan Stepanko",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
      {
        id: 2,
        name: "Mykola Mykolyik",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "UB",
      },
      {
        id: 12,
        name: "Homer Simpson",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
    ],
    qas: [
      {
        id: 3,
        name: "Nadia Nadiyko",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
      {
        id: 8,
        name: "Yurko Yurchenko",
        time: 40,
        start: "2023-09-12",
        end: "2023-10-12",
        billingType: "B",
      },
    ],
    isActive: false,
  },
];

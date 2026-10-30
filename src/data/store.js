// Local initial data store for SRAMS React Client

export const initialRooms = [
  {
    id: "R101",
    roomNumber: "101",
    block: "Block A",
    floor: 1,
    type: "Double",
    capacity: 2,
    occupiedCount: 1,
    occupants: [
      { id: "S101", name: "Rohan Verma", rollNo: "CS2401", allottedDate: "2026-08-01" }
    ],
    amenities: ["Wi-Fi", "Attached Washroom", "Balcony"],
    status: "Partially Occupied",
    pricePerSemester: 25000
  },
  {
    id: "R102",
    roomNumber: "102",
    block: "Block A",
    floor: 1,
    type: "Single",
    capacity: 1,
    occupiedCount: 1,
    occupants: [
      { id: "S102", name: "Priya Sharma", rollNo: "EE2402", allottedDate: "2026-08-05" }
    ],
    amenities: ["Wi-Fi", "AC", "Study Desk"],
    status: "Full",
    pricePerSemester: 35000
  },
  {
    id: "R103",
    roomNumber: "103",
    block: "Block A",
    floor: 1,
    type: "Double",
    capacity: 2,
    occupiedCount: 0,
    occupants: [],
    amenities: ["Wi-Fi", "Study Desk"],
    status: "Available",
    pricePerSemester: 22000
  },
  {
    id: "R201",
    roomNumber: "201",
    block: "Block B",
    floor: 2,
    type: "Triple",
    capacity: 3,
    occupiedCount: 1,
    occupants: [
      { id: "S103", name: "Amit Kumar", rollNo: "ME2403", allottedDate: "2026-08-10" }
    ],
    amenities: ["Wi-Fi", "Balcony", "Study Desk"],
    status: "Partially Occupied",
    pricePerSemester: 18000
  },
  {
    id: "R202",
    roomNumber: "202",
    block: "Block B",
    floor: 2,
    type: "Double",
    capacity: 2,
    occupiedCount: 0,
    occupants: [],
    amenities: ["Wi-Fi", "AC", "Attached Washroom"],
    status: "Available",
    pricePerSemester: 28000
  },
  {
    id: "R203",
    roomNumber: "203",
    block: "Block B",
    floor: 2,
    type: "Single",
    capacity: 1,
    occupiedCount: 0,
    occupants: [],
    amenities: ["Wi-Fi", "AC", "Balcony"],
    status: "Available",
    pricePerSemester: 36000
  },
  {
    id: "R301",
    roomNumber: "301",
    block: "Block C",
    floor: 3,
    type: "Triple",
    capacity: 3,
    occupiedCount: 3,
    occupants: [
      { id: "S104", name: "Vikram Das", rollNo: "CE2404", allottedDate: "2026-08-02" },
      { id: "S105", name: "Neha Sen", rollNo: "CS2405", allottedDate: "2026-08-02" },
      { id: "S106", name: "Kabir Mehta", rollNo: "ME2406", allottedDate: "2026-08-03" }
    ],
    amenities: ["Wi-Fi", "Study Desk"],
    status: "Full",
    pricePerSemester: 18000
  },
  {
    id: "R302",
    roomNumber: "302",
    block: "Block C",
    floor: 3,
    type: "Double",
    capacity: 2,
    occupiedCount: 0,
    occupants: [],
    amenities: ["Wi-Fi", "Attached Washroom"],
    status: "Maintenance",
    pricePerSemester: 24000
  }
];

export const initialRequests = [
  {
    id: "REQ101",
    studentId: "S201",
    studentName: "Aditya Roy",
    rollNo: "CS2501",
    email: "aditya@university.edu",
    gpa: 8.9,
    distanceKm: 420,
    specialNeed: false,
    preferredType: "Double",
    preferredFloor: 1,
    priorityScore: 84.5,
    status: "Pending",
    allottedRoomId: null,
    submittedAt: "2026-10-01T10:30:00Z"
  },
  {
    id: "REQ102",
    studentId: "S202",
    studentName: "Ananya Deshmukh",
    rollNo: "EE2502",
    email: "ananya@university.edu",
    gpa: 9.4,
    distanceKm: 850,
    specialNeed: true,
    preferredType: "Single",
    preferredFloor: 1,
    priorityScore: 97.0,
    status: "Pending",
    allottedRoomId: null,
    submittedAt: "2026-10-02T11:15:00Z"
  },
  {
    id: "REQ103",
    studentId: "S203",
    studentName: "Manish Soni",
    rollNo: "ME2503",
    email: "manish@university.edu",
    gpa: 7.8,
    distanceKm: 310,
    specialNeed: false,
    preferredType: "Triple",
    preferredFloor: 2,
    priorityScore: 71.0,
    status: "Pending",
    allottedRoomId: null,
    submittedAt: "2026-10-03T09:00:00Z"
  },
  {
    id: "REQ104",
    studentId: "S204",
    studentName: "Sneha Reddy",
    rollNo: "CS2504",
    email: "sneha@university.edu",
    gpa: 9.1,
    distanceKm: 650,
    specialNeed: false,
    preferredType: "Double",
    preferredFloor: 2,
    priorityScore: 88.0,
    status: "Pending",
    allottedRoomId: null,
    submittedAt: "2026-10-04T14:20:00Z"
  }
];

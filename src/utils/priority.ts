import { Priority } from "@prisma/client";

export const priorityValue = (priority: Priority) => {
  switch (priority) {
    case "HIGHT":
      return 3;
    case "MEDIUM":
      return 2;
    case "LOW":
      return 1;
    default:
      return 0;
  }
};

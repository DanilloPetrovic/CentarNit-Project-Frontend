import axios from "axios";

interface valuesType {
  title: string;
  description: string;
  priority: string;
  dueDate: string | null;
  userId: number;
}

export const createTask = async (values: valuesType, token: string) => {
  try {
    const taskData = {
      ...values,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
    };

    const task = await axios.post(
      "http://localhost:3000/task/createtask",
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(task);
  } catch (error) {
    console.error(error);
  }
};

export const isDoneChange = async () => {};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

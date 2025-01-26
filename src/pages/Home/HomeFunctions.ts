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

export const taskCompleteOrIncomplete = async (
  apiLink: string,
  taskId: number | null,
  token: string | null
) => {
  try {
    const updatedTask = await axios.post(
      `http://localhost:3000/task/${apiLink}`,
      { id: taskId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return updatedTask;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (
  taskId: number | null,
  token: string | null
) => {
  try {
    const deletedTask = await axios.delete(
      `http://localhost:3000/task/deletetask/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return deletedTask;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTasks = async (token: string) => {
  try {
    const alltasks = await axios.get("http://localhost:3000/task/getalltasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return alltasks.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedTasks = async (token: string) => {
  try {
    const completedTasks = await axios.get(
      "http://localhost:3000/task/getcompletedtasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return completedTasks.data;
  } catch (error) {
    console.log(error);
  }
};

export const getIncompletedTasks = async (token: string) => {
  try {
    const incompletedTasks = await axios.get(
      "http://localhost:3000/task/getcompletedtasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return incompletedTasks.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNewestTasks = async (token: string) => {
  try {
    const newestTasks = await axios.get(
      "http://localhost:3000/task/getnewesttasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return newestTasks.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByPriority = async (priority: string, token: string) => {
  try {
    const tasksByPriority = await axios.get(
      `http://localhost:3000/task/gettasksbypriority/${priority}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return tasksByPriority.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByClosestDueDate = async (token: string) => {
  try {
    const tasksByClosestDueDate = await axios.get(
      `http://localhost:3000/task/gettasksbyclosestduedate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return tasksByClosestDueDate.data;
  } catch (error) {
    console.log(error);
  }
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

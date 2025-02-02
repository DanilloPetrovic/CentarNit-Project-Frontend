import axios from "axios";
import { Project } from "../../interfaces/interfaces";

export const getTasks = async (id: number, setTasks: any, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/project/gettasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getProject = async (
  projectId: number | null,
  token: string | null
) => {
  if (!projectId || !token) return;

  try {
    const response = await axios.get<Project>(
      `http://localhost:3000/project/getproject/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

export const deleteProject = async (projectId: number, token: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/project/deleteproject/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const projectCompleted = async (projectId: number, token: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/project/projectdone/${projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

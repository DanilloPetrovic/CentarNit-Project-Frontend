import axios from "axios";
import { setData } from "../../store/projectSlice";
import { Dispatch } from "redux";
import { valuesProjectType } from "../Home/HomeFunctions";

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
  projectId: number | null | undefined,
  token: string | null,
  dispatch: Dispatch
) => {
  if (!projectId || !token) return;

  try {
    const response = await axios.get(
      `http://localhost:3000/project/getproject/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch(setData(response.data));

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

export const createProjectTask = async (
  values: valuesProjectType,
  token: string
) => {
  try {
    const taskData = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      projectId: values.projectId,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
      userId: values.userId,
    };

    await axios.post("http://localhost:3000/task/createprojecttask", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getComments = async (taskIdProp: number, token: string | null) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/comment/getcomments/${taskIdProp}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReplies = async (
  commentIdProp: number,
  token: string | null
) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/comment/getreplies/${commentIdProp}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (values: any, token: string | null) => {
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const response = await axios.post(
      "http://localhost:3000/comment/createcomment",
      {
        userIdProp: values.userId,
        taskIdProp: values.taskId,
        content: values.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const deleteComment = async (idProp: number, token: string | null) => {
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const response = await axios.delete(
      `http://localhost:3000/comment/deletecomment/${idProp}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReply = async (values: any, token: string | null) => {
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const response = await axios.post(
      `http://localhost:3000/comment/createreply/${values.commentId}`,
      {
        userIdProp: values.userIdProp,
        content: values.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const deleteReply = async (idProp: number, token: string | null) => {
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const response = await axios.delete(
      `http://localhost:3000/comment/deletereply/${idProp}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

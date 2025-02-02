import axios from "axios";

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

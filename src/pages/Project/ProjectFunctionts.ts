import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface InitialValuesTypes {
  title: string;
  description: string;
  createdById: number;
  participants: number[];
  deadline: string | null;
}

export const createProject = async (
  values: InitialValuesTypes,
  token: string | null
) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/project/createproject",
      {
        title: values.title,
        description: values.description,
        createdById: values.createdById,
        participants: values.participants,
        deadline: values.deadline,
      },
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

export const getAllUsers = async (
  idProp: number | null,
  token: string | null
) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users/getallusers/${idProp}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const useGetAllUsers = (id: number | null, token: string | null) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getAllUsers(id, token),
    enabled: !!id,
  });
};

export const getAllProjects = async (idProp: number | null, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/project/getallprojectnofilter/${idProp}`,
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

export const getProjectsThatCreatedByMe = async (
  idProp: number | null,
  token: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/project/getallproject/${idProp}`,
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

export const getAllMyProjects = async (
  idProp: number | null,
  token: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/project/getprojectthatcreatedbyme/${idProp}`,
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
// itekli token
// number | null kad cekam id ili usera

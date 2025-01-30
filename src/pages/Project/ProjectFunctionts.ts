import axios from "axios";
import { InitialValuesTypes } from "../../components/ProjectComponents/CreateProjectModal";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const createProject = async (
  values: initialValuesTypes,
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

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      values,
      token,
    }: {
      values: initialValuesTypes;
      token: string | null;
    }) => {
      return createProject(values, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
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

// itekli token
// number | null kad cekam id ili usera

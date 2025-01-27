import axios from "axios";
import { setData } from "../../store/userSlice";
import type { AppDispatch } from "../../store/store";

interface UserValues {
  username: string;
  email: string;
  password: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  username: string;
  email: string;
  token?: string;
}

export const registerUser = async (
  values: UserValues
): Promise<UserResponse | undefined> => {
  try {
    const response = await axios.post<UserResponse>(
      "http://localhost:3000/users/register",
      values
    );
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data || error.message);
  }
};

export const loginUser = async (
  values: LoginValues
): Promise<UserResponse | undefined> => {
  try {
    const response = await axios.post<UserResponse>(
      "http://localhost:3000/users/login",
      values
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
  }
};

export const getMyProfile = async (
  dispatch: AppDispatch,
  token: string | null
): Promise<void> => {
  try {
    if (!token) {
      console.error("Token is missing.");
      return;
    }

    const response = await axios.get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setData(response.data));
  } catch (error: any) {
    console.error(
      "Failed to fetch user profile:",
      error.response?.data || error.message
    );
  }
};

export const logOut = (navigateFN: any) => {
  localStorage.removeItem("token");
  navigateFN("/register");
};

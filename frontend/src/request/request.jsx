import { errorToast, successToast } from "@/Toaster/basicToast";
import axios from "axios";

// const result = JSON.parse(localStorage.getItem("user"));
// // console.log(result)
//   const token = result.payload.token
//   // console.log(token)

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null; // or handle this case as needed
};


export const axiosConfig = axios.create({
  // baseURL: "https://hostell.onrender.com",
  baseURL: "http://localhost:5555",
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const login = async (email, password) => {
  try {
    let response = await axiosConfig.post("/users/sign-in", {
      email,
      password,
    });
    let status = response.status
    response = response.data;
    console.log(response)
    successToast(response.message)
    localStorage.setItem("token", response.payload.token)
    localStorage.setItem("user", JSON.stringify(response.payload.dbUser))

    return {response, status }
  }
  catch (err) {
    errorToast(err.message)
    console.log(err.message)
    return null
  }
};

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  userType
) => {
  const response = await axiosConfig.post(
    "/users/sign-up",
    {
      firstName,
      lastName,
      email,
      password,
      userType,
    },
    {}
  );
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

export const forgotPassword = async (email) => {
  try {
    let response = await axiosConfig.post('/users/forgot-password', {
      email
    })
    let status = response.status
    response = response.data;
    console.log(response)
    successToast(response.message)

    return {response, status}
  } catch (error) {
    errorToast(error.message)
    return null
  }
}
export const recommendedHostel = async () => {
  const response = await axiosConfig.get("/hostels/type/recommended");
  return response.data;
};

export const hostelDetails = async (hostelid) => {
  const response = await axiosConfig.get(`/hostels/${hostelid}`);
  return response.data;
};

export const popularHostel = async () => {
  const response = await axiosConfig.get("/hostels/type/popular");
  return response.data;
};

export const addHostel = async (
  title,
  images,
  location,
  description,
  price,
  features,
  available,
  availableRooms
) => {
  
  const response = await axiosConfig.post(
    "/hostels/",
    {
      title,
      images,
      location,
      description,
      price,
      features,
      available,
      availableRooms,
    }
  );
  return response;
};

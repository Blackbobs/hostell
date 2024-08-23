"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signup } from "@/request/request";
import Loader from "@/BasicComponents/Loader";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import hall from "../../public/hall.jpg";

function Signup() {
  const router = useRouter();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || !firstName || !lastName) {
      setErrorMessage("Please fill the empty form.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      setShowLoader(true);
      const userData = await signup(
        firstName,
        lastName,
        email,
        password,
        userType
      );
      console.log(userData);
      if (userData.status === 200 || userData.status === 201) {
        setTimeout(() => {
          setShowLoader(false);
        }, 5000);
        router.replace("/login");
      } else {
        setShowLoader(false);
        setErrorMessage(userData.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowLoader(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <section className="flex h-screen w-full">
      <div className="w-1/2 h-screen hidden md:block">
        <Image
          src={hall}
          className="object-cover h-screen"
          alt="hostel"
          priority={true}
        />
      </div>

      <div className="w-full md:w-1/2 md:p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-white flex flex-col my-5 px-5 w-full h-max md:p-5"
        >
          {errorMessage && (
            <p className="bg-red-500 w-full p-3 text-white rounded-lg">
              {errorMessage}
            </p>
          )}
          <h2 className="text-primary2 font-semibold text-3xl mb-5">Signup</h2>
          <div>
            <div className="flex flex-col">
              <label className="my-2 capitalize">firstname</label>
              <input
                type="text"
                placeholder="firstName"
                className="border-2 border-gray-300 p-2 rounded-2xl focus:outline-none w-full"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="my-2 capitalize">lastname</label>
              <input
                type="text"
                placeholder="lastname"
                className="border-2 border-gray-300 p-2 rounded-2xl focus:outline-none w-full"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="my-2 capitalize">email address</label>
              <div className="border-2 border-gray-300 py-2 px-3 rounded-2xl flex gap-2 items-center">
                <MdOutlineMail />
                <input
                  type="email"
                  placeholder="email"
                  className=" focus:outline-none w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="my-2 capitalize">password</label>
              <div className="border-2 border-gray-300 py-2 px-3 rounded-2xl flex gap-2 items-center">
                <MdLockOutline />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="passsword"
                  className=" focus:outline-none flex-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <IoIosEyeOff onClick={() => setShowPassword(false)} />
                ) : (
                  <IoIosEye onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            <div className="flex items-center m-2">
              <input
                className="font-semibold text-xl"
                type="radio"
                name="userType"
                id="agent"
                onChange={(e) => {
                  const agent = e.target.checked;
                  setUserType(agent ? "AGENT" : "BASIC");
                }}
              />
              <label
                className="capitalize font-medium text-gray-900 py-2 px-4 rounded"
                htmlFor="agent"
              >
                Agent
              </label>
            </div>
            <button
              onClick={() => handleSubmit()}
              className="w-full bg-primary2 p-3 rounded-2xl text-white text-center flex items-center justify-center my-2 font-semibold"
              type="submit"
            >
              {showLoader ? (
                <div>
                  <Loader />
                </div>
              ) : (
                "Signup"
              )}
            </button>
          </div>
          <p className="mt-3">
            Already have an account?{" "}
            <Link
              className="text-primary2 capitalize font-medium"
              href={"/login"}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;

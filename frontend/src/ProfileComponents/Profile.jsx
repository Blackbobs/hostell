"use client";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiCalendar2Line, RiMailLine } from "react-icons/ri";
import { useGetUser } from "@/store/user";
import { useGetHostelsByUser } from "@/store/hostels";
import HostelCard from "@/HostelComponents/HostelCard";


function Profile() {
  // const {user} = useGetUser()
  const router = useRouter();
  const [user, setUser] = useState()

  const { allHostels } = useGetHostelsByUser(user?._id);
  const [hostels, setHostels] = useState();

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [])
  
  useEffect(() => {
    setHostels(allHostels);
  }, [allHostels]);

  return (
    <section className="w-full">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center gap-5 m-5">
          <div className="w-36 h-36 rounded-full bg-secondary1 flex items-center justify-center overflow-hidden">
            <img
              src='./user.png'
              alt="user"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex gap-3 flex-col">
            <div className="text-center">
              <h2 className="font-semibold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 flex gap-2 items-center justify-center"><RiMailLine /> {user?.email}</p>
              <p className="text-gray-500 flex gap-2 items-center justify-center"> <RiCalendar2Line /> Joined 2024</p>
            </div>

            <Link
              className="p-3 flex items-center gap-2 bg-primary2 text-white justify-center rounded-lg capitalize w-fit m-auto"
              href={"/profile/editprofile"}
            >
              <MdEdit /> edit profile
            </Link>
          </div>

        </div>
        <div className="relative m-5">
          {user?.userType === "AGENT" && (
            <div
              onClick={() => {
                router.push("/uploadhostel");
              }}
              className="fixed bottom-5 right-5 flex gap-1 capitalize items-center bg-primary2 p-3 rounded-full text-white text-sm"
            >
              <FiPlus size={30} />
            </div>
          )}
        </div>
      </div>

      <div className="mx-xPadding my-10">
        <p className="text-[20px] font-[600]">Uploaded Hostels</p>

        {hostels?.length > 0
          ? hostels.map((hostel, i) => (
              <HostelCard
                key={i}
                price={hostel.price}
                hostelid={hostel._id}
                location={hostel.location}
                title={hostel.title}
                image={hostel.images.length > 0 ? hostel.images[0] : ""}
              />
            ))
          : "No hostels available"}
      </div>
    </section>
  );
}

export default Profile;

"use client";
import React, { useState, useEffect } from "react";
import { useGetUser } from "@/store/user";
import { useGetAllHostels, useGetHostelsByUser } from "@/store/hostels";
// import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { useParams } from "next/navigation";
import userImg from "../../public/user.png";
import CustomReturn from "./CustomReturn";
import HostelCard from "@/HostelComponents/HostelCard";
import {
  RiCalendar2Line,
  RiMailLine,
  RiPhoneLine,
  RiWhatsappLine,
} from "react-icons/ri";
import Link from "next/link";

const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const { user } = useGetUser(userId);
  // console.log(user)

  const { allHostels } = useGetHostelsByUser(userId);
  const [hostels, setHostels] = useState();
  const [dateJoined, setDateJoined] = useState();

  // console.log(allHostels)
  useEffect(() => {
    const date = new Date(user?.createdAt);
    setDateJoined(+date.getFullYear());
    // const dateJoined = date.getFullYear()
  }, []);

  useEffect(() => {
    setHostels(allHostels);
  }, [allHostels]);
  return (
    <section className="w-full">
      <CustomReturn />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center gap-5 m-5">
          <div className="w-36 h-36 rounded-full bg-secondary1 flex items-center justify-center overflow-hidden">
            <Image
              src={userImg}
              alt="user"
              className="object-cover w-full h-full"
              priority={true}
            />
          </div>
          <div className="flex gap-3 flex-col">
            <div className="text-center">
              <h2 className="font-semibold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500">
                <Link
                  className=" flex gap-2 items-center justify-center"
                  href={`mailto:${user?.email}`}
                  target="_blank"
                >
                  <RiMailLine />
                  {user?.email}
                </Link>
              </p>
              <p className="text-gray-500 flex gap-2 items-center justify-center">
                {" "}
                <RiCalendar2Line /> Joined {dateJoined}
              </p>
            </div>

            <div className="options">
              <div>
                <RiWhatsappLine />
              </div>
              <div>
                <Link href={`mailto:${user?.email}`} target="_blank">
                  <RiMailLine />
                </Link>
              </div>
              <div>
                <RiPhoneLine />
              </div>
            </div>
          </div>
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
};

export default UserProfile;

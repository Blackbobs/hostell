import React from "react";
import { MdEdit } from "react-icons/md";
import HostelCard from "../components/HostelCard";
import hostel1 from "/hostel1.jpg";
import { NotificationCard } from "../components";

function AgentProfile() {
  return (
    <section className="w-screen">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center gap-5 m-5">
          <div className="w-36 h-36 rounded-full bg-secondary2"></div>
          <div className="text-center">
            <h2 className="font-semibold">John Doe</h2>
          </div>
        </div>
        <div className="relative m-5">
          <div>
            <p className="p-2 text-sm">
              <strong className="italic"> Firstname:</strong> John
            </p>
            <p className="p-2 text-sm">
              <strong className="italic"> Lastname:</strong> Doe
            </p>
            <p className="p-2 text-sm">
              <strong className="italic"> Email: </strong>
              ayodejiayodele350@gmail.com
            </p>
            <p className="p-2 text-sm">
              <strong className="italic"> Phone: </strong>
              +2349043729869
            </p>
          </div>
          <div className="absolute top-2 right-2 flex gap-1 capitalize items-center bg-secondary2 py-1 px-2 rounded-lg text-white text-sm">
            <MdEdit /> edit profile
          </div>
          {/* Notifications */}
          <div className="m-5">
            <h3 className="p-2 font-semibold">Notifications</h3>
            <div className="flex flex-col gap-3">
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
            </div>
          </div>
          <div className=" my-5 p-3">
            <h3 className="font-semibold capitalize">Hostel updates</h3>
            <div className="flex flex-wrap">
              <HostelCard
                price="₦ 120,000.00"
                location="accord,zoo,funaab"
                image={hostel1}
              />
              <HostelCard
                price="₦ 120,000.00"
                location="accord,zoo,funaab"
                image={hostel1}
              />
              <HostelCard
                price="₦ 120,000.00"
                location="accord,zoo,funaab"
                image={hostel1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgentProfile;
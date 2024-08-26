"use client";
import React, { useEffect, useState } from "react";
import HostelCard from "./HostelCard";
// import Link from "next/link";
import { recommendedHostel } from "@/request/request";
import Spinner from "@/BasicComponents/Spinner";
import { useStateContext } from "@/Contexts/ContextProvider";
import { useGetAllHostels } from "@/store/hostels";
// import { SearchLocationInput, FilterCard } from "../components";

const Recommended = ({ simplified }) => {
  const { searchInput, priceFilter } = useStateContext();
  const [hostelArray, setHostelArray] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { allHostels, isLoading } = useGetAllHostels();
  // console.log(allHostels)
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      try {
        const hostelResult = await allHostels;
        setHostelArray(hostelResult);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
        // setIsLoading(false);
      }
    };

    fetchData();
  }, [allHostels]);

  useEffect(() => {
    filterHostels();
  }, [searchInput, hostelArray, priceFilter]);

  const filterHostels = () => {
    let tempFilteredHostels = hostelArray;

    const searchTerm = searchInput.trim().toLowerCase();

    // Filter hostels based on search term
    if (searchTerm) {
      tempFilteredHostels = tempFilteredHostels.filter(
        (hostel) =>
          hostel.location.toLowerCase().includes(searchTerm) ||
          hostel.title.toLowerCase().includes(searchTerm)
      );
    }

    // Filter hostels based on price range
    if (Object.keys(priceFilter).length > 0) {
      tempFilteredHostels = tempFilteredHostels.filter((hostel) => {
        return Object.keys(priceFilter).some((priceRange) => {
          if (priceFilter[priceRange]) {
            return isPriceInRange(hostel.price, priceRange);
          }
          return false;
        });
      });
    }

    setFilteredHostels(tempFilteredHostels);
  };

  // Function to check if a price is within a given range
  const isPriceInRange = (price, range) => {
    const [min, max] = range.split('-').map(value => parseInt(value.trim(), 10));
    return price >= min && price <= max;
  };

  // const simplifiedStyles = "flex flex-row gap-3";
  // const normalStyles =
  //   "flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-4";

  return (
    <section className="m-3 w-screen p-3 mx-auto">
      {/* {!simplified && (
        <div>
          <SearchLocationInput />
        </div>
      )}
      {!simplified && showFilter && (
        <div>
          <FilterCard />
        </div>
      )} */}
      <div className="flex items-center justify-between p-2 my-4">
        <h2 className="font-bold">Recommended Hostel</h2>
        {/* {simplified && (
          <Link
            className="text-primary2 text-sm capitalize"
            href="/hostel/explore"
          >
            See All
          </Link>
        )} */}
      </div>

      <div className="cursor-grab">
        <div
          // className={simplified ? simplifiedStyles : normalStyles}
          className="flex flex-col flex-wrap md:flex-row gap-2"
        >
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              {filteredHostels?.length > 0 ? (
                filteredHostels.map((hostel, index) => (
                  <HostelCard
                    key={index}
                    price={hostel.price}
                    hostelid={hostel._id}
                    location={hostel.location}
                    title={hostel.title}
                    agentId={hostel.createdBy}
                    image={hostel.images.length > 0 ? hostel.images[0] : ""}
                  />
                ))
              ) : (
                <p>No hostels available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recommended;

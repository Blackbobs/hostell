import React, { useEffect, useState } from "react";
import FileBase64 from 'react-file-base64';
import { addHostel } from "../../request";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { IoMdImages } from "react-icons/io";

function uploadHostel() {
  const navigate = useNavigate()
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('')
  const [images, setImages] = useState([])
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [features, setFeatures] = useState('')
  const [available, setAvailable] = useState(false)
  const [availableRooms, setAvailableRooms] = useState('')
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleAvailable = () => {
    setAvailable(prev => !prev);
  };

  useEffect(() => {
    const base64Images = files.map(file => file.base64);
    setImages(base64Images);
  }, [files])

  const handleSubmit = async() =>  {
    try{
      setShowLoader(true)
      const response = await addHostel(title, images, location,description, price, features, available, availableRooms
        )
        console.log(response);
        if(response.status === 200){
          navigate('/hostel/profile')
        }
    }
    catch(error){
      setErrorMessage(error.message);
      setShowLoader(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }

  return (
    <section className="w-screen container mx-auto max-w-screen-md">
      <form onSubmit={(e) => e.preventDefault()} 
      className="w-full md:max-w-screen-xl md:mx-auto p-2">
          {errorMessage && (
            <p className="bg-red-300 w-full p-3 text-white rounded-lg">
              {errorMessage}
            </p>
          )}
        <div className="flex flex-col m-2">
          {/* <label className="capitalize  font-bold m-2">Title</label> */}
          <input
            placeholder="Title"
            className="outline-none p-2 border-2 border-gray-400 m-2 rounded"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 m-2 p-2">
          <label className="capitalize font-bold text-primary2">
            upload pictures
          </label>
          <div className="flex flex-col w-full">
            {/* Uploading of  the hostel images */}
            <button className="text-primary2 flex items-center gap-2 cursor-pointer">
          <FileBase64
        multiple={ true }
        onDone={(f) => setFiles(f)}
         />
         <IoMdImages/>
         <small>select hostel images</small>
        </button>
        <div className="flex flex-wrap m-2">
            {files.map((file, i) => {
             return (
              <div key={i} className="h-40 w-40">
                <img className="w-full h-full"  src={file.base64} onChange={() => setImages(file.base64)} />
              </div>
             )
})}
</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 m-2">
          {/* <label className="capitalize font-bold  m-2">
            Location
          </label> */}
          <textarea
            className="outline-none p-2 border-2 border-gray-400 m-2 rounded"
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 m-2">
          {/* <label className="capitalize font-bold  m-2">
            Description
          </label> */}
          <textarea
            className="outline-none p-2 border-2 border-gray-400 m-2 rounded"
            cols="30"
            rows="5"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col m-2">
          {/* <label className="capitalize font-bold m-2">Price</label> */}
          <input
             className="outline-none p-2 border-2 border-gray-400 m-2 rounded"
            type="text"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 m-2">
          {/* <label className="capitalize font-bold m-2">
            Features
          </label> */}
          <textarea
             className="outline-none p-2 border-2 border-gray-400 m-2 rounded"
            type="text"
            placeholder="Features"
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>
        <button
          onClick={handleToggleAvailable}
          className={`p-3 m-3 ${available ? 'text-white bg-primary2 px-6' : 'bg-gray-200 text-black'} capitalize rounded w-fit`}
        >
          {available ? 'Available' : 'Not Available'}
        </button>
          <div className="flex flex-col m-2">
            {/* <label className="capitalize font-bold m-2">
              Availble Rooms
            </label> */}
            <input
               className="outline-none p-2 border-2 border-gray-400 m-2 rounded"
              type="number"
              placeholder="No. available rooms"
              onChange={(e) => setAvailableRooms(e.target.value)}
            />
          </div>
        <div>
        <button
            onClick={() => handleSubmit()}
            className="w-full bg-primary2 p-3 rounded text-white text-center flex items-center justify-center my-2 font-bold"
            type="submit"
          >
            {showLoader ? <Loader/> : 'Upload Hostel'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default uploadHostel;

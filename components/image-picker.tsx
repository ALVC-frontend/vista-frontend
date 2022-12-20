"use client";

import { ChangeEvent, useState } from "react";

type Props = {};

const ImagePicker = ({}: Props) => {
  const [image, setImage] = useState("");

  const getBase64 = (file: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      //@ts-ignore
      setImage(reader.result);
    };

    reader.onerror = () => {
      //   Notify the user that an error occured
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    getBase64(e.target.files[0]);
  };
  return (
    <div className="w-full flex flex-col md:flex-row gap-y-3 items-start gap-x-2 bg-lightGray p-2 rounded-md">
      <div className="flex flex-col gap-y-4 items-start">
        <h3 className="pl-4 font-semibold">Image</h3>
        <div className="">
          <input
            type="file"
            className="file-input file-input-ghost"
            onChange={handleChange}
          />
        </div>
        <div className="pl-4 flex items-center gap-x-3">
          <input type="checkbox" />
          <small className="text-primary">Remove Image</small>
        </div>
      </div>

      {/* Image preview  */}
      <div className="p-2 h-full self-stretch rounded-sm">
        {image && <img src={image} />}
        {!image && (
          <div className="border w-full rounded-md h-full flex items-center justify-center p-3 border-gray-300 border-dashed">
            {" "}
            <small className="opacity-[0.44]">No image selected</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;

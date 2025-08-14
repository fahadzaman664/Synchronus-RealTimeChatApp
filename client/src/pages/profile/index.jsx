import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { colors, getColour } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/features/user.slice";
import { setUserInfo } from "@/features/user.slice";
const Profile = () => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const [hovered, setHovered] = useState(false);
  const [image, setImage] = useState("");
  const [selectedColour, setSelectedColour] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user.profileSetup) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setSelectedColour(user.color);
    }
  }, [user]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const result = await updateProfile({
          firstName,
          lastName,
          color: selectedColour,
        });
        if (result.data && result.data.success) {
          dispatch(setUserInfo(result.data.user));
          toast.success(result.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-[#1b1c25] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-5xl text-white/95 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="h-full w-full object-cover bg-black"
                />
              ) : (
                <div
                  className={`uppercase w-32 h-32 md:h-48 md:w-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColour(
                    selectedColour
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : user.email?.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            {/* <input type="text" className="" /> */}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                type="email"
                name="email"
                placeholder="Email"
                disabled
                value={user.email}
              />
            </div>
            <div className="w-full">
              <Input
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="w-full">
              <Input
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                type="text"
                name="lastNAme"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} rounded-full h-8 w-8 cursor-pointer transition-all duration-300 ${
                    selectedColour === index ? "outline-3 outline-white " : ""
                  } `}
                  key={index}
                  onClick={() => setSelectedColour(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 cursor-pointer"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

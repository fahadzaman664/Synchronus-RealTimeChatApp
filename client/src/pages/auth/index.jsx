import React from "react";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginSignupLottieFile from "@/assets/LoginSignupLottieFile.json";
import Lottie from "lottie-react";

const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleLogin = async () => {};
  const handleSignup = async () => {};

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
      <div
        className="h-[90vh] bg-white w-[80vw] shadow-2xl text-opacity-90 border-2 border-white md:w-[90vw] lg:w-[70vw] xl:w-[60-vw]
        rounded-3xl grid xl:grid-cols-2
        "
      >
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl"> welcome</h1>
              <img className="h-[100px]" src={Victory} alt="victory emoji" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="flex items-center justify-center  w-full ">
            <Tabs className="w-3/4  ">
              <TabsList className="bg-transparent rounded-none w-full flex justify-center">
                <TabsTrigger
                  value="login"
                  className="px-20  data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className=" px-20 data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className=" flex flex-col gap-5 mt-10" value="login">
                <Input
                  type={"text"}
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder="Password"
                  className="rounded-full p-6 mt-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className={"rounded-full p-6 "} onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col  mt-2 " value="signup">
                <Input
                  type={"text"}
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder="Password"
                  className="rounded-full p-6 mt-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder="Password"
                  className="rounded-full p-6 mt-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className={"rounded-full p-6 mt-4 "}
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <Lottie animationData={LoginSignupLottieFile} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default Auth;

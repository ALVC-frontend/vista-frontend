"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { TextInput, Button } from "@components/index";
import logo from "@assets/images/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://vista-testing.herokuapp.com/api/v1/auth/sign_in", {
        email,
        password,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      console.log(res.data);
      window.location.href = "/questions"; // Redirect the user to the home page
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid email or password.");
    }
  };


  return (
    <main className="w-full max-h-[100vh]">
      <section className="default-container flex flex-col md:flex-row items-start justify-between my-12">
        <div className="mx-auto">
          <h1 className="text-3xl md:text-6xl font-semibold">
            Vista Admin Sign in
          </h1>
          <p className="text-xl md:text-2xl my-3">
            If you don&apos;t have an account <br />s
            you can{" "}
            <Link href="/register" className="text-primary">
              register here
            </Link>
          </p>
          <div className="">
            <br/>
            <br/>
          <Image src={logo} alt="Vista Logo"  width={300} height={200}className="max-w-full" />
          </div>
        </div>
        <div className="flex-grow h-full my-6 w-full mx-auto">
          <form
            className="flex flex-col justify-end mx-auto gap-y-6 w-[95%] md:w-3/5"
            onSubmit={handleSubmit}
          >   <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

            <div className="flex items-center gap-x-4">
              <input
                type="checkbox"
                name="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="text-primary rounded-sm outline-none border border-primary active:outline-none"
              />
              <label htmlFor="checkbox" className="text-primary">
                Remember me
              </label>
            </div>

            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}

            <div className="my-4">
              <Button primary text="Login" type="submit" />
            </div>
          </form>

          <div className="w-[95%] mx-auto md:w-3/5">
            <Link href="/forgot-password"  className="text-primary mx-auto mb-3 text-md text-right">
                Forgot Password?
            </Link>

            <Link href="/resend-confirmation" className="text-primary text-md text-right mx-auto">
                Didn&apos;t receive confirmation instructions?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

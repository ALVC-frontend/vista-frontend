"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import rocket from "@assets/svg/rocket.svg";
import { TextInput, Button } from "components/index";
import { useAuth } from "components/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://vista-testing.herokuapp.com/api/admin/staff/login",
        {
          email,
          password,
        }
      );
      const accessToken = res.data.token;
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
            Sign in to <br /> Vista
          </h1>
          <p className="text-xl md:text-2xl my-3">
            If you don&apos;t have an account <br />
            you can{" "}
            <Link href="/register" className="text-primary">
              register here
            </Link>
          </p>
          <div className="">
            <Image src={rocket} alt="Rocket" className="max-w-full" />
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
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

            <div className="flex items-center gap-x-4">
              <input
                type="checkbox"
                name="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
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

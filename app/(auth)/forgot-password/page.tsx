"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import { TextInput, Button } from "@components/index";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/users/password", { user: { email } });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }

    setIsLoading(false);
  };

  return (
    <main className="w-full max-h-[100vh]">
      <section className="default-container flex flex-col md:flex-row items-start justify-between my-20">
        <div className="">
          <h1 className="text-6xl mb-4 font-semibold">
            Forgot your <br /> password?
          </h1>
          <p className="text-2xl my-3">
            If you don&apos;t have an account <br />
            you can <span className="text-primary"> register here</span>
          </p>
        </div>
        <div className="flex-grow h-full w-full mx-auto my-6">
          <form className="flex flex-col justify-end mx-auto gap-y-6 w-[95%] md:w-3/5" onSubmit={handleSubmit}>
            <TextInput
              placeholder="Enter your registered Email"
              inputType="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <div className="my-4">
              <Button primary text="Send instructions" isLoading={isLoading} />
            </div>
            {message && (
              <p className="text-red-500 text-sm my-2 text-center">
                {message}
              </p>
            )}
          </form>

          <div className="w-[95%] mx-auto md:w-3/5">
            <Link href="/forgot-password">
              <p className="text-primary text-md text-right mx-auto">
                Didn&apos;t receive confirmation instructions?
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

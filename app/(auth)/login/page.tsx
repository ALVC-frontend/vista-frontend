import Image from "next/image";
import Link from "next/link";

import rocket from "@assets/svg/rocket.svg";
import { TextInput, Button } from "@components/index";

export default function Page() {
  return (
    <main className="w-full max-h-[100vh]">
      <section className="default-container flex flex-col md:flex-row items-start justify-between my-12">
        <div className="mx-auto">
          <h1 className="text-3xl md:text-6xl font-semibold">
            Sign in to <br /> Vista
          </h1>
          <p className="text-xl md:text-2xl my-3">
            If you don&apos;t have an account <br />
            you can <span className="text-primary"> register here</span>
          </p>
          <div className="">
            <Image src={rocket} alt="Rocket" className="max-w-full" />
          </div>
        </div>
        <div className="flex-grow h-full my-6 w-full mx-auto">
          <form className="flex flex-col justify-end mx-auto gap-y-6 w-[95%] md:w-3/5">
            <TextInput placeholder="Enter Email" inputType="email" />
            <TextInput placeholder="Password" inputType="password" />

            {/* Remember me checkbox  */}
            <div className="flex items-center gap-x-4">
              <input
                type="checkbox"
                name="checkbox"
                className="text-primary rounded-sm outline-none border border-primary active:outline-none"
              />
              <small className="text-primary">Remember me</small>
            </div>

            <div className="my-4">
              <Button primary text="Login" />
            </div>
          </form>

          <div className="w-[95%] mx-auto md:w-3/5">
            <Link href="/forgot-password">
              <p className="text-primary mx-auto mb-3 text-md text-right">
                Forgot Password?
              </p>
            </Link>

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

import Image from "next/image";

import message from "@assets/svg/message.svg";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { crumbs } from "@lib/dummy";

export default function VerifyAdminPage() {
  return (
    <>
      <section className="w-full ml-6">
        <header>
          <BreadCrumb crumbs={crumbs} />
        </header>

        <main>
          <h2 className="text-2xl font-semibold">New Admin</h2>

          <form className="flex flex-col gap-y-3 md:ml-8 my-4 w-[95%] md:w-3/5">
            <div className="flex flex-col md:flex-row gap-x-5 mb-8">
              <div className="">
                <Image src={message} alt="message icon" />
              </div>
              <div className="flex flex-col gap-y-4">
                <h3 className="font-semibold text-2xl">Pin Verification</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  accusantium facere placeat, illum hic obcaecati.
                </p>

                <div className="flex items-center justify-start gap-x-4">
                  <TextInput placeholder="" inputType="tel" />
                  <TextInput placeholder="" inputType="tel" />
                  <TextInput placeholder="" inputType="tel" />
                  <TextInput placeholder="" inputType="tel" />
                  <TextInput placeholder="" inputType="tel" />
                  <TextInput placeholder="" inputType="tel" />
                </div>
              </div>
            </div>

            <FormNav rightBtnText="Create Admin" />
          </form>
        </main>
      </section>
    </>
  );
}

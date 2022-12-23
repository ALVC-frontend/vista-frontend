import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";

import { BreadCrumb, Button, TextInput } from "@components/index";
import { newQuestion } from "@lib/dummy";
import Link from "next/link";

export default function Page() {
  return (
    <section className="pl-4">
      <header>
        <BreadCrumb crumbs={newQuestion} />
        <h2 className="font-semibold text-xl mb-4">New Question</h2>
      </header>
      <main className="">
        <form className="flex gap-x-4 flex-col-reverse md:flex-row gap-y-2">
          <div className="flex flex-col gap-y-4 basis-2/3">
            <div className="flex w-full items-center">
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
                >
                  <small className="opacity-[0.44]">Category</small>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
                >
                  <li>
                    <a className="">Hotel</a>
                  </li>
                </ul>
              </div>
            </div>
            <TextInput placeholder="Title" inputType="text" />
            <div className="flex w-full items-center">
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
                >
                  <small className="opacity-[0.44]">Kind</small>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
                >
                  <li>
                    <a className="">Option</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="" id="" />
              <small>Intro</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="" id="" checked />
              <small>Allows note</small>
            </div>
            <TextInput inputType="text" placeholder="Note title" />
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray"
            />
            <div className="flex justify-between items-center bg-lightGray rounded-md p-2">
              <TextInput inputType="text" placeholder="Answers" />
              <Button
                text="Add answer"
                extraStyles="outline outline-1 outline-primary text-primary m-1"
              />
            </div>
            <div className="flex justify-between items-center bg-lightGray rounded-md p-2">
              <TextInput inputType="text" placeholder="Locking condition" />
              <Button
                text="Add condition"
                extraStyles="outline outline-1 outline-primary text-primary m-1"
              />
            </div>
            <div className="flex justify-end my-6">
              <Link href="/questions">
                <Button text="Create Question" primary />
              </Link>
            </div>
          </div>

          <div className="basis-1/3 flex flex-col gap-y-4 px-3 ">
            <h3 className="font-semibold flex items-center gap-x-2 text-primary">
              <span>Customize appearance </span>
              <PencilIcon className="w-4 h-4" />
            </h3>

            <div className="flex w-full items-center">
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
                >
                  <small className="opacity-[0.44]">Text style</small>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
                >
                  <li>
                    <a className="">Style 1</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <input type="checkbox" />
              <small className="text-primary">Blur background</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" />
              <small className="text-primary">Background overlay</small>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
}

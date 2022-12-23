import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { BreadCrumb, Button } from "@components/index";
import { statusQuestions } from "@lib/dummy";
import Link from "next/link";

export default function Page() {
  return (
    <section className="">
      <header>
        <BreadCrumb crumbs={statusQuestions} />
        <div className="flex items-center justify-between px-4">
          <h2 className="font-semibold text-xl flex-grow">Questions</h2>
          <Link href="/questions/new">
            <Button text="New Question" primary extraStyles="" />
          </Link>
        </div>

        {/* Filter area  */}
        <div className="flex items-center flex-grow justify-between px-3 gap-x-4 cursor-pointer my-6 w-full">
          <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
            <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
            <input
              type="search"
              placeholder="Search by title"
              className="outline-none border-none"
            />
          </div>

          <div className="outline outline-1 flex justify-center flex-grow outline-primary p-2 cursor-pointer rounded-md">
            <p className="flex items-center gap-x-3 text-primary text-xs md:text-md">
              <FunnelIcon className="w-4 h-4" />
              <span>Filter by category</span>
            </p>
          </div>
          <div className="outline outline-1 flex justify-center flex-grow outline-primary p-2 cursor-pointer rounded-md">
            <p className="flex items-center gap-x-3 text-primary text-xs md:text-md">
              <FunnelIcon className="w-4 h-4" />
              <span>Filter by kind</span>
            </p>
          </div>
        </div>
      </header>

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Category</th>
              <th className="bg-lightGray">Title</th>
              <th className="bg-lightGray">Kind</th>
              <th className="bg-lightGray">Intro</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <p className="text-primary">Hotel</p>
              </td>
              <td>
                <p>What are your main reasons to visit a hotel?</p>
              </td>
              <td>
                <small>Unordered list</small>
              </td>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  True
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-primary">Hotel</p>
              </td>
              <td>
                <p>
                  Will your trip to the hotel be organized through a travel
                  agency or another organizer?
                </p>
              </td>
              <td>
                <small>Option</small>
              </td>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  True
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text-primary">Hotel</p>
              </td>
              <td>
                <p>Who will accompany you on your visit to hotel?</p>
              </td>
              <td>
                <small>Unordered list</small>
              </td>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  True
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-primary">Hotel</p>
              </td>
              <td>
                <p>How often do you stay at hotels?</p>
              </td>
              <td>
                <small>Option</small>
              </td>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  True
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-primary">Hotel</p>
              </td>
              <td>
                <p>What booking method do you prefer to use?</p>
              </td>
              <td>
                <small>Unordered list</small>
              </td>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  True
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-primary">Hotel/Budget</p>
              </td>
              <td>
                <p>
                  How much do you plan to spend during your visit to the hotel
                  on restaurants/cafe?
                </p>
              </td>
              <td>
                <small>Unordered list</small>
              </td>
              <td>
                <p className="badge bg-red-200 text-red-400 text-sm border-red-200 p-4">
                  False
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}

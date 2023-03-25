import { BreadCrumb, Button } from "@components/index";
import { newDataImports } from "@lib/dummy";

export default function Page() {
  return (
    <section className="pl-4">
      <header>
        <BreadCrumb crumbs={newDataImports} />
        <h2 className="font-semibold">Import new data</h2>
      </header>
      <main>
        <form className="w-[95%] md:w-3/5">
          <div className="">
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray rounded-md"
            />
          </div>

          <small className="opacity-[0.44]">Categories</small>
          <div className="bg-lightGray p-4 rounded-md space-y-4">
            <div className="flex items-center gap-x-3">
              <input type="checkbox" />
              <small>Visibility conditions</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" />
              <small>Questions</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" />
              <small>Locking conditions</small>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button text="Import" primary extraStyles="w-1/5" />
          </div>
        </form>
      </main>
    </section>
  );
}

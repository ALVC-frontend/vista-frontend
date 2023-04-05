import axios from 'axios';
import { BreadCrumb, Button } from "@components/index";
import { newDataImports } from "@lib/dummy";

export default function Page() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await axios.post('http://localhost:4000/api/data-imports', formData);

      console.log(response.data); // do something with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="pl-4">
      <header>
        <BreadCrumb crumbs={newDataImports} />
        <h2 className="font-semibold">Import new data</h2>
      </header>
      <main>
        <form className="w-[95%] md:w-3/5" onSubmit={handleSubmit}>
          <div className="">
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray rounded-md"
              name="file"
            />
          </div>

          <small className="opacity-[0.44]">Categories</small>
          <div className="bg-lightGray p-4 rounded-md space-y-4">
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="visibility_conditions" />
              <small>Visibility conditions</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="questions" />
              <small>Questions</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="locking_conditions" />
              <small>Locking conditions</small>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button text="Import" primary extraStyles="w-1/5" type="submit" />
          </div>
        </form>
      </main>
    </section>
  );
}

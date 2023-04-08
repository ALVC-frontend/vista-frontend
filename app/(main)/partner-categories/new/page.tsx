import { useRouter } from 'next/navigation';
import axios from "axios";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { newPartnerCategories } from "@lib/dummy";

export default function Page(): JSX.Element {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent default form submission

    const titleInput = document.getElementById("title-input") as HTMLInputElement;
    const title = titleInput.value;
    console.log("Title:", title);

    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    console.log("File:", file);

    const formData = new FormData();
    formData.append("title", title);
    //formData.append("image", file);

    try {
      const response = await axios.post("/api/partner-categories", formData);
      console.log("API response:", response.data);
      push("/partner-categories");
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newPartnerCategories} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New partner category</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]"
          onSubmit={handleSubmit}
        >
          <TextInput inputType="text" placeholder="Title" id="title-input" />

          <input
            type="file"
            id="file-input"
            className="file-input file-input-ghost bg-lightGray"
          />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create partner category"
            rightBtnAction={handleSubmit}
          />
        </form>
      </main>
    </section>
  );
}

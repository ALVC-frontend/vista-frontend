import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import { BreadCrumb, FormNav, TextInput } from "@components/index";

export default function Page() {
  const { push } = useRouter();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const createPreferenceGroup = () => {
    const data = {
      title: title,
      questions: questions.filter((question) => question !== ""),
    };
    axios.post("/api/preference-group", data).then(() => {
      push("/preference-group");
    });
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={["New Preference Group"]} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Preference Group</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <TextInput
            inputType="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44]">Questions</small>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
              >
                {questions.map((question, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      className="w-full"
                      value={question}
                      onChange={(event) => handleQuestionChange(event, index)}
                    />
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={addQuestion}
                  >
                    Add question
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create group"
            rightBtnAction={createPreferenceGroup}
          />
        </form>
      </main>
    </section>
  );
}

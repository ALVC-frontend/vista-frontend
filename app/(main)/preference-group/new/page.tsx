"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import { BreadCrumb, FormNav,  TextInput } from "@components/index";
import React from "react";

interface Question {
  id: number;
  category_id: number;
  title: string;
  kind: string;
  category: {
    id: number;
    name: string;
  };
}

interface FormData {
  title: string;
  question_ids: number[];
}

interface Props {
  questions: Question[];
}

const Questions = ({ questions, ...props }: Props & any): JSX.Element => {
  return (
    <select {...props} className="w-full h-12 p-3 bg-lightGray border-none rounded-md">
      <option value="">Select a question...</option>
      {questions.map((question: Question) => (
        <option key={question.id} value={question.id}>
          {question.title}
        </option>
      ))}
    </select>
  );
};

export default function PreferenceGroupForm(): JSX.Element {
  const { push } = useRouter();
  const [title, setTitle] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const getQuestions = () => {
    axios.get<Question[]>("https://vista-testing.herokuapp.com/api/admin/questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const questionId = parseInt(event.target.value);
    setSelectedQuestion(questionId);
  };
  const createPreferenceGroup = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data: FormData = {
      title: title,
      question_ids: [selectedQuestion],
    };
    axios
      .post("https://vista-testing.herokuapp.com/api/admin/preference_groups", data)
      .then((response) => {
        // Redirect to preference group page regardless of response data
        push("/preference-group");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={[]} />
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

          <Questions
            questions={questions}
            value={selectedQuestion.toString()}
            onChange={handleQuestionChange}
          />

          <FormNav
            rightBtnText="Create group"
            rightBtnAction={createPreferenceGroup}
          />
        </form>
      </main>
    </section>
  );
}

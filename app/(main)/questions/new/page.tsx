"use client";
import axios from 'axios';
import { useState } from 'react';
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import { BreadCrumb, Button, TextInput } from "@components/index";
import { newQuestion } from "@lib/dummy";
import Link from "next/link";

export default function Page() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [kind, setKind] = useState('');
  const [intro, setIntro] = useState(false);
  const [allowsNote, setAllowsNote] = useState(true);
  const [noteTitle, setNoteTitle] = useState('');
  const [file, setFile] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [lockingCondition, setLockingCondition] = useState('');
  const [textStyle, setTextStyle] = useState('');
  const [blurBackground, setBlurBackground] = useState(false);
  const [backgroundOverlay, setBackgroundOverlay] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('kind', kind);
    formData.append('intro', intro);
    formData.append('allowsNote', allowsNote);
    formData.append('noteTitle', noteTitle);
    if (file) {
      formData.append('file', file);
    }
    formData.append('answers', JSON.stringify(answers));
    formData.append('lockingCondition', lockingCondition);
    formData.append('textStyle', textStyle);
    formData.append('blurBackground', blurBackground);
    formData.append('backgroundOverlay', backgroundOverlay);
    const response = await axios.post('http://localhost:4000/admin/questions', formData);
    console.log(response.data);
  };

  const handleAnswerChange = (event, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, '']);
  };

  const handleAnswerRemove = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setAnswers(updatedAnswers);
  };


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

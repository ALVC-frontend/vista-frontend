"use client";
import axios from 'axios';
import { useState } from 'react';
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import { BreadCrumb, Button, TextInput } from "@components/index";
import { newQuestion } from "@lib/dummy";
import Link from "next/link";

export default function NewQuestionForm() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("");
  const [intro, setIntro] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [allowsNote, setAllowsNote] = useState(true);
  const [answers, setAnswers] = useState<string>("");
  const [lockingCondition, setLockingCondition] = useState("");

  const createQuestion = async () => {
    try {
      const response = await axios.post("/api/questions", {
        question: {
          category,
          title,
          kind,
          intro,
          note_title: noteTitle,
          allows_note: allowsNote,
          answers,
          locking_condition: lockingCondition,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    createQuestion();
  };



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" value={category} onChange={(event) => setCategory(event.target.value)} />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="kind">Kind:</label>
        <input type="text" id="kind" value={kind} onChange={(event) => setKind(event.target.value)} />
      </div>
      <div>
        <label htmlFor="intro">Intro:</label>
        <input type="checkbox" id="intro" checked={intro} onChange={(event) => setIntro(event.target.checked)} />
      </div>
      <div>
        <label htmlFor="noteTitle">Note Title:</label>
        <input type="text" id="noteTitle" value={noteTitle} onChange={(event) => setNoteTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="allowsNote">Allows Note:</label>
        <input type="checkbox" id="allowsNote" checked={allowsNote} onChange={(event) => setAllowsNote(event.target.checked)} />
      </div>
      <div>
        <label htmlFor="answers">Answers:</label>
        <input type="text" id="answers" value={answers} onChange={(event) => setAnswers(event.target.value)} />
      </div>
      <div>
        <label htmlFor="lockingCondition">Locking Condition:</label>
        <input type="text" id="lockingCondition" value={lockingCondition} onChange={(event) => setLockingCondition(event.target.value)} />
      </div>
      <button type="submit">Create Question</button>
    </form>
  );
}

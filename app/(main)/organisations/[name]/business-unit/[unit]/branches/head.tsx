"use client";

export default function Head({ params }: any) {
  return (
    <>
      <title>
        Branches {params.unit} | {params.name}
      </title>
    </>
  );
}

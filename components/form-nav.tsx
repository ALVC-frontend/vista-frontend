"use client";

import { useRouter } from "next/navigation";

import { Button } from ".";

type Props = {
  rightBtnAction?: () => any;
  rightBtnText: string;
};

const FormNav = ({ rightBtnAction, rightBtnText }: Props) => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between px-1">
      <Button
        text="Cancel"
        onPress={() => router.back()}
        subtle
        extraStyles="md:w-1/5"
      />

      <Button
        onPress={rightBtnAction}
        text={rightBtnText}
        primary
        extraStyles="md:w-1/5"
      />
    </div>
  );
};

export default FormNav;

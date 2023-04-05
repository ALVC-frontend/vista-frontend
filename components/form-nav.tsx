"use client";

import { useRouter } from 'next/navigation';;

import { Button } from ".";

type Props = {
  extraStyles?: string;
  leftBtnText?: string;
  rightBtnAction?: () => any;
  rightBtnStyles?: string;
  rightBtnText: string;
};

const FormNav = ({
  extraStyles,
  leftBtnText = "Cancel",
  rightBtnAction,
  rightBtnStyles,
  rightBtnText,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className={`w-full flex items-center justify-between px-1 ${extraStyles}`}
    >
      <Button
        text={leftBtnText}
        onPress={() => router.back()}
        subtle
        extraStyles="md:w-1/5"
      />

      <Button
        extraStyles={`md:w-1/5 ${rightBtnStyles}`}
        onPress={rightBtnAction}
        text={rightBtnText}
        primary
      />
    </div>
  );
};

export default FormNav;

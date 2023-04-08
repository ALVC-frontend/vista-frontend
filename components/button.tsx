"use client";

type Props = {
  extraStyles?: string;
  onPress?: () => any;
  primary?: boolean;
  subtle?: boolean;
  text: string;
  isLoading?: boolean;
  onClick?: () => void;
  OnSubmit?: () => any;
  type?: string;
  disabled?: boolean;
};


const button = ({
  extraStyles,
  onPress,
  primary = false,
  subtle,
  text,
}: Props) => {
  return (
    <button
      onClick={onPress}
      className={`p-2 ${
        primary
          ? "bg-primary text-white"
          : subtle
          ? "bg-background text-red-500 underline"
          : ""
      } w-full rounded-md ${extraStyles}`}
    >
      {text}
    </button>
  );
};

export default button;

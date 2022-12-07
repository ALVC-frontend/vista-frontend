import { subtle } from "crypto";

type Props = {
  extraStyles?: string;
  text: string;
  primary?: boolean;
  subtle?: boolean;
};

const button = ({ extraStyles, primary = false, text }: Props) => {
  return (
    <button
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

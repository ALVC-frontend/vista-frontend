import { Button } from ".";

type Props = {};

const FormNav = (props: Props) => {
  return (
    <div className="w-full flex items-center justify-around">
      <Button
        text="Cancel"
        subtle
        extraStyles="text-red-500 underline basis-3/4"
      />
      <Button text="Next" primary extraStyles="basis-1/4" />
    </div>
  );
};

export default FormNav;

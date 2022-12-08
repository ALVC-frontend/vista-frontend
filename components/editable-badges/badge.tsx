import { XCircleIcon } from "@heroicons/react/20/solid";

type Props = {
  badge: string;
  onClick: (b: string) => void;
};

const Badge = ({ badge, onClick }: Props) => {
  return (
    <div className="bg-white p-2 rounded-md flex gap-x-3 items-center m-2">
      <small className="opacity-[0.44]">{badge}</small>
      <XCircleIcon
        className="w-4 h-4 opacity-[0.44]"
        onClick={() => onClick(badge)}
      />
    </div>
  );
};

export default Badge;

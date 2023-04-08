"use client";

import { useState, useCallback, useRef } from "react";
import Badge from "./badge";

type Props = {
  editableBadges: string[];
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  onBadgesChange?: any;
};

const BadgeContainer = ({ editableBadges, placeholder = "" }: Props) => {
  const [badges, setBadges] = useState(editableBadges);
  const [newBadge, setNewBadge] = useState("");
  const badgeRef = useRef(null);

  const deleteBadge = useCallback(
    (badge: string) => {
      setBadges(badges.filter((b) => b !== badge));
    },
    [badges]
  );

  const handleChange = (e: any) => setNewBadge(e.target.value);

  const onEnter = (e: any) => {
    e.preventDefault();

    if (e.keyCode === 32) {
      //@ts-ignore
      setBadges((prev) => [...prev, newBadge]);
      setNewBadge("");
    }
  };

  return (
    <div
      className="w-full flex p-1 flex-wrap rounded-md bg-lightGray overflow-hidden"
      onClick={() => {
        //@ts-ignore
        badgeRef.current.focus();
      }}
    >
      {badges.map((badge) => (
        //@ts-ignore
        <Badge key={badge} badge={badge} onClick={deleteBadge} />
      ))}

      <input
        type="text"
        className="bg-lightGray outline-none p-2"
        value={newBadge}
        onChange={handleChange}
        placeholder={badges.length ? "" : placeholder}
        onKeyUp={onEnter}
        ref={badgeRef}
      />
    </div>
  );
};

export default BadgeContainer;

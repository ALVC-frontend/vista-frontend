"use client";

import { useState, useCallback, useRef } from "react";
import Badge from "./badge";

type Props = {};

const BadgeContainer = (props: Props) => {
  const [badges, setBadges] = useState(["branch 1", "branch2"]);
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
    if (e.keyCode === 13) {
      //@ts-ignore
      setBadges((prev) => [...prev, newBadge]);
      setNewBadge("");
    }
  };

  return (
    <div
      className="w-full flex p-1 flex-wrap bg-lightGray overflow-hidden"
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
        onKeyUp={onEnter}
        ref={badgeRef}
      />
    </div>
  );
};

export default BadgeContainer;

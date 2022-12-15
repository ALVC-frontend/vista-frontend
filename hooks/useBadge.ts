/**
 * usable react hook for updating badges in the badge container
 */

import { useCallback, useRef, useState } from "react";


const editableBadges = ["hello"];

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
  e.preventdefault();
  if (e.keyCode === 13) {
    //@ts-ignore
    setBadges((prev) => [...prev, newBadge]);
    setNewBadge("");
  }
};
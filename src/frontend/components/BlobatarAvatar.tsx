import { useEffect, useState } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import "blobatar/motion.css";
import "blobatar/gaze.css";

interface BlobatarAvatarProps {
  name: string;
  size?: number;
}

export default function BlobatarAvatar({
  name,
  size = 40,
}: BlobatarAvatarProps) {
  const [canHover, setCanHover] = useState(false);
  const { ref, lookAt } = useGaze({ travel: 3, lookAt: "pointer" });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setCanHover(true);
    }
  }, []);

  useEffect(() => {
    if (canHover) lookAt("pointer");
  }, [canHover, lookAt]);

  return (
    <Blobatar
      ref={canHover ? ref : undefined}
      name={name}
      animate="always"
      size={size}
    />
  );
}

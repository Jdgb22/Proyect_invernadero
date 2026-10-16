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
  const [error, setError] = useState(false);
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

  if (error) {
    const letter = (name?.[0] || "U").toUpperCase();
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-lime-600 text-white font-bold"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
      >
        {letter}
      </div>
    );
  }

  return (
    <Blobatar
      ref={canHover ? ref : undefined}
      name={name}
      animate="always"
      size={size}
      onError={() => setError(true)}
    />
  );
}

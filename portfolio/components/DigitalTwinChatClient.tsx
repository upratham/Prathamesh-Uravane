"use client";

import { useEffect, useState } from "react";

import DigitalTwinChat from "@/components/DigitalTwinChat";

export default function DigitalTwinChatClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <DigitalTwinChat />;
}

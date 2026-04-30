"use client";

import type { AnchorHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from "react";

type EmailActionProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  email: string;
  children: ReactNode;
  style?: CSSProperties;
};

export default function EmailAction({
  email,
  children,
  className,
  style,
  target = "_blank",
  rel = "noopener noreferrer",
  title = "Compose email",
  onClick,
  ...rest
}: EmailActionProps) {
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Ignore clipboard failures; the compose link still works.
    }
  };

  return (
    <a
      {...rest}
      href={composeUrl}
      target={target}
      rel={rel}
      title={title}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

import type { ReactNode } from "react";

/** Device frame. Children render inside the screen. */
export default function Phone({
  children,
  className = "",
  dark = true,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`phone ${dark ? "phone-dark" : "phone-light"} ${className}`}>
      <span className="phone-btn phone-btn-a" aria-hidden="true" />
      <span className="phone-btn phone-btn-b" aria-hidden="true" />
      <div className="phone-screen">
        <span className="phone-island" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

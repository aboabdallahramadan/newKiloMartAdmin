import React from "react";
import Link from "next/link";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  click?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
}

const ButtonDefault = ({
  label,
  link,
  customClasses,
  children,
  click
}: ButtonPropTypes) => {
  return (
    <>
      <Link
        className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${customClasses}`}
        href={link}
        onClick={click}
      >
        {children}
        {label}
      </Link>
    </>
  );
};

export default ButtonDefault;

import type { JSX } from "react";
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

type IArrowButton = {
  to: string;
  children: JSX.Element | string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ArrowButton = ({
  to = "/",
  children,
  ...props
}:IArrowButton) => {
  return (
    <Link to={to}>
      <button {...props} >
        <p>{children}</p> <HiOutlineChevronRight />
      </button>
    </Link>
  );
};

export default ArrowButton;

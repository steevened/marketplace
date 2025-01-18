import React, { SVGProps } from "react";

export default function UserLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="currentColor"
      >
        <path d="M7 15a3 3 0 1 0 0 6a3 3 0 0 0 0-6m10 0a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-3 2h-4m12-4c-2.457-1.227-6.027-2-10-2s-7.543.773-10 2"></path>
        <path d="m19 11.5l-1.058-6.788c-.215-1.384-1.719-2.134-2.933-1.463l-.615.34a4.94 4.94 0 0 1-4.788 0l-.615-.34c-1.214-.67-2.718.08-2.933 1.463L5 11.5"></path>
      </g>
    </svg>
  );
}

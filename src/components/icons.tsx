// Inline SVGs for Lensies. Each is a small React component.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function LensiesLogo(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 32"
      fill="currentColor"
      aria-label="Lensies"
      {...props}
    >
      <g>
        <circle cx="13" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13" cy="16" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13" cy="16" r="1.8" fill="currentColor" />
      </g>
      <text
        x="32"
        y="22"
        fontFamily="var(--font-zagma), serif"
        fontSize="20"
        fontWeight="400"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        lensies
      </text>
    </svg>
  );
}

export function LensiesLogoLarge(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 140"
      fill="currentColor"
      aria-label="Lensies"
      {...props}
    >
      <g>
        <circle cx="70" cy="70" r="50" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="70" cy="70" r="25" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="70" cy="70" r="8" fill="currentColor" />
        <line x1="70" y1="10" x2="70" y2="25" stroke="currentColor" strokeWidth="2.5" />
        <line x1="70" y1="115" x2="70" y2="130" stroke="currentColor" strokeWidth="2.5" />
        <line x1="10" y1="70" x2="25" y2="70" stroke="currentColor" strokeWidth="2.5" />
        <line x1="115" y1="70" x2="130" y2="70" stroke="currentColor" strokeWidth="2.5" />
      </g>
      <text
        x="170"
        y="95"
        fontFamily="var(--font-zagma), serif"
        fontSize="100"
        fontWeight="400"
        letterSpacing="-4"
        fill="currentColor"
      >
        lensies
      </text>
    </svg>
  );
}

// Backwards-compat aliases
export const WaabiLogo = LensiesLogo;
export const WaabiLogoLarge = LensiesLogoLarge;

export function ArrowUpRight(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 5 5"
      fill="currentColor"
      {...props}
    >
      <path d="M3.35788 0.947849L0.607899 0.947923C0.473598 0.947874 0.362229 0.901764 0.273791 0.809595C0.185354 0.717425 0.141135 0.604215 0.141135 0.469963C0.146046 0.340523 0.192719 0.229718 0.281157 0.137549C0.369595 0.0453795 0.480964 -0.00072999 0.615265 -0.000779038L4.50435 -0.000778542C4.5703 -0.000729467 4.63102 0.0118169 4.68651 0.0368602C4.74195 0.0618545 4.79166 0.0963506 4.83566 0.140348C4.87966 0.184346 4.91415 0.234064 4.93915 0.289503C4.96419 0.344992 4.97674 0.40571 4.97679 0.471657L4.97671 4.36421C4.97671 4.49109 4.93092 0.60033 4.83934 4.69191C4.74776 4.78349 4.63666 4.83114 4.50605 4.83487C4.37179 4.83487 4.25858 4.78879 4.16641 4.69662C4.07424 4.60445 4.02813 4.49122 4.02809 4.35691L4.02816 1.61813L2.42067 3.22562L0.813181 4.83311C0.719145 4.92714 0.607432 4.97418 0.478042 4.97423C0.348651 4.97418 0.236938 4.92714 0.142902 4.83311C0.048867 4.73907 0.00182472 4.62736 0.00177568 4.49797C0.00182491 4.36858 0.0488672 4.25686 0.142903 4.16283L3.35788 0.947849Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7 7"
      fill="none"
      {...props}
    >
      <path
        d="M3.5 3.5L0.5 0.5M3.5 3.5L6.5 6.5M3.5 3.5L6.5 0.5M3.5 3.5L0.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 12"
      fill="none"
      {...props}
    >
      <path
        d="M0 1H18M0 6H18M0 11H18"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 6 10"
      fill="none"
      {...props}
    >
      <path
        d="M0.5 0.5L5 5L0.5 9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7 12"
      fill="none"
      {...props}
    >
      <path
        d="M6.5 0.5L1 6L6.5 11.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7 12"
      fill="none"
      {...props}
    >
      <path
        d="M0.5 0.5L6 6L0.5 11.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M13.5 0H2.5C1.125 0 0 1.125 0 2.5V13.5C0 14.875 1.125 16 2.5 16H13.5C14.875 16 16 14.875 16 13.5V2.5C16 1.125 14.875 0 13.5 0ZM5 13H3V6H5V13ZM4 5C3.175 5 2.5 4.325 2.5 3.5C2.5 2.675 3.175 2 4 2C4.825 2 5.5 2.675 5.5 3.5C5.5 4.325 4.825 5 4 5ZM13 13H11V9.5C11 8.675 10.325 8 9.5 8C8.675 8 8 8.675 8 9.5V13H6V6H8V7C8.425 6.425 9.525 6 10.5 6C11.875 6 13 7.125 13 8.5V13Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 12"
      fill="currentColor"
      {...props}
    >
      <path d="M15.6656 1.87656C15.4656 1.12656 14.8781 0.539062 14.1281 0.339062C12.7781 0 8 0 8 0C8 0 3.22188 0 1.87188 0.339062C1.12188 0.539062 0.534375 1.12656 0.334375 1.87656C0 3.22188 0 6 0 6C0 6 0 8.77812 0.334375 10.1234C0.534375 10.8734 1.12188 11.4609 1.87188 11.6609C3.22188 12 8 12 8 12C8 12 12.7781 12 14.1281 11.6609C14.8781 11.4609 15.4656 10.8734 15.6656 10.1234C16 8.77812 16 6 16 6C16 6 16 3.22188 15.6656 1.87656ZM6.4 8.57188V3.42812L10.5578 6L6.4 8.57188Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M11.6 1H14L8.9 6.8L15 15H10.4L6.8 10.2L2.6 15H0.2L5.7 8.7L0 1H4.7L8 5.4L11.6 1ZM10.8 13.5H12.2L4.3 2.4H2.8L10.8 13.5Z" />
    </svg>
  );
}

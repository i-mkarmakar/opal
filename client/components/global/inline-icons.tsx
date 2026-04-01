import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const base = "inline-block shrink-0";

function wrap(
  name: string,
  children: React.ReactNode,
  viewBox = "0 0 24 24",
) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
    { className, ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ? `${base} ${className}` : base}
        {...props}
      >
        {children}
      </svg>
    );
  });
  Icon.displayName = name;
  return Icon;
}

export const CheckIcon = wrap("CheckIcon", <path d="M20 6 9 17l-5-5" />);

export const ChevronDownIcon = wrap(
  "ChevronDownIcon",
  <path d="m6 9 6 6 6-6" />,
);

export const ChevronUpIcon = wrap("ChevronUpIcon", <path d="m18 15-6-6-6 6" />);

export const ChevronRightIcon = wrap(
  "ChevronRightIcon",
  <path d="m9 18 6-6-6-6" />,
);

export const ChevronLeftIcon = wrap(
  "ChevronLeftIcon",
  <path d="m15 18-6-6 6-6" />,
);

export const CircleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  function CircleIcon({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className ? `${base} ${className}` : base}
        {...props}
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      </svg>
    );
  },
);
CircleIcon.displayName = "CircleIcon";

export const MenuIcon = wrap(
  "MenuIcon",
  <>
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </>,
);

export const CalendarIcon = wrap(
  "CalendarIcon",
  <>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </>,
);

export const TrendingUpIcon = wrap(
  "TrendingUpIcon",
  <>
    <path d="M16 7h6v6" />
    <path d="m22 7-8.5 8.5-5-5L2 17" />
  </>,
);

export const TrendingDownIcon = wrap(
  "TrendingDownIcon",
  <>
    <path d="M16 17h6v-6" />
    <path d="m22 17-8.5-8.5-5 5L2 7" />
  </>,
);

export const UploadIcon = wrap(
  "UploadIcon",
  <>
    <path d="M12 3v12" />
    <path d="m17 8-5-5-5 5" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  </>,
);

export const CheckCircleIcon = wrap(
  "CheckCircleIcon",
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>,
);

export const PanelLeftIcon = wrap(
  "PanelLeftIcon",
  <>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
  </>,
);

/** GitHub mark — filled (uses currentColor, e.g. text-white in sidebar) */
export const GithubIcon = React.forwardRef<SVGSVGElement, IconProps>(
  function GithubIcon({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className ? `${base} ${className}` : base}
        fill="currentColor"
        {...props}
      >
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    );
  },
);
GithubIcon.displayName = "GithubIcon";

export const CrownIcon = wrap(
  "CrownIcon",
  <>
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7z" />
    <path d="M5 20h14" />
  </>,
);

export const CreditCardIcon = wrap(
  "CreditCardIcon",
  <>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M2 10h20" />
  </>,
);

export const GitPullRequestIcon = wrap(
  "GitPullRequestIcon",
  <>
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
    <path d="M6 9v12" />
  </>,
);

export const DatabaseIcon = wrap(
  "DatabaseIcon",
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </>,
);

export const PhoneIcon = wrap(
  "PhoneIcon",
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
);

export const MapPinIcon = wrap(
  "MapPinIcon",
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </>,
);

export const MailIcon = wrap(
  "MailIcon",
  <>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </>,
);

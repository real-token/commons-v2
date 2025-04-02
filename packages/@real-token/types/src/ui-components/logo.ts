export type LogoProps = {
  width?: number;
  height?: number;
  color?: string;
};

export type Logo = (props: LogoProps) => React.ReactNode;

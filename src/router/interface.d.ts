import { ReactNode } from "react";
export interface IMenuProps {
  key: string;
  label: string;
  title: string;
  hidden?: boolean;
  icon?: ReactNode;
  element?: ReactNode;
  children?: IMenuProps[];
  nochild?: number;
}

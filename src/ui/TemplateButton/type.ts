import { ColorButtonProps } from "../ColorButton/type";

export type TemplateButtonProps = {
  onApply: () => void;
  onDelete: () => void;
} & ColorButtonProps;

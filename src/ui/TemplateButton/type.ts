import { ColorButtonProps } from '@/ui/ColorButton/type';

export type TemplateButtonProps = {
  onDelete: () => void;
  onApply: () => void;
} & Pick<ColorButtonProps, 'color' | 'children'>;

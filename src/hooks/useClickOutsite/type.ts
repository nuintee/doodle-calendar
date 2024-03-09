export type UseClickOutsideProps<T extends HTMLElement> = {
  onClickOutside: (ref: React.RefObject<T>) => void;
};

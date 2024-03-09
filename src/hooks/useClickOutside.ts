import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>({
  onClickOutside
}: {
  onClickOutside: (ref: React.RefObject<T>) => void;
}) => {
  const noCloseRef = useRef<T>(null);

  useEffect(() => {
    const init = () => {
      document.addEventListener('click', (e) => {
        const isDescendant = noCloseRef.current?.contains(e.target as Node);

        if (isDescendant || !noCloseRef.current) return;

        onClickOutside(noCloseRef);
      });
    };

    init();
  }, [onClickOutside]);

  const closeWith = (callback: () => unknown) => {
    onClickOutside(noCloseRef);
    callback();
  };

  return { noCloseRef, closeWith };
};

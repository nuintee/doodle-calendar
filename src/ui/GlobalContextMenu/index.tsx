import { InformationCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

import { version } from '../../../package.json';
import { useTemplates } from '../../hooks/useTemplates';
import { useClickOutside } from '../../hooks/useClickOutsite';

export const GlobalContextMenu = () => {
  const { clearTemplates } = useTemplates();

  const { noCloseRef, closeWith } = useClickOutside<HTMLDetailsElement>({
    onClickOutside: (ref) => {
      if (!ref.current) return;

      ref.current.open = false;
    }
  });

  const handleOnDelete = () => closeWith(clearTemplates);

  const handleOnInfo = () => closeWith(() => {});

  return (
    <details
      className="relative p-1"
      ref={noCloseRef}
      title="グローバルメニューの表示"
      aria-label="グローバルメニューの表示"
    >
      <summary className="cursor-pointer list-none marker:hidden">
        <EllipsisVerticalIcon
          height={24}
          width={24}
          className="fill-gray-500"
        />
      </summary>
      <div className="absolute right-0 flex w-[200px] flex-col gap-y-2 rounded-md border border-gray-100 bg-white p-2 shadow-sm">
        <button
          className="flex shrink-0 items-center gap-x-1 rounded-md p-2 text-start text-gray-500 enabled:hover:bg-gray-100"
          onClick={handleOnInfo}
        >
          <InformationCircleIcon height={24} width={24} />
          使い方
        </button>
        <button
          className="flex shrink-0 items-center gap-x-1 rounded-md p-2 text-start text-red-500 enabled:hover:bg-red-100"
          onClick={handleOnDelete}
        >
          <TrashIcon height={24} width={24} />
          全テンプレートの削除
        </button>
        <p className="w-full px-4 py-2 text-center">バージョン: {version}</p>
      </div>
    </details>
  );
};

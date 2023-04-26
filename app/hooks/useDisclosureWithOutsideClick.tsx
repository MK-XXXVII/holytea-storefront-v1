// hooks/useDisclosureWithOutsideClick.ts
import {useRef, useState} from 'react';
import {useOnClickOutside} from '~/hooks/useOnClickOutside';

export function useDisclosureWithOutsideClick() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useOnClickOutside(panelRef, () => {
    if (open) setOpen(false);
  });

  return {open, setOpen, panelRef};
}

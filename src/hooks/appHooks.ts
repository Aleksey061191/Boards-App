import { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useModal = () => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }
  return {
    open,
    toggle,
  };
};

export const useDialog = () => {
  const [openD, setOpenD] = useState(false);

  function toggleD() {
    setOpenD(!openD);
  }
  return {
    openD,
    toggleD,
  };
};

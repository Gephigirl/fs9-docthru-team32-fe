'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import Modal from '@/components/modal/Modal';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  // 모달 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);
  // 모달에 표시할 컨텐츠 (React Element)
  const [content, setContent] = useState(null);

  const openModal = useCallback((Component, props = {}) => {
    setContent(() => <Component {...props} />);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // 애니메이션 후 컨텐츠 제거 (선택사항)
    setTimeout(() => setContent(null), 200);
  }, []);

  const value = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}

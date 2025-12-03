'use client';

export default function Modal({ isOpen, onClose, children }) {
  // 모달이 닫힌 상태면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // 클릭된 요소가 backdrop 자체일 때만 모달 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-backdrop absolute inset-0 bg-black/50"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

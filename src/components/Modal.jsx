/* Reusable Modal with backdrop blur & scale-in animation */
function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="relative w-full max-w-lg mx-4 rounded-2xl bg-white shadow-2xl
                      animate-[scaleIn_.18s_ease-out] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && <div className="px-6 py-4 bg-gray-50">{footer}</div>}
      </div>

      {/* Tiny keyframe (inline) */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Modal;

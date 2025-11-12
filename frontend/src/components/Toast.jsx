import { useEffect } from "react";

export default function Toast({ open, type = "success", message, onClose, duration = 1800 }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="toast">
      <div className={`toast-card ${type}`}>{message}</div>
    </div>
  );
}

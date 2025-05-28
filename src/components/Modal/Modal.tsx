import { Button } from "nikx-ui";
import React from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <Button
            variant="secondary"
            size="small"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </Button>
        </div>
        <div className={`modal-body ${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

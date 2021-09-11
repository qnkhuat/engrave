// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
import React, { useRef } from "react";
import ReactDOM from "react-dom";

interface Props {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const handleOnClickBackDrop = (e: React.MouseEvent<HTMLElement>) => {
    if (backdropRef.current && backdropRef.current == e.target && onClose) onClose();
  }
  return ReactDOM.createPortal(
    <>
      {open && 
      <div ref={backdropRef} className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center"
        onClick={handleOnClickBackDrop}
      >
        <div>
          {children}
        </div>
      </div>
      }
    </>,
    document.body,
  )
}

export default Modal;

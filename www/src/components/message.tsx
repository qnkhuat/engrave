import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  messageType: "success" | "error" | "info";
}

const Message :React.FC<Props> = ({ messageType, className, children }) => {
  return <div className={`max-w-4/5 bg-white rounded-lg border-l-8 p-4 
    ${(messageType === 'success') ? 'border-green-400' : (messageType ==='info') ? 'border-yellow-400' : 'border-red-400'}
    ${className}`}>
    {children}
  </div>
}

export default Message;

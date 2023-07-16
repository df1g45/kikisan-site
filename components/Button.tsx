import React from "react";

function Button({ type, isLoading, style, icon, text, loadingStyle }: Props) {
  return (
    <div>
      <button
        type={type}
        className={`inline-flex items-center py-2 px-14 ml-2 text-sm font-medium ${style}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading style={loadingStyle} />
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {text}
          </>
        )}
      </button>
    </div>
  );
}

function Loading({ style }: { style?: string }) {
  return (
    <div className="flex justify-center">
      <div
        className={`animate-spin rounded-full border-b-2 border-gray-100 ${style}`}
      ></div>
    </div>
  );
}

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  style?: string;
  icon?: React.ReactNode;
  text?: string;
  loadingStyle?: string;
}

export default Button;

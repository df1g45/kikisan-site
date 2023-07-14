import React from "react";
import { RocketLaunchIcon, ScissorsIcon } from "@heroicons/react/24/solid";

function Button({ type, isLoading }: Props) {
  return (
    <div>
      <button
        type={type}
        className="inline-flex items-center py-2 px-14 ml-2 text-sm font-medium text-gray-100 bg-green-500 rounded-lg border border-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : <ScissorsIcon className="w-6 h-6" />}
      </button>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-100"></div>
    </div>
  );
}

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
}

export default Button;

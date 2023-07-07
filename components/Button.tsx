import React from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

function Button({ type, isLoading }: Props) {
  return (
    <div>
      <button
        type={type}
        className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : <RocketLaunchIcon className="w-6 h-6" />}
      </button>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    </div>
  );
}

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
}

export default Button;

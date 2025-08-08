import { CircleCheckIcon, AlertCircleIcon } from "lucide-react"

import React from 'react'

const Alert = ({ message = "Completed successfully!", type = "success" }) => {
  const isSuccess = type === "success";
  
  return (
    <div
      className={`rounded-md border px-4 py-3 ${
        isSuccess 
          ? "border-emerald-500/50 text-emerald-600" 
          : "border-red-500/50 text-red-600"
      }`}>
      <p className="text-sm">
        {isSuccess ? (
          <CircleCheckIcon
            className="me-3 -mt-0.5 inline-flex opacity-60"
            size={16}
            aria-hidden="true" />
        ) : (
          <AlertCircleIcon
            className="me-3 -mt-0.5 inline-flex opacity-60"
            size={16}
            aria-hidden="true" />
        )}
        {message}
      </p>
    </div>
  )
}

export default Alert
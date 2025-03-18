import React from "react"

interface ButtonProps{
    style ?: string
    label?: string
    onClick?: (event: any) => void
    type?: "submit" | "button" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ({style, label, onClick, type} : ButtonProps) => {
    return (       
            <button  className={`${style} text-white px-8 py-2 rounded-lg`}
              type={type}
              onClick={onClick}>{label}

            </button>
    )
}
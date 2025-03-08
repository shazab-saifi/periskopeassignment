"use client"

import { insertRoom } from "@/lib/mutation";
import { useState, useRef, useEffect } from "react";
import { TbMessageCirclePlus } from "react-icons/tb";

export default function CustomDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                resetForm();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            inputRef.current?.focus();
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
                resetForm();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
        } else {
            document.removeEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
        }
    }, [isOpen]);

    const openDialog = () => {
        setIsOpen(true);
    }

    const closeDialog = () => {
        setIsOpen(false);
        resetForm();
    }

    const resetForm = () => {
        setInputValue("");
        setSubmitted(false);
    }

    const handleSubmit = async () => {
        const error = insertRoom(inputValue);
        if (error) {
            console.error(error);
        } else {
            setSubmitted(true);
        }

        closeDialog();
    }

    return (
        <div className="font-sans">
            <button
                onClick={openDialog}
                className="absolute bottom-4 right-6 rounded-full bg-[#0C8F4E] p-4 text-sm font-medium text-white transition-colors hover:bg-[#438d68] cursor-pointer"
                type="button"
            >
                <TbMessageCirclePlus size={24} />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div
                        ref={dialogRef}
                        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-title"
                    >
                        <div className="mb-5">
                            <h2 id="dialog-title" className="text-xl font-semibold text-gray-900">
                                Enter your room name
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Please provide the requested information in the field below.
                            </p>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="custom-input" className="mb-2 block text-sm font-medium text-gray-900">
                                Room Name
                            </label>
                            <input
                                ref={inputRef}
                                id="custom-input"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0C8F4E] focus:outline-none focus:ring-1 focus:ring-[#0C8F4E]"
                                placeholder="Enter your name"
                            />
                        </div>
                        {submitted && inputValue.trim() && (
                            <div className="mb-5 rounded-md bg-green-50 p-4">
                                <p className="text-sm text-green-800">
                                    Thank you for your submission, {inputValue}!
                                </p>
                            </div>
                        )}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDialog}
                                className="rounded-md cursor-pointer border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0C8F4E] focus:ring-offset-2"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!inputValue.trim()}
                                className="rounded-md bg-[#0C8F4E] cursor-pointer px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#438d68]  focus:outline-none focus:ring-2 focus:ring-[#0C8F4E] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


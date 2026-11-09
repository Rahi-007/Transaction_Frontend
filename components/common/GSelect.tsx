"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { ChevronDown, Loader, Search, X } from "lucide-react";
import { Label } from "../ui/label";

type SelectOption = {
  label: string;
  value: string | number;
};

type IFormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  isLoading?: boolean;
};

function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select an option",
  options,
  disabled,
  required,
  isLoading = false,
}: IFormSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        return (
          <div ref={containerRef} className="relative mb-4 flex flex-col gap-1 w-full">
            {label && (
              <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </Label>
            )}

            <div
              onClick={() => !disabled && setIsOpen(!isOpen)}
              className={`flex h-10 w-full items-center justify-between border-b-2 bg-[#f6fbfa] px-3 text-sm cursor-pointer transition-colors duration-200
                ${isOpen ? "border-[#449690]" : "border-gray-300"}
                ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-[#449690]"}
                ${fieldState.error ? "border-red-500" : ""}
              `}
            >
              <span className={`truncate ${!selectedOption ? "text-gray-400" : "text-gray-900"}`}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <div className="flex items-center gap-1.5">
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin text-[#449690]" />
                ) : (
                  <>
                    {selectedOption && !disabled && (
                      <X
                        className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange("");
                          setSearchTerm("");
                        }}
                      />
                    )}

                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Dropdown Content */}
            {isOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%-4px)] z-50 mt-1 max-h-60 w-full overflow-hidden rounded-b-md bg-white shadow-lg border border-gray-200 flex flex-col">
                {/* Search Input Box */}
                <div className="flex items-center border-b border-gray-100 px-3 bg-gray-50">
                  <Search className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent py-2 px-2 text-sm outline-none placeholder-gray-400 text-gray-800"
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto max-h-48 divide-y divide-gray-50">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                      const isSelected = option.value === field.value;
                      return (
                        <div
                          key={option.value}
                          onClick={() => {
                            field.onChange(option.value);
                            setIsOpen(false);
                            setSearchTerm("");
                          }}
                          className={`cursor-pointer px-3 py-2.5 text-sm transition-colors duration-150
                            ${isSelected
                              ? "bg-[#449690] text-white font-medium"
                              : "text-gray-700 hover:bg-[#f6fbfa] hover:text-[#449690]"
                            }
                          `}
                        >
                          {option.label}
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-3 py-3 text-sm text-center text-gray-400">
                      No options found
                    </div>
                  )}
                </div>
              </div>
            )}

            {fieldState.error && (
              <p className="text-xs text-red-500 mt-0.5">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}

const GSelect = {
  Form: FormSelect,
};

export default GSelect;
"use client";

import * as React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type IFormProps<T extends FieldValues> = React.ComponentProps<typeof Input> & {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  readonly,
  required,
  type = "text",
  className,
  ...rest
}: IFormProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="grid gap-1 relative mb-4 w-full">
          {label && (
            <Label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
              {required && <span className="text-red-500"> *</span>}
            </Label>
          )}

          <Input
            {...field}
            {...rest}
            id={name}
            type={type}
            disabled={disabled}
            readOnly={readonly || disabled}
            value={field.value ?? ""}
            className={cn(
              "bg-[#f6fbfa] rounded-none border-b-2 border-gray-300 px-3 transition-colors duration-200",
              "hover:border-[#449690] focus-visible:border-[#449690]",
              fieldState.error ? "border-b-destructive" : "",
              className
            )}
          />

          {fieldState.error && (
            <p className="text-xs text-red-500 mt-0.5">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

const GInput = {
  Form: FormInput,
};

export default GInput;
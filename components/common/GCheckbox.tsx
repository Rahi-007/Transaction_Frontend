"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type IFormCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
};

function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: IFormCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />

            {label && (
              <Label htmlFor={name} className="cursor-pointer">
                {label}
              </Label>
            )}
          </div>

          {fieldState.error && (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

const GCheckbox = {
  Form: FormCheckbox,
};

export default GCheckbox;
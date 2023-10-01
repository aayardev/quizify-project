"use client";

import { ChangeEvent, InputHTMLAttributes, type ReactNode } from "react";

import {
  FormField as BaseFormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { ControllerProps, FieldPath, type FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import Dropzone from "../Dropzone";
type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  type: "text" | "email" | "dropzone" | "password";
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  type,
  required = false,
  label,
  description,
  disabled = false,
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & Props) => {
  return (
    <BaseFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required ? "*" : ""}
          </FormLabel>
          <FormControl>
            {type === "dropzone" ? (
              <Dropzone
                onChange={(file: File) => {
                  field.onChange(file);
                }}
              />
            ) : (
              <Input
                {...field}
                value={field.value}
                type={type}
                required={required}
                disabled={disabled}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;

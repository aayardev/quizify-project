"use client";
import { FormEvent, InputHTMLAttributes, type ReactNode } from "react";

import { Form as BaseForm } from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import FormField from "./FormField";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface Config extends Omit<InputProps, "name" | "defaultValue"> {
  name: string;
  label: string;
  required?: boolean;
  type: "text" | "email" | "dropzone" | "password";
}

interface Props<TFormValues extends FieldValues> {
  isSubmitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  form: UseFormReturn<TFormValues>;
  config: Config[];
  className?: string;
  btnPosition?: "left" | "right";
  btnContainerClassname?: string;
}

export default function Form<TFormValues extends FieldValues>({
  isSubmitting,
  onSubmit,
  form,
  config,
  btnPosition = "left",
  className,
  btnContainerClassname,
}: Props<TFormValues>) {
  return (
    <BaseForm {...form}>
      <form onSubmit={onSubmit}>
        <div className={cn("space-y-8", className && className)}>
          {config.map((input) => {
            return (
              <FormField
                control={form.control}
                {...input}
                name={input.name as Path<TFormValues>}
                key={input.name}
                disabled={isSubmitting}
              />
            );
          })}
        </div>
        <div
          className={cn(
            "flex mt-8 ",
            btnPosition === "right" ? "justify-end" : "justify-start",
            btnContainerClassname && btnContainerClassname
          )}
        >
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </BaseForm>
  );
}

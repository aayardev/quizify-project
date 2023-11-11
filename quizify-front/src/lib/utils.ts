import moment from "moment";
import { clsx, type ClassValue } from "clsx";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  var start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

export const EMAIL_NON_VERIFIED_ERROR_CODE = 0;

// https://www.carlrippon.com/react-hook-form-server-validation/
export function addServerErrors<T extends FieldValues>(
  errors: { [P in keyof T]?: string[] },
  setError: UseFormSetError<T>
) {
  return Object.keys(errors).forEach((key, index) => {
    setError(
      key as Path<T>,
      {
        type: "server",
        message: errors[key as keyof T]!.join(" "),
      },
      {
        shouldFocus: index === 0,
      }
    );
  });
}

export const urlToFile = async (url: string) => {
  const response = await fetch(url);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });
  return file;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isProgrammingLanguage = (language: string) => {
  const programmingLanguages = [
    "javascript",
    "python",
    "java",
    "c++",
    "c#",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "go",
    "typescript",
    "scala",
    "rust",
    "dart",
    "r",
    "matlab",
    "perl",
    "lua",
    "elixir",
    "haskell",
    "cobol",
    "fortran",
    "lisp",
    "scheme",
    "prolog",
    "ada",
    "pascal",
    "smalltalk",
    "forth",
    "verilog",
    "vhdl",
    "assembly",
    "pl/i",
    "objective-c",
    "ocaml",
    "groovy",
    "powershell",
    "bash",
    "shell",
    "html",
    "css",
    "sql",
  ];

  return programmingLanguages.includes(language.toLowerCase());
};

export const isTokenExpired = (token: { access_expiration: string }) => {
  return moment().utc() > moment(token.access_expiration).utc();
};

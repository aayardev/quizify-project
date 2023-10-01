import { useToast } from "@/components/ui/use-toast";
import { addServerErrors } from "@/lib/utils";
import { updateUserProfile } from "@/services/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type TAxiosErrorData =
  | {
      [P in keyof API.TRegisterData]: string[];
    }
  | {
      non_field_errors: string[];
    };

export const UpdateProfileSchema = z.object({
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .min(1, { message: "First name is required" }),

  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, { message: "Last name is required" }),

  profile_image: z.instanceof(File).optional(),
});

export default function useUpdateProfile(
  defaultValues: API.TUpdateUserProfileData
) {
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const form = useForm<API.TUpdateUserProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      first_name: defaultValues.first_name,
      last_name: defaultValues.last_name,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onValid: SubmitHandler<API.TUpdateUserProfileData> = async (data) => {
    try {
      console.log(data, "data");
      let formData = new FormData();
      formData.append("first_name", data.first_name as string);
      formData.append("last_name", data.last_name as string);
      if (data.profile_image)
        formData.append("profile_image", data.profile_image as File);

      console.log(data.profile_image, "data.profile_image");
      const res = await updateUserProfile(formData, {
        headers: {
          Authorization: `Bearer ${session?.access}`,
          "Content-Type": "multipart/form-data",
        },
      });
      update({ user: res.data });
      toast({
        title: "Success",
        description: "Success message",
        variant: "success",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axsError = err as AxiosError<TAxiosErrorData>;
        if (axsError.response) {
          if (axsError.response.status === 400) {
            const nonFieldErr = axsError.response.data[
              "non_field_errors" as keyof TAxiosErrorData
            ] as string | undefined;

            if (nonFieldErr && nonFieldErr[0]) {
              // Set non field errors
              toast({
                title: "Error",
                description: nonFieldErr,
                variant: "destructive",
              });
              return;
            }

            const backendErrors = axsError.response.data;
            // Set errors for fields
            addServerErrors<TAxiosErrorData>(
              backendErrors,
              form.setError as UseFormSetError<TAxiosErrorData>
            );
          } else {
            toast({
              title: "Error",
              description: "Something went wrong. Please try again later.",
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const onInvalid: SubmitErrorHandler<API.TUpdateUserProfileData> = (
    errors
  ) => {
    console.log(errors);
  };

  const onSubmit = form.handleSubmit(onValid, onInvalid);

  return { form, onSubmit, isSubmitting };
}

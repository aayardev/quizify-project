import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(1, {
      message: "Topic is required",
    })
    .min(3, {
      message: "Topic must be at least 3 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1).max(10),
});

export type TQuizCreationSchema = z.infer<typeof quizCreationSchema>;

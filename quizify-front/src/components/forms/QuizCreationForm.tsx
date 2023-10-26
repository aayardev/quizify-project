"use client";

import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TQuizCreationSchema, quizCreationSchema } from "@/schemas/forms/quiz";
import { Button } from "../ui/button";
import { useMutation } from "react-query";

import axios, { type AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createQuiz } from "@/services";

type Props = {};

const QuizCreationForm = (props: Props) => {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<TQuizCreationSchema>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: "Python",
    },
  });

  console.log(form.formState.dirtyFields, form.formState.errors);

  const { mutate: getQuestions, isLoading } = useMutation<
    API.TQuiz,
    Error | AxiosError,
    TQuizCreationSchema
  >({
    mutationFn: async ({ topic }) => {
      const response = await createQuiz({ topic });
      return response.data;
    },
  });

  const { handleSubmit, control } = form;

  const onSubmitHandler: SubmitHandler<TQuizCreationSchema> = useCallback(
    (data) => {
      getQuestions(data, {
        onSuccess: (quiz) => {
          return router.push(`/quiz/${quiz.topic.name}-${quiz.id}/play`);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 500) {
              toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
              });
            }
          }
        },
      });
    },
    [getQuestions, router, toast]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Quiz Creation</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Choose a topic
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8">
            <FormField
              control={control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please provide any topic you would like to be quizzed on
                    here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      min={1}
                      max={10}
                    />
                  </FormControl>
                  <FormDescription>
                    You can choose how many questions you would like to be
                    quizzed on here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                      <Button
                        className="flex-1"
                        variant={value === "mcq" ? "default" : "secondary"}
                        onClick={() => onChange("mcq")}
                        type="button"
                      >
                        Multiple Choice
                      </Button>
                      <Button
                        className="flex-1"
                        variant={
                          value === "open_ended" ? "default" : "secondary"
                        }
                        onClick={() => onChange("open_ended")}
                        type="button"
                      >
                        Open Ended
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button isLoading={isLoading} disabled={isLoading} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuizCreationForm;

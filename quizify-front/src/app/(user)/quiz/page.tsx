import QuizCreationForm from "@/components/forms/QuizCreationForm";

type Props = {};

const Quiz = (props: Props) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-16">
      <QuizCreationForm />
    </div>
  );
};

export default Quiz;

import QuizifyLogo from "@/components/QuizifyLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QuizifyLogo className="fixed top-5 sm:z-10   left-8 " />

      <div className=" min-h-screen flex items-center justify-center bg-primary-foreground inset-0  sm:z-20 z-30 bg-cover backdrop-blur-md	 ">
        {children}
      </div>
    </>
  );
}

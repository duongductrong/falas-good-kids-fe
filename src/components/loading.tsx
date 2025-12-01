import Image from "next/image";

export const SplashLoading = () => {
  return (
    <div className="w-full h-screen grid place-items-center fixed top-0 left-0 z-50 bg-background">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/assets/logo/amanotes.png"
          alt="Amanotes"
          width={400}
          height={400}
          className="size-14 mb-3 animate-bounce"
        />

        <h2 className="text-lg font-bold mb-2">Amanotes x FALAS</h2>
        <p className="text-sm text-muted-foreground text-center max-w-[300px] mb-3">
          FALAS Good Kids - Recognizing outstanding achievements in our
          community.
        </p>
        <small className="text-xs text-muted-foreground">
          Version 1.0.0 - Made with ❤️ by Amanotes
        </small>
      </div>
    </div>
  );
};

import { ReactNode } from "react";

interface RootLayoutProps {
  children?: ReactNode;
}

export default function PostLayout({ children }: RootLayoutProps) {
  return (
    <div className="prose prose-a:underline-offset-4 prose-a:decoration-dashed prose-a:decoration-slate-400 prose-a:decoration-from-font xl:prose-md xl:prose-h1:my-0 xl:prose-h1:leading-tight m-auto max-w-4xl gap-6 px-6">
      {children}
    </div>
  );
}

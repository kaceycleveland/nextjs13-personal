import { ReactNode } from "react";

interface RootLayoutProps {
  children?: ReactNode;
}

export default function PostLayout({ children }: RootLayoutProps) {
  return (
    <div className="prose m-auto max-w-4xl gap-6 px-6 prose-a:decoration-slate-400 prose-a:decoration-dashed prose-a:decoration-from-font prose-a:underline-offset-4 xl:prose-h1:my-0 xl:prose-h1:leading-tight">
      {children}
    </div>
  );
}

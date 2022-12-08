"use client";

interface LinkBodyInnerProps {
  title?: string;
  description?: string;
}

export const LinkBodyInner = ({ title, description }: LinkBodyInnerProps) => {
  return (
    <>
      <p>{title}</p>
      <p>{description}</p>
    </>
  );
};

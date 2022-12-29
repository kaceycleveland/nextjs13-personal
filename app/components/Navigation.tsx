"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { getGravatar } from "utils/getGravatar";
import classNames from "classnames";

const avatarUrl = getGravatar("kaceycleveland.mail@gmail.com", 200);

const menuItems = [
  { title: "Home", url: "/", activeKey: [] },
  { title: "Posts", url: "/posts", activeKey: ["posts"] },
];

const SCROLL_CUTOFF = 70;

export const NavItemMenu = () => {
  const segments = useSelectedLayoutSegments();
  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY < SCROLL_CUTOFF) {
        setAnimateHeader(false);
      } else setAnimateHeader(true);
    };

    listener();
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <header
      className={`trasition fixed z-10 w-full bg-opacity-50 bg-gradient-to-b from-slate-200 to-transparent backdrop-blur-lg backdrop-filter duration-500 ease-in-out ${
        animateHeader && "shadow-xl"
      }`}
    >
      <div className="background-animate animate-color-rotate bg-4x fixed h-2 w-full bg-gradient-to-r from-orange-200 to-teal-200"></div>
      <div className="mx-auto max-w-7xl ">
        <div
          className={`flex max-w-screen-xl py-10 ${
            animateHeader && "py-5"
          } trasition mx-auto items-center justify-between px-8 duration-500 ease-in-out`}
        >
          <Link href="/">
            <span className="flex items-center gap-2">
              <Image
                className="rounded-full border-slate-500 grayscale"
                src={avatarUrl}
                alt="Kacey Cleveland"
                width={32}
                height={32}
              />
              <span className="pr-8 text-xl font-bold tracking-tighter text-zinc-900">
                KC
              </span>
            </span>
          </Link>
          <nav>
            <ul className="flex items-center justify-start">
              {menuItems?.map((item) => {
                // Every segment should match the key for it to be active
                const isActive =
                  (segments.length &&
                    segments.every(
                      (key, idx) => key === item.activeKey[idx]
                    )) ||
                  (item.activeKey.length === 0 && segments.length === 0);

                return (
                  <li key={item?.title}>
                    <Link
                      href={item?.url}
                      className={classNames(
                        { "font-bold": isActive },
                        "text-md border-b-2 border-transparent px-2 py-6 leading-[22px] text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 md:px-3 lg:px-6"
                      )}
                    >
                      {item?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

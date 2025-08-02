"use client";

import { useMemo } from "react";
import classNames from "classnames";

export interface GithubDay {
  contributionCount: number;
  weekday: number;
  date: string;
  index: number;
}

interface GithubActivityProps {
  activity: GithubDay[];
}

export const GithubActivity = ({ activity }: GithubActivityProps) => {
  const maxHeight = useMemo(() => {
    let max = 0;
    activity.forEach((day) => {
      if (day.contributionCount > max) max = day.contributionCount;
    });
    return max;
  }, [activity]);

  return (
    <div className="relative mb-5 flex h-20 items-end gap-2">
      <div className="absolute bottom-0 m-auto w-full translate-y-full font-mono text-xs text-slate-300 dark:text-slate-600">
        Github Activity
      </div>
      {activity.map((day, key) => (
        <ActivityBar key={key} maxHeight={maxHeight} {...day} />
      ))}
    </div>
  );
};

interface ActivityBarProps extends GithubDay {
  maxHeight: number;
}

const ActivityBar = ({
  maxHeight,
  contributionCount,
  weekday,
  date,
  index,
}: ActivityBarProps) => {
  const isToday = useMemo(
    () => new Date().getDate() === parseInt(date.substring(date.length - 2)),
    [date]
  );

  return (
    <div
      className="group relative flex flex-1 flex-col items-center justify-center"
      style={{
        minHeight: `calc(${(100 * contributionCount) / maxHeight}% + 16px)`,
      }}
    >
      <div
        className={classNames(
          "h-full w-2 grow bg-slate-300 dark:bg-slate-700 pt-1 transition-colors duration-300 group-hover:bg-orange-300 dark:group-hover:bg-orange-400 group-focus:bg-orange-300 dark:group-focus:bg-orange-400",
          { "bg-teal-300 dark:bg-teal-400": isToday }
        )}
      />
      <div className="text-xs text-slate-500 dark:text-slate-400">{getWeekDayString(weekday)}</div>
      <span className="not-prose absolute -bottom-10 z-40 whitespace-nowrap rounded border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 p-1 text-center opacity-0 transition-opacity group-hover:z-50 group-hover:opacity-100 group-focus:opacity-100">
        <p className="my-0 text-xs text-slate-800 dark:text-slate-200">{date}</p>
        <p className="my-0 text-xs text-slate-800 dark:text-slate-200">{contributionCount} commits</p>
      </span>
    </div>
  );
};

const getWeekDayString = (weekNum: number) => {
  switch (weekNum) {
    case 0:
      return "Su";
    case 1:
      return "M";
    case 2:
      return "Tu";
    case 3:
      return "W";
    case 4:
      return "Th";
    case 5:
      return "F";
    case 6:
      return "Sa";
  }
};

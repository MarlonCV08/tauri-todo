import { Circle, Play, Check } from "lucide-react";
import type { JSX } from "react";

type Status = "pending" | "in_progress" | "completed";

const STATES: { value: Status; label: string; icon: JSX.Element }[] = [
  {
    value: "pending",
    label: "pending",
    icon: <Circle size={13} strokeWidth={1.5} />,
  },
  {
    value: "in_progress",
    label: "in progress",
    icon: <Play size={13} fill="currentColor" strokeWidth={0} />,
  },
  {
    value: "completed",
    label: "done",
    icon: <Check size={13} strokeWidth={2} />,
  },
];

const ACTIVE_STYLES: Record<Status, string> = {
  pending:     "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  in_progress: "bg-blue-100  text-blue-800  dark:bg-blue-900  dark:text-blue-200",
  completed:   "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const ICON_STYLES: Record<Status, string> = {
  pending:     "text-amber-500 dark:text-amber-400",
  in_progress: "text-blue-500  dark:text-blue-400",
  completed:   "text-green-500 dark:text-green-400",
};

export const TaskStatus = ({
  status,
  onChange,
}: {
  status: Status;
  onChange?: (status: Status) => void;
}) => {
  return (
    <div className="inline-flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      {STATES.map((state, i) => {
        const isActive = status === state.value;
        return (
          <button
            key={state.value}
            onClick={() => onChange?.(state.value)}
            title={state.label}
            className={[
              "flex items-center gap-1.5 h-7 transition-colors cursor-pointer",
              i > 0 ? "border-l border-neutral-200 dark:border-neutral-700" : "",
              isActive
                ? `px-2.5 text-xs font-medium ${ACTIVE_STYLES[state.value]}`
                : `w-7.5 justify-center ${ICON_STYLES[state.value]} hover:bg-neutral-100 dark:hover:bg-neutral-800`,
            ].join(" ")}
          >
            {state.icon}
            {isActive && <span>{state.label}</span>}
          </button>
        );
      })}
    </div>
  );
};
"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/ui/icons";

interface ComboboxProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

/** Accessible single-select combobox with type-ahead filtering. */
export function Combobox({ label, value, onChange, options, placeholder = "Select…", className }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const filtered = query ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase())) : options;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const select = (v: string) => {
    onChange(v);
    setOpen(false);
    setQuery("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (open && filtered[active]) {
        e.preventDefault();
        select(filtered[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-1" ref={rootRef}>
      {label && <label className="text-sm font-medium text-app-muted">{label}</label>}
      <div className="relative">
        <input
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={open ? query : value}
          placeholder={value || placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={cn(
            "w-full rounded-lg border border-app-border bg-app-inset px-3 py-2 pr-9 text-sm text-app-text outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15",
            className
          )}
        />
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-faint"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        {open && (
          <ul id={listId} role="listbox" className="mars-card absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-lg py-1 shadow-2xl">
            {filtered.length === 0 && <li className="px-3 py-2 text-sm text-app-faint">No matches</li>}
            {filtered.map((o, i) => (
              <li
                key={o}
                role="option"
                aria-selected={o === value}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); select(o); }}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm",
                  i === active ? "bg-app-hover text-app-text" : "text-app-muted"
                )}
              >
                {o}
                {o === value && <CheckIcon className="h-4 w-4 text-accent" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

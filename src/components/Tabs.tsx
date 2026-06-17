import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface TabDef {
  id: string;
  labelSi: string;
  labelEn: string;
  panel: ReactNode;
}

interface TabsProps {
  tabs: TabDef[];
  /** sessionStorage key — remembers the last tab within the session. */
  storageKey: string;
}

/**
 * WAI-ARIA tabs: roving tabindex, arrow / Home / End navigation with
 * automatic activation. The first tab is the default; the last-used tab is
 * remembered for the session only (sessionStorage), so a fresh session opens
 * on the default tab.
 */
export function Tabs({ tabs, storageKey }: TabsProps) {
  const [active, setActive] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved && tabs.some((t) => t.id === saved)) return saved;
    } catch {
      /* sessionStorage unavailable — fall through to default */
    }
    return tabs[0].id;
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, active);
    } catch {
      /* ignore */
    }
  }, [active, storageKey]);

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === active),
  );

  function focusTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        e.preventDefault();
        focusTab(0);
        break;
      case 'End':
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  }

  return (
    <>
      <div
        role="tablist"
        aria-label="Ada Litha sections"
        aria-orientation="horizontal"
        className="flex justify-center gap-1 px-3"
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`group relative flex-1 px-2 pt-3 pb-2.5 text-center transition-colors duration-150 ease-out ${
                selected ? 'text-paper' : 'text-paper/45 hover:text-paper/70'
              }`}
            >
              <span className="block font-sinhala text-[15px] leading-none font-medium">
                {tab.labelSi}
              </span>
              <span className="mt-1 block font-display text-[8px] font-semibold tracking-[0.22em] uppercase">
                {tab.labelEn}
              </span>
              {/* active indicator reads as a small gold rule, like the dividers */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full transition-opacity duration-200 ${
                  selected ? 'bg-gold opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={i !== activeIndex}
        >
          {i === activeIndex && tab.panel}
        </div>
      ))}
    </>
  );
}

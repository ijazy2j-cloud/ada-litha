import { practiceWordOfTheDay } from '../data/practiceWords';

/** A small, calm "word of the day" from Buddhist practice. Rotates daily. */
export function DhammaWordPanel({ dayOfYear }: { dayOfYear: number }) {
  const word = practiceWordOfTheDay(dayOfYear);

  return (
    <section aria-labelledby="word-heading" className="text-center">
      <h2
        id="word-heading"
        className="font-display text-[9px] font-semibold tracking-[0.28em] text-saffron uppercase"
      >
        අද වචනය · Word of the day
      </h2>
      <p className="mt-3 font-sinhala text-[26px] leading-tight font-medium text-paper">{word.si}</p>
      <p className="mt-0.5 text-[12px] text-paper/60 italic">{word.pali}</p>
      <p className="mx-auto mt-2.5 max-w-[34ch] text-[13px] leading-snug text-paper/75">
        <span className="font-sinhala">{word.meaningSi}</span>
        <span className="text-paper/60"> · {word.meaningEn}</span>
      </p>
    </section>
  );
}

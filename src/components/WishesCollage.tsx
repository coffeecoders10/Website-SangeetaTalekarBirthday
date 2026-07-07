import type { WishEntry } from "@/types/wish";
import { WishCard } from "./WishCard";

type WishesCollageProps = {
  entries: WishEntry[];
};

export function WishesCollage({ entries }: WishesCollageProps) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
      {entries.map((entry, index) => (
        <WishCard key={entry.id} entry={entry} index={index} />
      ))}
    </div>
  );
}

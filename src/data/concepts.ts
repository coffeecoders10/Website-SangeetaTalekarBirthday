export type Concept = {
  id: string;
  label: string;
  article?: "a" | "an" | "the" | "";
  placeholder?: string;
  tone?: "tender" | "playful" | "poetic" | "cosmic" | "cozy" | "bold";
};

export const CONCEPTS: Concept[] = [
  { id: "song", label: "song", article: "a", tone: "poetic" },
  { id: "place", label: "place", article: "a", tone: "poetic" },
  { id: "show-or-movie", label: "show or movie", article: "a", tone: "playful" },
  { id: "flower", label: "flower", article: "a", tone: "tender" },
  { id: "festival", label: "festival", article: "a", tone: "bold" },
  { id: "season", label: "season", article: "a", tone: "poetic", placeholder: "Spring after a long winter..." },
  { id: "bird", label: "bird", article: "a", tone: "playful" },
  { id: "animal", label: "animal", article: "an", tone: "playful", placeholder: "A golden retriever with old-soul eyes..." },
  { id: "ice-cream-flavor", label: "ice cream flavor", article: "an", tone: "playful" },
  { id: "game", label: "game", article: "a", tone: "playful" },
  { id: "superhero", label: "superhero", article: "a", tone: "bold" },
  { id: "drink", label: "drink", article: "a", tone: "cozy" },
  { id: "color", label: "color", article: "a", tone: "poetic", placeholder: "The color of sunlight on a kitchen wall..." },
  { id: "book", label: "book", article: "a", tone: "poetic" },
  { id: "dessert", label: "dessert", article: "a", tone: "playful" },
  { id: "city", label: "city", article: "a", tone: "bold" },
  { id: "genre", label: "genre", article: "a", tone: "playful" },
  { id: "type-of-weather", label: "type of weather", article: "a", tone: "poetic" },
  { id: "musical-instrument", label: "musical instrument", article: "a", tone: "playful" },
  { id: "fictional-character", label: "fictional character", article: "a", tone: "bold" },
];

export function formatConcept(concept: Concept) {
  return [concept.article, concept.label].filter(Boolean).join(" ");
}

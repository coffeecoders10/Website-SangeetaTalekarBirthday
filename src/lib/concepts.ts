import { CONCEPTS, formatConcept, type Concept } from "@/data/concepts";
import { PERSON_PROFILE } from "@/config/person";

export function getRandomConcept(excludeId?: string): Concept {
  if (CONCEPTS.length === 1) return CONCEPTS[0];

  const pool = excludeId
    ? CONCEPTS.filter((concept) => concept.id !== excludeId)
    : CONCEPTS;

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function buildPrompt(concept: Concept): string {
  const formatted = formatConcept(concept);
  return `If ${PERSON_PROFILE.name} were ${formatted}, what would ${PERSON_PROFILE.pronouns.subject} be?`;
}

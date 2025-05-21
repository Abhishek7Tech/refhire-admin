import DOMPurify from "isomorphic-dompurify";
import { ExperienceInterface } from "../types/types";
export function sanitize(input: string) {
  return DOMPurify.sanitize(input);
}

export function sanitizeExperience(
  experience: ExperienceInterface[]
): ExperienceInterface[] {
  return experience.map((exp) => ({
    id: exp.id,
    role: DOMPurify.sanitize(exp.role),
    from: DOMPurify.sanitize(exp.from),
    to: DOMPurify.sanitize(exp.to),
    city: DOMPurify.sanitize(exp.city),
    country: DOMPurify.sanitize(exp.country),
    remote: DOMPurify.sanitize(exp.remote),
    work: exp.work.map((w) => ({
      id: w.id,
      work: DOMPurify.sanitize(w.work),
    })),
  }));
}

export function sanitizeTags(tags: string[]): string[] {
  return tags.map((tag) => DOMPurify.sanitize(tag));
}

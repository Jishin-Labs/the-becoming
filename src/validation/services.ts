
export const serviceTitles = [
  "Individual Coaching",
  "Group Coaching",
  "Wellness Conversation",
  "Corporate Wellness",
] as const;

export type ServiceTitle = (typeof serviceTitles)[number];

export function isServiceTitle(value: string): value is ServiceTitle {
  return (serviceTitles as readonly string[]).includes(value);
}

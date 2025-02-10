export interface Player {
  nickname: string;
  role: "operative" | "spymaster" | null;
  team: "red" | "blue" | null;
}

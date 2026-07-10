export type WishEntry = {
  id: string;
  targetName: string;
  conceptId: string;
  conceptLabel: string;
  prompt: string;
  answer: string;
  why: string;
  note?: string;
  fromName: string;
  createdAt: string;
};

export type CreateWishInput = {
  targetName: string;
  conceptId: string;
  conceptLabel: string;
  prompt: string;
  answer: string;
  why: string;
  note?: string;
  fromName: string;
};

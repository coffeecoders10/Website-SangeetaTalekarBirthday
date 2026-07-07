export type WishEntry = {
  id: string;
  targetName: string;
  conceptId: string;
  conceptLabel: string;
  prompt: string;
  answer: string;
  note?: string;
  fromName: string;
  imageUrl?: string;
  imageAlt?: string;
  createdAt: string;
};

export type CreateWishInput = {
  targetName: string;
  conceptId: string;
  conceptLabel: string;
  prompt: string;
  answer: string;
  note?: string;
  fromName: string;
  image?: File;
};

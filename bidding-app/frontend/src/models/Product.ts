import { Bid } from "./Bid";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  highestBid: number;
  highestBidder: string;
  bids: Bid[];
};

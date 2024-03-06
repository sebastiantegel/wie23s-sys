import { Product } from "./models/Product";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Bid } from "./models/Bid";

let products: Product[] = [
  {
    id: "abc123",
    name: "Bike",
    description: "A very nice bike",
    price: 1000,
    highestBid: 0,
    highestBidder: "",
    bids: [
      { amount: 100, productId: "abc123", bidder: "Kalle" },
      { amount: 200, productId: "abc123", bidder: "Pelle" },
    ],
  },
  {
    id: "qwe321",
    name: "Car",
    description: "A very nice car",
    price: 50000,
    highestBid: 0,
    highestBidder: "",
    bids: [],
  },
];

const PORT = 3000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit(
    "product_list",
    products.map((p) => {
      return { id: p.id, name: p.name };
    })
  );

  socket.on("join_room", (id: string, callback) => {
    socket.rooms.forEach((room) => {
      console.log("Leaving room: ", room);

      socket.leave(room);
    });

    console.log("Joining room: ", id);

    socket.join(id);

    callback(products.find((p) => p.id === id));
  });

  // Callback är den funktion som skickas med i händelsen från klienten
  socket.on("make_bid", (bid: Bid) => {
    console.log(bid);

    const product = products.find((p) => p.id === bid.productId);
    product?.bids.push(bid);

    io.to(bid.productId).emit(
      "bid_accepted",
      products.find((p) => p.id === bid.productId)
    );
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

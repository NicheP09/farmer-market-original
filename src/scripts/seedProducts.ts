import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Product from "../../backend/src/models/product.schema";

async function main() {
  const uri = (process.env.MONGO_URI || process.env.MONGO_URL) as string;
  await mongoose.connect(uri);

  // create a few fake farmer ids
  const farmerIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
  ];

  await Product.deleteMany({});

  const categories = ["vegetables", "fruits", "grains", "herbs"];
  const items: any[] = [];

  for (let i = 0; i < 24; i++) {
    items.push({
      farmer: farmerIds[i % farmerIds.length],
      name: `produce ${i + 1}`,
      price: Math.floor(Math.random() * 2000) + 200,
      quantity: Math.floor(Math.random() * 50) + 10,
      category: categories[i % categories.length],
      available: i % 5 !== 0
    });
  }

  const res = await Product.insertMany(items);
  console.log("seeded", res.length, "products");
  console.log("farmer ids you can use for testing:");
  farmerIds.forEach((id, idx) => console.log(`farmer${idx + 1}: ${id.toString()}`));

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

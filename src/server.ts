import app from "./app";
import envConfig from "./config/envConfig";
import { prisma } from "./lib/prisma";

const PORT = envConfig.port;

async function main() {
  try {
    await prisma.$connect();

    console.log("database connection success");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

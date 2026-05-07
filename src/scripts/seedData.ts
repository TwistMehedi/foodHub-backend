import { prisma } from "../lib/prisma";
import { Role } from "../types/role";

interface SeedData {
  categories: Array<{
    name: string;
    meals: Array<{
      name: string;
      description: string;
      price: number;
      image: string;
    }>;
  }>;
  providers: Array<{
    name: string;
    email: string;
    shopName: string;
    description: string;
    address: string;
    meals: Array<{
      name: string;
      description: string;
      price: number;
      image: string;
      categoryName: string;
    }>;
  }>;
  customers: Array<{
    name: string;
    email: string;
  }>;
}

const seedData: SeedData = {
  categories: [
    {
      name: "Pizza",
      meals: [
        {
          name: "Margherita Pizza",
          description: "Fresh mozzarella, tomato sauce, and basil on thin crust",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        },
        {
          name: "Pepperoni Pizza",
          description: "Classic pepperoni with mozzarella and tomato sauce",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        },
        {
          name: "BBQ Chicken Pizza",
          description: "Grilled chicken, BBQ sauce, red onions, and cilantro",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
        },
      ],
    },
    {
      name: "Burger",
      meals: [
        {
          name: "Classic Cheeseburger",
          description: "Beef patty with cheese, lettuce, tomato, and special sauce",
          price: 10.99,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        },
        {
          name: "Bacon Deluxe Burger",
          description: "Double beef patty with bacon, cheese, and BBQ sauce",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1551782450-17144efb5723?w=400",
        },
        {
          name: "Veggie Burger",
          description: "Plant-based patty with avocado, sprouts, and vegan mayo",
          price: 11.99,
          image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400",
        },
      ],
    },
    {
      name: "Pasta",
      meals: [
        {
          name: "Spaghetti Carbonara",
          description: "Creamy pasta with pancetta, eggs, and parmesan",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1551892376-c73baef88c40?w=400",
        },
        {
          name: "Penne Arrabbiata",
          description: "Spicy tomato sauce with garlic, red chili, and basil",
          price: 11.99,
          image: "https://images.unsplash.com/photo-1551892376-c73baef88c40?w=400",
        },
        {
          name: "Fettuccine Alfredo",
          description: "Creamy fettuccine with parmesan and butter sauce",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1551892376-c73baef88c40?w=400",
        },
      ],
    },
    {
      name: "Dessert",
      meals: [
        {
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with molten center and vanilla ice cream",
          price: 7.99,
          image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400",
        },
        {
          name: "Tiramisu",
          description: "Classic Italian dessert with coffee-soaked ladyfingers",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
        },
        {
          name: "Cheesecake",
          description: "New York style cheesecake with berry compote",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
        },
      ],
    },
    {
      name: "Beverages",
      meals: [
        {
          name: "Fresh Orange Juice",
          description: "Freshly squeezed orange juice",
          price: 4.99,
          image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
        },
        {
          name: "Cappuccino",
          description: "Espresso with steamed milk and foam",
          price: 3.99,
          image: "https://images.unsplash.com/photo-1572442388796-11668a67e53?w=400",
        },
        {
          name: "Iced Tea",
          description: "Refreshing iced tea with lemon",
          price: 2.99,
          image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400",
        },
      ],
    },
  ],
  providers: [
    {
      name: "Mario's Italian Kitchen",
      email: "mario@pizza.com",
      shopName: "Mario's Italian Kitchen",
      description: "Authentic Italian cuisine made with love since 1985",
      address: "123 Main Street, Downtown",
      meals: [
        {
          name: "Margherita Pizza",
          description: "Fresh mozzarella, tomato sauce, and basil on thin crust",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
          categoryName: "Pizza",
        },
        {
          name: "Spaghetti Carbonara",
          description: "Creamy pasta with pancetta, eggs, and parmesan",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1551892376-c73baef88c40?w=400",
          categoryName: "Pasta",
        },
        {
          name: "Tiramisu",
          description: "Classic Italian dessert with coffee-soaked ladyfingers",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
          categoryName: "Dessert",
        },
      ],
    },
    {
      name: "Burger Barn",
      email: "burgers@burgerbarn.com",
      shopName: "Burger Barn",
      description: "Juicy burgers made from premium beef",
      address: "456 Oak Avenue, Midtown",
      meals: [
        {
          name: "Classic Cheeseburger",
          description: "Beef patty with cheese, lettuce, tomato, and special sauce",
          price: 10.99,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
          categoryName: "Burger",
        },
        {
          name: "Bacon Deluxe Burger",
          description: "Double beef patty with bacon, cheese, and BBQ sauce",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1551782450-17144efb5723?w=400",
          categoryName: "Burger",
        },
        {
          name: "French Fries",
          description: "Crispy golden fries with sea salt",
          price: 4.99,
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
          categoryName: "Beverages",
        },
      ],
    },
    {
      name: "Sweet Dreams Bakery",
      email: "bakery@sweetdreams.com",
      shopName: "Sweet Dreams Bakery",
      description: "Fresh baked goods and desserts daily",
      address: "789 Pine Street, Uptown",
      meals: [
        {
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with molten center and vanilla ice cream",
          price: 7.99,
          image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400",
          categoryName: "Dessert",
        },
        {
          name: "Cheesecake",
          description: "New York style cheesecake with berry compote",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
          categoryName: "Dessert",
        },
        {
          name: "Cappuccino",
          description: "Espresso with steamed milk and foam",
          price: 3.99,
          image: "https://images.unsplash.com/photo-1572442388796-11668a67e53?w=400",
          categoryName: "Beverages",
        },
      ],
    },
  ],
  customers: [
    { name: "John Smith", email: "john@example.com" },
    { name: "Sarah Johnson", email: "sarah@example.com" },
    { name: "Mike Davis", email: "mike@example.com" },
    { name: "Emma Wilson", email: "emma@example.com" },
    { name: "Alex Brown", email: "alex@example.com" },
    { name: "Lisa Garcia", email: "lisa@example.com" },
    { name: "Tom Anderson", email: "tom@example.com" },
    { name: "Jessica Martinez", email: "jessica@example.com" },
  ],
};

async function createSeedData() {
  try {
    console.log("🌱 Starting seed data creation...");

    // Create admin user first
    console.log("👤 Creating admin user...");
    const adminUser = await prisma.user.upsert({
      where: { email: "admin@foodhub.com" },
      update: {},
      create: {
        name: "FoodHub Admin",
        email: "admin@foodhub.com",
        role: Role.ADMIN,
        emailVerified: true,
        isVerified: true,
      },
    });
    console.log("✅ Admin user created:", adminUser.email);

    // Create categories
    console.log("📂 Creating categories...");
    const categories = [];
    for (const categoryData of seedData.categories) {
      const category = await prisma.category.upsert({
        where: { name: categoryData.name },
        update: {},
        create: {
          name: categoryData.name,
          userId: adminUser.id,
        },
      });
      categories.push(category);
      console.log(`✅ Category created: ${category.name}`);
    }

    // Create provider users and their profiles
    console.log("🏪 Creating provider users and restaurants...");
    const providers = [];
    for (const providerData of seedData.providers) {
      const providerUser = await prisma.user.upsert({
        where: { email: providerData.email },
        update: {},
        create: {
          name: providerData.name,
          email: providerData.email,
          role: Role.PROVIDER,
          emailVerified: true,
          isVerified: true,
        },
      });

      const providerProfile = await prisma.providerProfile.upsert({
        where: { userId: providerUser.id },
        update: {},
        create: {
          userId: providerUser.id,
          shopName: providerData.shopName,
          description: providerData.description,
          address: providerData.address,
          isOpen: true,
          image: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400`,
          imagePublicId: `restaurant_${providerUser.id}`,
        },
      });

      providers.push({ user: providerUser, profile: providerProfile });
      console.log(`✅ Provider created: ${providerProfile.shopName}`);
    }

    // Create meals for each provider
    console.log("🍽️ Creating meals...");
    const allMeals = [];
    for (const provider of providers) {
      for (const mealData of seedData.providers.find(p => p.email === provider.user.email)?.meals || []) {
        const category = categories.find(c => c.name === mealData.categoryName);
        if (!category) continue;

        // Check if meal already exists
        const existingMeal = await prisma.meal.findFirst({
          where: {
            name: mealData.name,
            userId: provider.user.id,
          },
        });

        if (existingMeal) {
          allMeals.push(existingMeal);
          console.log(`⏭️ Meal already exists: ${mealData.name} at ${provider.profile.shopName}`);
          continue;
        }

        const meal = await prisma.meal.create({
          data: {
            name: mealData.name,
            description: mealData.description,
            price: mealData.price,
            image: mealData.image,
            imagePublicId: `meal_${mealData.name.replace(/\s+/g, '_').toLowerCase()}`,
            categoryName: mealData.categoryName,
            categoryId: category.id,
            userId: provider.user.id,
            providerId: provider.profile.id,
            isAvailable: true,
          },
        });
        allMeals.push(meal);
        console.log(`✅ Meal created: ${meal.name} at ${provider.profile.shopName}`);
      }
    }

    // Create customer users
    console.log("👥 Creating customer users...");
    const customers = [];
    for (const customerData of seedData.customers) {
      const customer = await prisma.user.upsert({
        where: { email: customerData.email },
        update: {},
        create: {
          name: customerData.name,
          email: customerData.email,
          role: Role.CUSTOMER,
          emailVerified: true,
          isVerified: true,
        },
      });
      customers.push(customer);
      console.log(`✅ Customer created: ${customer.name}`);
    }

    // Create sample orders
    console.log("📦 Creating sample orders...");
    const orders = [];
    for (let i = 0; i < 15; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const provider = providers[Math.floor(Math.random() * providers.length)];
      const providerMeals = allMeals.filter(m => m.providerId === provider.profile.id);

      if (providerMeals.length === 0) continue;

      // Create delivery address
      const address = await prisma.address.create({
        data: {
          roadNumber: `${Math.floor(Math.random() * 1000) + 1}`,
          postCode: `${Math.floor(Math.random() * 90000) + 10000}`,
          phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          house: `${Math.floor(Math.random() * 999) + 1}`,
          areaName: ["Downtown", "Midtown", "Uptown", "Suburb", "City Center"][Math.floor(Math.random() * 5)],
        },
      });

      // Select 1-3 random meals for the order
      const orderMeals = [];
      const numMeals = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numMeals; j++) {
        const meal = providerMeals[Math.floor(Math.random() * providerMeals.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        orderMeals.push({ meal, quantity });
      }

      const totalAmount = orderMeals.reduce((sum, item) => sum + (item.meal.price * item.quantity), 0);

      const order = await prisma.order.create({
        data: {
          userId: customer.id,
          providerId: provider.profile.id,
          mealId: orderMeals[0].meal.id, // Primary meal
          deliveryAddress: address.id,
          totalAmount,
          status: ["PLACED", "PREPARING", "READY", "DELIVERED"][Math.floor(Math.random() * 4)] as any,
        },
      });

      // Create order items
      for (const item of orderMeals) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            customerId: customer.id,
            quantity: item.quantity,
            price: item.meal.price,
          },
        });
      }

      orders.push(order);
      console.log(`✅ Order created: ${customer.name} ordered from ${provider.profile.shopName} - $${totalAmount.toFixed(2)}`);
    }

    // Create sample reviews
    console.log("⭐ Creating sample reviews...");
    const deliveredOrders = orders.filter(o => o.status === "DELIVERED");
    for (const order of deliveredOrders.slice(0, 10)) {
      const customer = customers.find(c => c.id === order.userId);
      const meal = allMeals.find(m => m.id === order.mealId);
      if (!customer || !meal) continue;

      // Check if review already exists
      const existingReview = await prisma.review.findFirst({
        where: {
          userId: customer.id,
          mealId: meal.id,
        },
      });

      if (existingReview) {
        console.log(`⏭️ Review already exists: ${customer.name} for ${meal.name}`);
        continue;
      }

      const review = await prisma.review.create({
        data: {
          userId: customer.id,
          mealId: meal.id,
          rating: Math.floor(Math.random() * 5) + 1,
          comment: [
            "Amazing food! Will order again.",
            "Great taste and fast delivery.",
            "Excellent service and quality.",
            "Highly recommended!",
            "Delicious and fresh ingredients.",
            "Perfect portion size.",
            "Better than expected!",
            "Quick delivery and hot food.",
            "Love the packaging.",
            "Best meal I've had this week!",
          ][Math.floor(Math.random() * 10)],
        },
      });
      console.log(`✅ Review created: ${customer.name} rated ${meal.name} - ${review.rating} stars`);
    }

    console.log("\n🎉 Seed data creation completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${providers.length} providers`);
    console.log(`   - ${allMeals.length} meals`);
    console.log(`   - ${customers.length} customers`);
    console.log(`   - ${orders.length} orders`);
    console.log(`   - ${deliveredOrders.length} reviews`);

  } catch (error) {
    console.error("❌ Error creating seed data:", error);
    throw error;
  }
}

createSeedData()
  .then(() => {
    console.log("✅ Seed script completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seed script failed:", error);
    process.exit(1);
  });
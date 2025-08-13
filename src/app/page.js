import React from "react";
import HomePageClient from "@/components/HomePageClient";
import StructuredData from "@/components/StructuredData";
import { getTopSellingProducts, getTopCategories} from "@/lib/api";

// Add metadata for SEO
export const metadata = {
  title: "Best Online Store - Top Quality Products at Great Prices",
  description: "Discover our amazing collection of top-selling products and explore diverse categories. Find the best deals on quality items with fast shipping.",
  keywords: "online store, best products, shopping, deals, quality items",
  openGraph: {
    title: "Best Online Store - Top Quality Products",
    description: "Discover our amazing collection of top-selling products and explore diverse categories.",
    type: "website",
  },
};

// Server-side data fetching for SEO
async function getServerData() {
  try {
    // Fetch data on the server for SEO
    const [productsData, categoriesData] = await Promise.all([
      getTopSellingProducts(),
      getTopCategories()
    ]);
    
    return {
      products: productsData || [],
      categories: categoriesData || [],
      error: null
    };
  } catch (error) {
    console.error('Error fetching server data:', error);
    return {
      products: [],
      categories: [],
      error: 'Failed to load data'
    };
  }
}

export default async function Home() {
  // Fetch data on server for SEO
  const { products, categories, error } = await getServerData();

  return (
    <>
      <StructuredData products={products} categories={categories} />
      <HomePageClient 
        initialProducts={products}
        initialCategories={categories}
        initialError={error}
      />
    </>
  );
}

import React from "react";
import HomePageClient from "@/components/HomePageClient";
import StructuredData from "@/components/StructuredData";
import { getTopSellingProducts, getTopCategories} from "@/lib/api";

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

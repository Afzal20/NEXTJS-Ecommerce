import Script from 'next/script';

export default function StructuredData({ products, categories }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Best Online Store",
    "description": "Discover our amazing collection of top-selling products and explore diverse categories.",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": typeof window !== 'undefined' ? `${window.location.origin}/search?q={search_term_string}` : ''
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Add product data if available
  if (products && products.length > 0) {
    structuredData.mainEntity = {
      "@type": "ItemList",
      "itemListElement": products.slice(0, 10).map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.product_title || product.title,
        "description": product.product_description || "Quality product from our store",
        "image": product.product_thumbnail || product.thumbnail,
        "offers": {
          "@type": "Offer",
          "price": product.product_price || product.price,
          "priceCurrency": "USD",
          "availability": product.is_available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        },
        "aggregateRating": product.product_rating ? {
          "@type": "AggregateRating",
          "ratingValue": product.product_rating,
          "ratingCount": "100"
        } : undefined
      }))
    };
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

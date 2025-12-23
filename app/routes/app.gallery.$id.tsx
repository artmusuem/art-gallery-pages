import { useState, useEffect } from "react";
import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  HeadersFunction,
} from "react-router";
import { useLoaderData, useNavigate, useActionData, useSubmit } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

interface Product {
  id: string;
  title: string;
  featuredImage: {
    url: string;
  } | null;
}

interface Gallery {
  id: string;
  title: string;
  layout: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
}

interface LoaderData {
  products: Product[];
  gallery: Gallery | null;
  isNew: boolean;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const galleryId = params.id;
  const isNew = galleryId === "new";

  // Fetch products from the store
  const productsResponse = await admin.graphql(
    `#graphql
      query getProducts {
        products(first: 50) {
          edges {
            node {
              id
              title
              featuredImage {
                url
              }
            }
          }
        }
      }`
  );

  const productsJson = await productsResponse.json();
  const products = productsJson.data.products.edges.map(
    (edge: { node: Product }) => edge.node
  );

  // If editing, load existing gallery from metafield
  let gallery: Gallery | null = null;
  if (!isNew) {
    const metafieldResponse = await admin.graphql(
      `#graphql
        query getGalleries {
          shop {
            metafield(namespace: "art_gallery_pages", key: "galleries") {
              value
            }
          }
        }`
    );
    const metafieldJson = await metafieldResponse.json();
    const metafieldValue = metafieldJson.data.shop.metafield?.value;
    
    if (metafieldValue) {
      const galleries: Gallery[] = JSON.parse(metafieldValue);
      gallery = galleries.find((g) => g.id === galleryId) || null;
    }
  }

  return { products, gallery, isNew };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const galleryData = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    layout: formData.get("layout") as string,
    products: JSON.parse(formData.get("products") as string),
    createdAt: formData.get("createdAt") as string,
    updatedAt: new Date().toISOString(),
  };

  // Get shop ID first
  const shopResponse = await admin.graphql(
    `#graphql
      query getShop {
        shop {
          id
          metafield(namespace: "art_gallery_pages", key: "galleries") {
            value
          }
        }
      }`
  );
  const shopJson = await shopResponse.json();
  const shopId = shopJson.data.shop.id;
  const existingValue = shopJson.data.shop.metafield?.value;

  // Load existing galleries
  let galleries: Gallery[] = existingValue ? JSON.parse(existingValue) : [];

  // Update or add gallery
  const existingIndex = galleries.findIndex((g) => g.id === galleryData.id);
  if (existingIndex >= 0) {
    galleries[existingIndex] = galleryData;
  } else {
    galleries.push(galleryData);
  }

  // Save to metafield
  const saveResponse = await admin.graphql(
    `#graphql
      mutation saveGalleries($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }`,
    {
      variables: {
        metafields: [
          {
            namespace: "art_gallery_pages",
            key: "galleries",
            type: "json",
            value: JSON.stringify(galleries),
            ownerId: shopId,
          },
        ],
      },
    }
  );

  const saveJson = await saveResponse.json();
  
  if (saveJson.data.metafieldsSet.userErrors.length > 0) {
    return { success: false, errors: saveJson.data.metafieldsSet.userErrors };
  }

  return { success: true, galleryId: galleryData.id };
};

const LAYOUTS = [
  { value: "grid", label: "Grid", description: "Equal-sized tiles in rows" },
  { value: "masonry", label: "Masonry", description: "Pinterest-style varied heights" },
  { value: "carousel", label: "Carousel", description: "Horizontal scrolling" },
];

export default function GalleryBuilder() {
  const { products, gallery, isNew } = useLoaderData<LoaderData>();
  const actionData = useActionData<{ success: boolean; galleryId?: string; errors?: any[] }>();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [title, setTitle] = useState(gallery?.title || "");
  const [layout, setLayout] = useState(gallery?.layout || "grid");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(gallery?.products || []);
  const [galleryId] = useState(gallery?.id || `gallery_${Date.now()}`);
  const [createdAt] = useState(gallery?.createdAt || new Date().toISOString());

  useEffect(() => {
    if (actionData?.success) {
      navigate("/app");
    }
  }, [actionData, navigate]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("id", galleryId);
    formData.append("title", title);
    formData.append("layout", layout);
    formData.append("products", JSON.stringify(selectedProducts));
    formData.append("createdAt", createdAt);
    submit(formData, { method: "POST" });
  };

  const handleCancel = () => {
    navigate("/app");
  };

  return (
    <s-page
      heading={isNew ? "Create Gallery" : "Edit Gallery"}
      backAction={{ content: "Back", onAction: handleCancel }}
    >
      <s-button slot="primary-action" variant="primary" onClick={handleSave}>
        Save Gallery
      </s-button>

      <s-section heading="Gallery Details">
        <s-stack direction="block" gap="loose">
          <s-box>
            <s-stack direction="block" gap="tight">
              <s-text fontWeight="semibold">Gallery Title</s-text>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter gallery title"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </s-stack>
          </s-box>

          <s-box>
            <s-stack direction="block" gap="tight">
              <s-text fontWeight="semibold">Layout</s-text>
              <s-stack direction="inline" gap="base">
                {LAYOUTS.map((l) => (
                  <s-box
                    key={l.value}
                    padding="base"
                    borderWidth="base"
                    borderRadius="base"
                    background={layout === l.value ? "info-subdued" : "subdued"}
                    onClick={() => setLayout(l.value)}
                    style={{ cursor: "pointer", minWidth: "150px" }}
                  >
                    <s-stack direction="block" gap="extraTight">
                      <s-text fontWeight="semibold">{l.label}</s-text>
                      <s-text tone="subdued">{l.description}</s-text>
                    </s-stack>
                  </s-box>
                ))}
              </s-stack>
            </s-stack>
          </s-box>
        </s-stack>
      </s-section>

      <s-section heading={`Select Products (${selectedProducts.length} selected)`}>
        <s-stack direction="block" gap="base">
          {products.length === 0 ? (
            <s-paragraph>No products found in your store.</s-paragraph>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "12px",
              }}
            >
              {products.map((product) => {
                const isSelected = selectedProducts.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    style={{
                      padding: "12px",
                      border: isSelected ? "2px solid #008060" : "1px solid #ccc",
                      borderRadius: "8px",
                      cursor: "pointer",
                      background: isSelected ? "#f0fdf4" : "#fff",
                    }}
                  >
                    {product.featuredImage ? (
                      <img
                        src={product.featuredImage.url}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "120px",
                          background: "#eee",
                          borderRadius: "4px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <s-text tone="subdued">No image</s-text>
                      </div>
                    )}
                    <s-text fontWeight={isSelected ? "semibold" : "regular"}>
                      {product.title}
                    </s-text>
                  </div>
                );
              })}
            </div>
          )}
        </s-stack>
      </s-section>

      <s-section slot="aside" heading="Preview">
        <s-box padding="base" background="subdued" borderRadius="base">
          <s-stack direction="block" gap="tight">
            <s-text fontWeight="semibold">{title || "Untitled Gallery"}</s-text>
            <s-text tone="subdued">Layout: {layout}</s-text>
            <s-text tone="subdued">{selectedProducts.length} products</s-text>
          </s-stack>
        </s-box>
        {actionData?.errors && (
          <s-box padding="base" background="critical-subdued" borderRadius="base">
            <s-text tone="critical">Error saving gallery</s-text>
          </s-box>
        )}
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

import type { LoaderFunctionArgs, HeadersFunction } from "react-router";
import { useLoaderData, useNavigate } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

interface Gallery {
  id: string;
  title: string;
  layout: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
}

interface LoaderData {
  galleries: Gallery[];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  // Load galleries from metafield
  const response = await admin.graphql(
    `#graphql
      query getGalleries {
        shop {
          metafield(namespace: "art_gallery_pages", key: "galleries") {
            value
          }
        }
      }`
  );

  const responseJson = await response.json();
  const metafieldValue = responseJson.data.shop.metafield?.value;
  const galleries: Gallery[] = metafieldValue ? JSON.parse(metafieldValue) : [];

  return { galleries };
};

export default function Index() {
  const { galleries } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  const handleCreateGallery = () => {
    navigate("/app/gallery/new");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <s-page heading="Art Gallery Pages">
      <s-button slot="primary-action" variant="primary" onClick={handleCreateGallery}>
        Create Gallery
      </s-button>

      {galleries.length === 0 ? (
        <s-section>
          <s-box padding="loose" borderRadius="base" background="subdued">
            <s-stack direction="block" gap="base">
              <s-heading>Create your first gallery</s-heading>
              <s-paragraph>
                Showcase your art with beautiful, fast-loading gallery pages.
                Choose from grid, masonry, or carousel layouts.
              </s-paragraph>
              <s-button variant="primary" onClick={handleCreateGallery}>
                Create Gallery
              </s-button>
            </s-stack>
          </s-box>
        </s-section>
      ) : (
        <s-section heading="Your Galleries">
          <s-stack direction="block" gap="loose">
            {galleries.map((gallery) => (
              <s-box
                key={gallery.id}
                padding="base"
                borderWidth="base"
                borderRadius="base"
                background="subdued"
                onClick={() => navigate(`/app/gallery/${gallery.id}`)}
                style={{ cursor: "pointer" }}
              >
                <s-stack direction="block" gap="extraTight">
                  <s-text fontWeight="semibold">{gallery.title}</s-text>
                  <s-text tone="subdued">
                    {gallery.products.length} products · {gallery.layout} layout · Updated {formatDate(gallery.updatedAt)}
                  </s-text>
                </s-stack>
              </s-box>
            ))}
          </s-stack>
        </s-section>
      )}

      <s-section slot="aside" heading="How it works">
        <s-stack direction="block" gap="tight">
          <s-paragraph>1. Create a gallery and select products</s-paragraph>
          <s-paragraph>2. Choose a layout: Grid, Masonry, or Carousel</s-paragraph>
          <s-paragraph>3. Add the gallery block to any page in your theme</s-paragraph>
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

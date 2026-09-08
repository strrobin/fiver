import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { Container, Section, SectionHeading, Breadcrumbs, Button, Img } from "@/components/ui";
import { ProductGallery, ProductPurchase, ProductTabs, RecentlyViewed } from "@/components/product-view";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/interactive";
import { formatPrice } from "@/lib/utils";
import { img } from "@/lib/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? product.name : "Product",
    description: product?.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, product.categorySlug, 4);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs
          className="border-b border-line pb-6"
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.categoryName, href: `/products/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductPurchase product={product} />
          </div>
        </div>

        <div className="mt-14">
          <ProductTabs product={product} />
        </div>
      </Container>

      {/* Related */}
      <Section tone="cream" className="mt-16 border-t border-line">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="You may also like" title={`More from ${product.categoryName}`} />
            <Button href="/products" variant="outline" size="sm" icon="arrowRight">Shop {product.categoryName}</Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Recently viewed */}
      <Section>
        <Container>
          <RecentlyViewed currentSlug={slug} products={products} />
        </Container>
      </Section>

      {/* Reassurance band */}
      <Section tone="charcoal" className="!py-12">
        <Container className="flex flex-col items-center text-center">
          <Img src={img.livingRustic} alt="" className="mx-auto mb-6 h-16 w-16 rounded-2xl object-cover" aria-hidden="true" />
          <h2 className="max-w-2xl font-serif text-2xl text-cream sm:text-3xl">
            Named quality, honest prices and a typical price of {formatPrice(product.price)}
          </h2>
          <p className="mt-3 max-w-xl text-cream/70">
            Every product is assessed for quality, safety and performance. Explore the full range or talk to our team for guidance.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/products" variant="light" icon="arrowRight">Explore products</Button>
            <Button href="/contact" variant="ghost" className="text-cream hover:bg-cream/10">Ask a question</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}

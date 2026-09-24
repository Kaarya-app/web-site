import { getCollection } from 'astro:content';

export interface AIFeatureManifest {
  generated_at: string;
  version: string;
  features: Array<{
    id: string;
    title: string;
    tagline: string;
    category: string;
    status: string;
    tier: 'core' | 'pro' | 'enterprise' | 'cloud';
    specs: Record<string, any>;
    adr?: string;
    description: string;
    keywords: string[];
  }>;
  pricing: Array<{
    id: string;
    name: string;
    price_monthly_inr: number | null;
    currency: string;
    price_label?: string;
    features: string[];
    limits: Record<string, any>;
  }>;
  specs: Record<string, any>;
}

export async function generateAIManifest(): Promise<AIFeatureManifest> {
  const featureEntries = await getCollection('features');
  const pricingEntries = await getCollection('pricing');
  const specEntries = await getCollection('specs');

  const specsMap: Record<string, any> = {};
  for (const spec of specEntries) {
    specsMap[spec.data.id] = {
      title: spec.data.title,
      category: spec.data.category,
      ...spec.data.items,
    };
  }

  return {
    generated_at: new Date().toISOString(),
    version: '1.0.0',
    features: featureEntries.map((entry) => ({
      id: entry.data.id,
      title: entry.data.title,
      tagline: entry.data.tagline,
      category: entry.data.category,
      status: entry.data.status,
      tier: entry.data.tier,
      specs: entry.data.specs,
      adr: entry.data.adr,
      description: entry.data.description,
      keywords: entry.data.keywords,
    })),
    pricing: pricingEntries.map((entry) => ({
      id: entry.data.id,
      name: entry.data.name,
      price_monthly_inr: entry.data.price_monthly_inr ?? null,
      currency: entry.data.currency,
      price_label: entry.data.price_label,
      features: entry.data.features,
      limits: entry.data.limits,
    })),
    specs: specsMap,
  };
}

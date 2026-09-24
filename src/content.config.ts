import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const features = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/features' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tagline: z.string(),
    category: z.enum(['connectivity', 'analytics', 'operations', 'quality', 'compliance', 'platform']),
    status: z.enum(['alpha', 'beta', 'planned', 'shipped', 'deprecated']),
    version: z.string(),
    adr: z.string().optional(),
    tier: z.enum(['core', 'pro', 'enterprise', 'cloud']),
    specs: z.record(z.any()),
    included_in: z.array(z.string()),
    pro_gated: z.array(z.string()).optional().default([]),
    icon: z.string().optional(),
    hero_image: z.string().optional(),
    screenshots: z.array(z.string()).optional().default([]),
    description: z.string(),
    keywords: z.array(z.string()),
    related_features: z.array(z.string()).optional().default([]),
  }),
});

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pricing' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    price_monthly_inr: z.number().nullable().optional(),
    price_annual_inr: z.number().nullable().optional(),
    currency: z.string().default('INR'),
    price_label: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()),
    limits: z.record(z.any()),
    highlight: z.boolean().optional().default(false),
    order: z.number().optional().default(99),
  }),
});

const specs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/specs' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    items: z.record(z.any()),
  }),
});

const useCases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/use-cases' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional().default(99),
  }),
});

const proofs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/proofs' }),
  schema: z.object({
    location: z.string(),
    industry: z.string(),
    title: z.string(),
    description: z.string(),
    highlight: z.string(),
    order: z.number().optional().default(99),
  }),
});

const howItWorks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/how-it-works' }),
  schema: z.object({
    time: z.string(),
    title: z.string(),
    description: z.string(),
    codeSnippet: z.string().optional(),
    order: z.number().optional().default(99),
  }),
});

export const collections = { features, pricing, specs, useCases, proofs, howItWorks };

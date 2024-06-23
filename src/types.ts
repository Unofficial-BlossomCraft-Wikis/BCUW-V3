import type { APIContext, InferGetStaticParamsType, InferGetStaticPropsType } from 'astro';

export interface Contributor {
  avatar_url: string;
  issues: Record<string, number>;
  pulls: Record<string, number>;
  merged_pulls: Record<string, number>;
  commits: Record<string, number>;
  reviews: Record<string, number>;
}

export type InferStaticContext<T> = APIContext<
  InferGetStaticPropsType<T>,
  InferGetStaticParamsType<T>
>;

export type InferStaticAPIRoute<T> = (
  context: InferStaticContext<T>
) => Response | Promise<Response>;
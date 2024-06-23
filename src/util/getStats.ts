import type { Contributor } from '../types';
import { objSum } from './objSum';

export function getStats({
  issues,
  merged_pulls,
  commits,
  reviews,
}: Contributor): { type: 'issues' | 'pulls' | 'commits' | 'reviews'; count: string }[] {
  const stats = [
    { type: 'issues', count: formatInt(objSum(issues)) },
    { type: 'pulls', count: formatInt(objSum(merged_pulls)) },
    { type: 'commits', count: formatInt(objSum(commits)) },
    { type: 'reviews', count: formatInt(objSum(reviews)) },
  ] as const;
  return stats.filter(({ count }) => count !== '0');
}

const formatInt = (int: number) =>
  int < 1000 ? int.toString() : (int / 1000).toFixed(1) + 'k';
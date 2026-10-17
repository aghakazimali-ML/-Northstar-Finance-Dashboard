import { Building2, FileDown, GitCompareArrows, LockKeyhole, ShieldCheck, TrendingUp, type LucideIcon } from 'lucide-react';

const map: Record<string, LucideIcon> = {
  'git-compare': GitCompareArrows,
  'trending-up': TrendingUp,
  'shield-check': ShieldCheck,
  building: Building2,
  'file-down': FileDown,
  lock: LockKeyhole,
};

export default function FeatureIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = map[name] ?? TrendingUp;
  return <Icon size={size} strokeWidth={1.9} />;
}

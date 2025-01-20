import { memo } from 'react';
import { motion } from 'framer-motion';

import type { Suggestion } from '@/app/data/suggestions';

interface SuggestionCardProps extends Suggestion {
  delay?: number;
  onSelect: (text: string) => void;
}

export const SuggestionCard = memo(function SuggestionCard({
  title,
  subtitle,
  delay = 0,
  onSelect,
}: SuggestionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(title)}
      className="flex w-full flex-col gap-1.5 rounded-xl bg-muted/50 p-3.5 text-left 
        transition-colors duration-200 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Suggestion: ${title}`}
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground/80">{subtitle}</div>
    </motion.button>
  );
});


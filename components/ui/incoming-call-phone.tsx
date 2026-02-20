import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IncomingCall } from '@/components/ui/incoming-call';

/**
 * Glassmorphic incoming call card (e.g. "Jeweller" incoming call).
 * Use for illustrating outbound/reception capability on the landing page.
 */
export function IncomingCallPhone({ className, isDarkMode = true }: { className?: string; isDarkMode?: boolean }) {
  const noop = () => {};
  return (
    <motion.div
      className={cn(
        'relative mx-auto flex justify-center',
        className
      )}
      whileHover={{
        x: [0, -3, 3, -2, 2, 0],
        y: [0, 2, -2, 1, -1, 0],
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
    >
      <IncomingCall
        embedded
        callerName="Jeweller"
        statusText="incoming call"
        onAccept={noop}
        onDecline={noop}
        onClose={noop}
        isDarkMode={isDarkMode}
        className="!max-w-sm !shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] !border-white/20 !bg-white/5 dark:!bg-white/5 backdrop-blur-2xl rounded-2xl border"
      />
    </motion.div>
  );
}

'use client';
import { cn } from '@/lib/utils';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function AnimateOnView({
  children,
  delay,
  duration,
  verticalAnimation,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  verticalAnimation?: boolean;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) animation.start('fadeIn');
  }, [inView]);

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      variants={{
        initial: { opacity: 0, y: verticalAnimation ? 25 : 0 },
        fadeIn: { opacity: 1, y: 0 },
      }}
      initial='initial'
      animate={animation}
      transition={{ delay: delay ?? 0.25, duration: duration ?? 0.5 }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
}

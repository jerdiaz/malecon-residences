"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

interface SplitWordsProps {
  text: string;
  className?: string;
  /** Base delay in ms before the first word appears */
  delay?: number;
  /** Stagger interval between words in ms */
  stagger?: number;
}

const wordVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const wordTransition = { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const };

export default function SplitWords({
  text,
  className = "",
  delay = 0,
  stagger = 50,
}: SplitWordsProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger / 1000,
            delayChildren: delay / 1000,
          },
        },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        // El espacio está FUERA del overflow-hidden para que no quede clippeado
        <Fragment key={i}>
          <span className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
            <motion.span
              className="inline-block"
              variants={wordVariants}
              transition={wordTransition}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.span>
  );
}

import { motion } from "framer-motion";

export function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-24 opacity-80">
      <div className="relative mb-6 flex h-12 w-12 items-center justify-center">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-[#0D0D0D]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="relative inline-flex h-4 w-4 rounded-full bg-[#0D0D0D]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p style={{ fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" }} className="text-xs font-bold uppercase tracking-widest text-[#2D2D2D]">
        {text}
      </p>
    </div>
  );
}

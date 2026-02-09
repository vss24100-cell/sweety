import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PhotoFrameProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  rotate?: number;
}

export function PhotoFrame({ src, alt, className, caption, rotate = 0 }: PhotoFrameProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
      initial={{ rotate: rotate }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("relative group cursor-pointer", className)}
    >
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-lg rounded-sm border border-gray-100 rotate-0 overflow-hidden">
        <div className="aspect-[3/4] overflow-hidden relative">
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        {caption && (
          <div className="absolute bottom-4 left-0 right-0 text-center font-script text-2xl md:text-3xl text-gray-800 rotate-[-2deg]">
            {caption}
          </div>
        )}
      </div>
    </motion.div>
  );
}

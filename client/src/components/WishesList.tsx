import { useWishes } from "@/hooks/use-wishes";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function WishesList() {
  const { data: wishes, isLoading } = useWishes();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!wishes?.length) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        Be the first to wish her a happy birthday!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {wishes.map((wish, idx) => (
        <motion.div
          key={wish.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-md border border-pink-100 hover:shadow-lg transition-shadow relative"
        >
          <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 fill-current" />
          <p className="text-gray-600 italic font-medium leading-relaxed mb-4">
            "{wish.message}"
          </p>
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
              {wish.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-display font-semibold text-foreground">
              {wish.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

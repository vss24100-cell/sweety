import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWishSchema, type InsertWish } from "@shared/schema";
import { useCreateWish } from "@/hooks/use-wishes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function WishForm() {
  const { mutate, isPending } = useCreateWish();
  const { toast } = useToast();

  const form = useForm<InsertWish>({
    resolver: zodResolver(insertWishSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  function onSubmit(data: InsertWish) {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Wish sent!",
          description: "Thank you for sharing your love.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/60 max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-bold text-foreground">Leave a Wish</h3>
        <p className="text-muted-foreground mt-2">Write something sweet for the birthday girl</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your name..." 
                    className="bg-white/80 border-primary/20 focus:border-primary focus:ring-primary/20 rounded-xl"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your birthday wish here..." 
                    className="resize-none bg-white/80 border-primary/20 focus:border-primary focus:ring-primary/20 rounded-xl min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-12 rounded-xl text-lg font-medium bg-gradient-to-r from-primary to-pink-600 hover:to-pink-700 shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
          >
            {isPending ? (
              "Sending..."
            ) : (
              <>
                Send Wishes <Heart className="ml-2 w-5 h-5 fill-current" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

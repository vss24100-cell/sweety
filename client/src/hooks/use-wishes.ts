import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertWish } from "@shared/routes";

export function useWishes() {
  return useQuery({
    queryKey: [api.wishes.list.path],
    queryFn: async () => {
      const res = await fetch(api.wishes.list.path);
      if (!res.ok) throw new Error("Failed to fetch wishes");
      return api.wishes.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateWish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertWish) => {
      const res = await fetch(api.wishes.create.path, {
        method: api.wishes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error("Please check your input.");
        }
        throw new Error("Failed to send wish");
      }
      return api.wishes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.wishes.list.path] });
    },
  });
}

import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBackendActor() {
  return useActor(createActor);
}

export function useGetCallerProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery<unknown>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      // Will call actor.getCallerUserProfile() once backend is wired
      return null;
    },
    enabled: !!actor && !actorFetching,
  });
  return { ...query, isLoading: actorFetching || query.isLoading };
}

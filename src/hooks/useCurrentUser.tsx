import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCurrentUser } from "utils/api";

export default function useCurrentUser() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const { data: currentUserData } = useQuery({
    queryKey: ["current_user"],
    queryFn: fetchCurrentUser,
    enabled: !!currentUserId,
    staleTime: 5000,
  });

  if (currentUserData) {
    setCurrentUserId(currentUserData.user_id);
  }

  return { currentUserId };
}

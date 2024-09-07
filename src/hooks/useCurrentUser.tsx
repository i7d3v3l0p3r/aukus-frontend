import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "utils/api";

export default function useCurrentUser() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const { data: currentUserData } = useQuery({
    queryKey: ["current_user"],
    queryFn: fetchCurrentUser,
    enabled: !currentUserId,
    staleTime: 5000,
  });

  useEffect(() => {
    if (currentUserData?.user_id) {
      setCurrentUserId(currentUserData.user_id);
    }
  }, [currentUserData?.user_id]);

  return { currentUserId };
}

import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useAuth = () => {
    const { data: session, status } = useSession();

    const isLoggedIn = useMemo(() => {
        if (status === "authenticated") {
            return true;
        }
        return false;
    }, [status])

    const isLoading = useMemo(() => {
        if (status === "loading") {
            return true;
        }
        return false;
    }, [status])

    return { isLoggedIn, session, isLoading }
}

import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const Route = createFileRoute("/_authenticated")({
  component: AuthGate,
});

function AuthGate() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }
  return <Outlet />;
}

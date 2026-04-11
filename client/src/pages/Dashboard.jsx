import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import RichTextEditor from "../components/RichTextEditor";
import { AIWorkspaceProvider } from "../context/AIWorkspaceContext";

function DashboardContent() {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-background text-text">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="h-full w-full">
                <RichTextEditor />
            </div>
        </Layout>
    );
}

// Wrap it with AIWorkspaceProvider so we have access to notes context exactly where we need it
export default function Dashboard() {
    return (
        <AIWorkspaceProvider>
            <DashboardContent />
        </AIWorkspaceProvider>
    );
}
import RecruiterSidebar from "@/components/dashboard/RecruiterSidebar";

export default function RecruiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#070d14] flex">
            <RecruiterSidebar />
            <main className="flex-1 ml-[260px]">
                {children}
            </main>
        </div>
    );
}

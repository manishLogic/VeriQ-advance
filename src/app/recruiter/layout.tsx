import RecruiterSidebar from "@/components/dashboard/RecruiterSidebar";

export default function RecruiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#070d14] flex">
            <RecruiterSidebar />
            <main className="flex-1 w-full lg:ml-[260px] mt-16 lg:mt-0">
                {children}
            </main>
        </div>
    );
}

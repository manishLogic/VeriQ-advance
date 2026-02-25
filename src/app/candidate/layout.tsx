import Sidebar from "@/components/dashboard/Sidebar";

export default function CandidateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#070d14] flex">
            <Sidebar />
            <main className="flex-1 ml-[260px]">
                {children}
            </main>
        </div>
    );
}

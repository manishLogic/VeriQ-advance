import Sidebar from "@/components/dashboard/Sidebar";

export default function CandidateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#070d14] flex">
            <Sidebar />
            <main className="flex-1 w-full lg:ml-[260px] mt-16 lg:mt-0">
                {children}
            </main>
        </div>
    );
}

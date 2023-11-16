import { NormalHeader,BarHeader } from "@/components/Header"
import UserPannel from "@/components/admin/UserPannel"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="hidden fixed top-8 left-10 lg:block">
                <NormalHeader dark={false} />
            </div>
            <div className="lg:hidden fixed z-10">
                <BarHeader dark={false}/>
            </div>
            <section className="min-h-screen">{children}</section>
            <UserPannel/>
        </div>
    )
}
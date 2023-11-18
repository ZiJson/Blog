import { NormalHeader,BarHeader } from "@/components/Header"
import UserPannel from "@/components/admin/UserPannel"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <section className="min-h-screen">{children}</section>
            <UserPannel inAdmin={false}/>
        </div>
    )
}
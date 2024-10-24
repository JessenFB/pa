import Link from 'next/link';
export default function DashboardLayout({
    children 
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav className="bg-green-500 p-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/dashboard" className="text-white hover:text-green-200">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/users" className="text-white hover:text-green-200">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/post" className="text-white hover:text-green-200">
                            Input
                        </Link>
                    </li>
                   
                </ul>
            </nav>
            {children}
        </section>
    )
}
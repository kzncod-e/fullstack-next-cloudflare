import { CheckSquare, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "../modules/auth/components/logout-button";

export function Navigation() {
    return (
        <nav className="border-b bg-white sticky  w-full top-0">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between  ">
                    <div className="flex items-center space-x-6">
                        
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-900"
                        >
                            Ai report
                        </Link>
                        <div className="items-center space-x-4 hidden md:flex">
                        
                            
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </nav>
    );
}

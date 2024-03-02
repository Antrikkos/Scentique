"use client"

import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();

    return (
        <div className="flex flex-row text-left pb-8">
            <ArrowBigLeft />
            <button className="font-semibold" onClick={() => router.back()}>Back to previous page</button>
        </div>
    )

}
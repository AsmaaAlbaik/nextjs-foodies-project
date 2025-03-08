import Link from "next/link";

export default function NotFoundPage() {
    return <main className="not-found">
        <h1>Meal not found!</h1>
        <p>
            Are you lost? <Link href="/meals">Go back to the main page</Link>
        </p>
    </main>
}
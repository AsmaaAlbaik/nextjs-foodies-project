"use client";

export default function Error({ error }) {
    return <main className="error">
        <h1>An Error occurred!</h1>
        <p>{error}</p>
    </main>
}
"use client";

import { useFormStatus } from "react-dom";

export default function MealFromSubmit() {
    const { panding } = useFormStatus();

    return <button disabled={panding} type="submit">{panding ? 'submiting...' : 'Share Meal'}</button>
}
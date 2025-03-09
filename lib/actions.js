'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createMeal } from "./meals";
const isInvalidText = (text) => {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
    }
    await createMeal(meal);

    if (isInvalidText(meal.title)
        || isInvalidText(meal.summary)
        || isInvalidText(meal.creator)
        || isInvalidText(meal.creator_email)
        || !meal.creator_email.includes('@')
        || isInvalidText(meal.instructions)
        || isInvalidText(meal.image)
        || meal.image.size === 0) {
        return { message: 'Invalid input' };
    }

    // if (!response.ok) {
    //     throw new Error('Failed to share meal');
    // }

    // const data = await response.json();
    // console.log(data);
    revalidatePath('/meals');
    redirect(`/meals`);
};
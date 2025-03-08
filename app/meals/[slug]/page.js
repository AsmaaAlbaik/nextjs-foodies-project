import { getMealById } from '@/lib/meals'
import Image from 'next/image'
import { notFound } from 'next/navigation';
import classes from './page.module.css'

export default async function MealDetailsPage({ params }) {
    const meal = await getMealById(params.slug);

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');
    return <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={meal.image} alt={meal.title} fill />
            </div>
            <div className={classes.headerText}>
                <h2>{meal.title}</h2>
                <p className={classes.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main className={classes.page}>
            <p className={classes.instructions} dangerouslySetInnerHTML={{
                __html: meal.instructions,
            }}></p>
        </main>
    </>
}
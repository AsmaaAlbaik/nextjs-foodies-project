import MealsGrid from '@/components/meals/meals-grid';
import Link from 'next/link';
import classes from './page.module.css';
import { getAllMeals } from '@/lib/meals';
import { Suspense } from 'react';


async function Meals() {
    const meals = await getAllMeals();
    return <MealsGrid meals={meals} />
}

export default function MealsPage() {
    return <>
        <header className={classes.header}>
            <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
            <p>
                Choose your favorite meal and then prepare it yourself at home!
                it is easy and only takes 30 minutes!
            </p>
            <p className={classes.cta}>
                <Link href="/meals/share">
                    Share your own meal!
                </Link>
            </p>
        </header>
        <main className={classes.main}>
            <Suspense fallback={<p className={classes.loading}>Loading ...</p>}>
                <Meals />
            </Suspense>
        </main>
    </>
}
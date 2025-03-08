import sql from 'better-sqlite3';
import slugify from 'slugify';
import fs from 'node:fs';
import xss from 'xss';  // not 'xxs'
const db = sql('meals.db');

export async function getAllMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // throw new Error('Could not fetch meals');
    return db.prepare('SELECT * FROM meals').all();
}


export function getMealById(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function createMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extention = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extention}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            console.error(error);
            throw new Error('Failed to save image');
        }
    });
    meal.image = `/images/${fileName}`;
    db.prepare(`INSERT INTO meals 
        (title, summary, creator, creator_email, instructions, image, slug) 
        VALUES (
            @title, 
            @summary,
            @creator,
            @creator_email,
            @instructions,
            @image,
            @slug
        )`).run(meal);
}
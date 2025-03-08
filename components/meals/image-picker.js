"use client";
import Image from 'next/image';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
    const imageInuptRef = useRef();
    const [pickedImage, setPickedImage] = useState();
    function handlePickImage() {
        imageInuptRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPickedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                {!pickedImage && <p>No image picked.</p>}
                {pickedImage && (
                    <div className={classes.preview}>
                        <Image src={pickedImage} alt="Picked" fill />
                    </div>
                )}
                <input
                    className={classes.input}
                    type="file"
                    id="image"
                    name={name}
                    accept=".jpg,.jpeg,.png"
                    ref={imageInuptRef}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickImage}>
                    Choose Image
                </button>
            </div>
        </div>
    );
}
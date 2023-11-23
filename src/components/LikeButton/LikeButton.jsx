import React, {useEffect, useState} from 'react';

import css from './LikeButton.module.css'
import axios from 'axios'; // Потрібно імпортувати бібліотеку для взаємодії з бекендом

const LikeButton = () => {
    // Стан для відстеження кількості лайків та стану кнопки (чи вона була клікнута)
    const [likeCount, setLikeCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    // useEffect(() => {
    //     // Функція для отримання кількості лайків з API
    //     const fetchLikeCount = async () => {
    //         try {
    //             const response = await axios.get('YOUR_BACKEND_API_ENDPOINT');
    //             setLikeCount(response.data.likeCount);
    //         } catch (error) {
    //             console.error('Помилка при отриманні кількості лайків з бекенду', error);
    //         }
    //     };
    //
    //     // Викликаємо функцію при монтажі компонента
    //     fetchLikeCount();
    // }, []); // Застосовуємо порожній масив залежностей, щоб викликати ефект тільки один раз під час монтажу
    //
    // const handleLikeClick = async () => {
    //     if (!isClicked) {
    //         setLikeCount(likeCount + 1);
    //         setIsClicked(true);
    //
    //         try {
    //             await axios.post('YOUR_BACKEND_API_ENDPOINT', { likeCount: likeCount + 1 });
    //         } catch (error) {
    //             console.error('Помилка при відправці даних на бекенд', error);
    //         }
    //     }
    // };
    // onClick={handleLikeClick}
    return (
        <div className={css.likeBtnContainer}>
            <button className={`${css.likeBtn} ${isClicked ? css.clicked : ''}`} >
                <div className={css.likeBtnCount}>{likeCount}</div>
                <div className={css.likeIcon}>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 17.0062C10 17.0062 1 11.9937 1 5.97856C1 -0.0365507 8 -0.537808 10 4.16843C12 -0.537808 19 -0.0365507 19 5.97856C19 11.9937 10 17.0062 10 17.0062Z"
                            fill="#ffffff"
                            stroke="#2B2626"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export { LikeButton };
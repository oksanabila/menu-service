import React, { useEffect, useState, useRef } from 'react';
import css from './SubMenuTabs.module.css';
import {DishCard} from "../DishCard/DishCard";


const SubMenuTabs = () => {
    const categories = ['Main dishes', 'Meat', 'Combo Menu', 'Salads', 'Bowl', 'Deserts', 'Category 7', 'Category 8'];
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const containerRef = useRef(null);
    const verticalPadding = 60;


    const scrollToCategory = (category) => {
        const categoryElement = document.getElementById(category);
        window.scrollTo({
            top: categoryElement.offsetTop - verticalPadding,
            behavior: 'smooth',
        });
    };


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const categoryElements = categories.map((category) => {
                const element = document.getElementById(category);
                return {
                    category,
                    offsetTop: element ? element.offsetTop - verticalPadding : 0,
                    offsetBottom: element ? element.offsetTop + element.offsetHeight - verticalPadding : 0,
                };
            });


            for (let i = 0; i < categoryElements.length; i++) {
                if (scrollPosition >= categoryElements[i].offsetTop && scrollPosition < categoryElements[i].offsetBottom) {
                    setActiveCategory(categoryElements[i].category);
                    break;
                }
            }


            const activeTab = document.querySelector(`.${css.active}`);
            if (activeTab && containerRef.current) {
                containerRef.current.scrollLeft = activeTab.offsetLeft - (containerRef.current.offsetWidth - activeTab.offsetWidth) / 2;
            }
        };


        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [categories]);


    useEffect(() => {
        const handleTabClick = (category) => {
            const categoryElement = document.getElementById(category);


            if (categoryElement) {
                setActiveCategory(category);
                window.scrollTo({
                    top: categoryElement.offsetTop - verticalPadding,
                    behavior: 'smooth',
                });
            }
        };


        const container = containerRef.current;


        if (container) {
            container.addEventListener('click', handleTabClick);
        }


        return () => {
            if (container) {
                container.removeEventListener('click', handleTabClick);
            }
        };
    }, [containerRef]);


    return (
        <div>
            <nav ref={containerRef} className={css.navTabs}>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => scrollToCategory(category)}
                        data-category={category}
                        className={activeCategory === category ? `${css.buttonTab} ${css.active}` : `${css.buttonTab}`}
                    >
                        {category}
                    </button>
                ))}
            </nav>


            {categories.map((category) => (
                <section key={category} id={category} className={`${css.category} ${activeCategory === category ? css.active : ''}`}>
                    <h3 className={css.categoryTitle}>{category}</h3>


                    <DishCard/>
                    <DishCard/>
                    <DishCard/>
                    <DishCard/>
                    <DishCard/>


                </section>
            ))}
        </div>
    );
};


export { SubMenuTabs };

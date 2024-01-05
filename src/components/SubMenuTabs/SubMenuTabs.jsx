import React, { useEffect, useState, useRef } from 'react';
import css from './SubMenuTabs.module.css';
import dish from '../DishCard/DishCard.module.css';
import { DishCard } from "../DishCard/DishCard";

const SubMenuTabs = ({ subsections, menuData }) => {
    const [activeCategory, setActiveCategory] = useState(subsections[0]?.name || '');
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
            const categoryElements = subsections.map((subsection) => {
                const element = document.getElementById(subsection.name);
                return {
                    name: subsection.name,
                    offsetTop: element ? element.offsetTop - verticalPadding : 0,
                    offsetBottom: element ? element.offsetTop + element.offsetHeight - verticalPadding : 0,
                };
            });

            for (let i = 0; i < categoryElements.length; i++) {
                if (scrollPosition >= categoryElements[i].offsetTop && scrollPosition < categoryElements[i].offsetBottom) {
                    setActiveCategory(categoryElements[i].name);
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
    }, [subsections]);

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
                {subsections.map((subsection) => (
                    <button
                        key={subsection.id}
                        onClick={() => scrollToCategory(subsection.name)}
                        data-category={subsection.name}
                        className={activeCategory === subsection.name ? `${css.buttonTab} ${css.active}` : `${css.buttonTab}`}
                    >
                        {subsection.name}
                    </button>
                ))}
            </nav>

            {subsections.map((subsection) => (
                <section key={subsection.id} id={subsection.name} className={`${css.category} ${activeCategory === subsection.name ? css.active : ''}`}>
                    <h3 className={css.categoryTitle}>{subsection.name}</h3>
                    <div className={dish.dishes}>
                        {subsection.dishes.map((dish, key) => (
                            <DishCard key={`${subsection.id}${dish.id}${key}`} id={`${subsection.id}${dish.id}${key}`} dish={dish} />
                        ))}
                    </div>

                </section>
            ))}
        </div>
    );
};

export { SubMenuTabs };

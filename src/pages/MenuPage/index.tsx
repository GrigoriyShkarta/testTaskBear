import {FC, useEffect, useState} from 'react';
import s from "./MenuPage.module.scss";
import axios from "axios";
import {useStore} from "zustand";
import {useBearStore} from "../../store/store";
import ProductCard from "./ProductCard";

const MenuPage:FC = () => {
    const [fetchingNextPage, setFetchingNextPage] = useState(false);
    const {
        page,
        recipes,
        selectedRecipes,
        setSelectedRecipes
    } = useBearStore(state => state)

    const VISIBLE_RECIPES = 5;

    useEffect(() => {
        fetchRecipes(page);
    }, [page]);

    console.log(fetchingNextPage)

    const fetchRecipes = async (currentPage: number) => {
        try {
            console.log("fetch")
            setFetchingNextPage(true);
            const response = await axios.get(
                `https://api.punkapi.com/v2/beers?page=${currentPage}`
            );
            const data = response.data;
            setSelectedRecipes([]);
            useBearStore.setState({ recipes: [...data] });
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            console.log("cancel")
            setFetchingNextPage(false)
        }
    };

    const handleRightClick = (recipeId: number, event: any) => {
        event.preventDefault();
        if (selectedRecipes.includes(recipeId)) {
            setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
        } else {
            setSelectedRecipes([...selectedRecipes, recipeId]);
        }
    };

    const handleLeftClick = (recipeId: number) => () => {
        if (selectedRecipes.includes(recipeId)) {
            const updatedSelectedRecipes = selectedRecipes.filter(
                (id) => id !== recipeId
            );
            setSelectedRecipes(updatedSelectedRecipes);
        } else {
            // Go to the single recipe page
            console.log(`Go to recipe ${recipeId}`);
        }
    };

    const visibleRecipes = recipes.slice(
        (page - 1) * VISIBLE_RECIPES,
        page * VISIBLE_RECIPES
    );

    useEffect(() => {
        const handleScroll = () => {
            console.log("2", fetchingNextPage)

            if (fetchingNextPage) {
                return;
            }

            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop + windowHeight >= documentHeight && recipes.length - selectedRecipes.length >= VISIBLE_RECIPES) {
                const updatedRecipes = recipes.slice(VISIBLE_RECIPES);
                useBearStore.setState({ recipes: [...updatedRecipes] });
                window.scrollTo({ top: 0});
            }

            if (recipes.length <= VISIBLE_RECIPES && scrollTop + windowHeight >= documentHeight) {
                useBearStore.setState((prevState) => ({ page: prevState.page + 1 }));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [recipes, fetchingNextPage]);

    return (
        <div className={s.productList}>
            {visibleRecipes.map((recipe, index) => (
                <ProductCard
                    id={recipe.id}
                    index={index}
                    name={recipe.name}
                    img={recipe.image_url}
                    description={recipe.description}
                    food_pairing={recipe.food_pairing}
                    ingredients={recipe.ingredients}
                    selected={selectedRecipes.includes(recipe.id)}
                    onRightClick={handleRightClick}
                />
            ))}
        </div>
    );
};

export default MenuPage;
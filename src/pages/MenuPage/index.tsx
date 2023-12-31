import {FC, useEffect} from 'react';
import s from "./MenuPage.module.scss";
import {useBearStore} from "../../store/store";
import RecipeCard from "./RecipeCard";

const MenuPage:FC = () => {
    const {
        page,
        recipes,
        selectedRecipes,
        setSelectedRecipes,
        fetchRecipes
    } = useBearStore(state => state);

    const VISIBLE_RECIPES = 5;

    useEffect(() => {
        fetchRecipes(page);
    }, [page]);

    const handleRightClick = (recipeId: number, event: any) => {
        event.preventDefault();
        if (selectedRecipes.includes(recipeId)) {
            setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
        } else {
            setSelectedRecipes([...selectedRecipes, recipeId]);
        }
    };

    const visibleRecipes = recipes.slice(
        (page - 1) * VISIBLE_RECIPES,
        page * VISIBLE_RECIPES
    );

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = document.documentElement.clientHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            if (
                scrollTop + windowHeight >= documentHeight &&
                recipes.length - selectedRecipes.length >= VISIBLE_RECIPES
            ) {
                const updatedRecipes = recipes.slice(VISIBLE_RECIPES);
                useBearStore.setState((prevState) => ({ recipes: [...updatedRecipes] }));
                window.scrollTo({ top: 0 });
                if (recipes.length <= VISIBLE_RECIPES) {
                    useBearStore.setState((prevState) => ({ page: prevState.page + 1 }));
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [recipes]);

    return (
        <div className={s.productList}>
            {visibleRecipes.map((recipe, index) => (
                <RecipeCard
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
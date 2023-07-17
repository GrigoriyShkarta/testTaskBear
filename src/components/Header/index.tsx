import {FC} from 'react';
import s from "./Header.module.scss";
import {useBearStore} from "../../store/store";
import Button from "../Button";

const Header:FC = () => {
    const selectedRecipes = useBearStore((state) => state.selectedRecipes);
    const recipes = useBearStore((state) => state.recipes);
    const removeSelectedRecipes = useBearStore((state) => state.removeSelectedRecipes);

    const handleDelete = () => {
        const updatedRecipes = recipes.filter((recipe) => !selectedRecipes.includes(recipe.id));
        const remainingRecipeCount = recipes.length - updatedRecipes.length;
        if (remainingRecipeCount === 0) {
            useBearStore.setState((prevState) => ({ page: prevState.page + 1 }));
        }
        useBearStore.setState({ recipes: [...updatedRecipes] });
        removeSelectedRecipes();
    };

    return (
        <header className={s.header}>
            <div className={s.logo}>
                <span className={s.logo__title}>GRIGORIY SHKARTA PRESENT</span>
            </div>
            {selectedRecipes.length > 0 && (
                <div className={s.buttonWrapper} onClick={handleDelete}>
                    <Button value={"Delete All"}/>
                </div>
            )}
        </header>
    );
};

export default Header;
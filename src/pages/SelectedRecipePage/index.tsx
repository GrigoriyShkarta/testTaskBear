import {FC, useEffect} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import s from "./SelectedRecipe.module.scss";
import {useBearStore} from "../../store/store";

const SelectedRecipe:FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/').pop() || 0;
    const {recipes, setSelectedRecipes} = useBearStore(state => state);
    const selectedRecipe = recipes.find(r => r.id === +id);

    useEffect(() => {
        if (!selectedRecipe) {
            navigate("/");
        }
        setSelectedRecipes([])
    }, []);

    if (!selectedRecipe) {
        return null;
    }

    return (
        <div className={s.recipe}>
            <div className={s.recipe__imgWrapper}>
                <img className={s.recipe__img} src={selectedRecipe.image_url} alt="bearImage"/>
            </div>
            <div className={s.recipe__info}>
                <h1 className={s.recipe__info_title}>{selectedRecipe.name}</h1>
                <p className={s.recipe__info_description}>{selectedRecipe.description}</p>
                <div className={s.ingredients}>
                    <h4 className={s.ingredients__title}>Ingredients</h4>
                    <div className={s.ingredients__container}>
                        <span className={s.ingredients__name}>Malt:</span>
                        <div className={s.spanWrapper}>
                            {selectedRecipe.ingredients.malt.map((m, index) =>
                                <span className={s.ingredients__ingredient} key={index}>{m.name}</span>
                            )}
                        </div>
                    </div>
                    <div className={s.ingredients__container}>
                        <span className={s.ingredients__name}>Hops:</span>
                        <div className={s.spanWrapper}>
                            {selectedRecipe.ingredients.hops.map((m, index) =>
                                <span className={s.ingredients__ingredient} key={index}>{m.name}</span>
                            )}
                        </div>
                    </div>
                </div>
                <h4 className={s.recipe__foodPairing}>Food pairing</h4>
                <div className={s.recipe__foodPairing_array}>
                    <div className={s.recipe__foodPairing_spanWrapper}>
                        {selectedRecipe.food_pairing.map((f, index) =>
                            <span className={s.recipe__foodPairing_food} key={index}>{f}</span>
                        )}
                    </div>
                </div>
                <Link to={"/"}>
                    <span className={s.goHome}>Go Home</span>
                </Link>
            </div>
        </div>
    );
};

export default SelectedRecipe;
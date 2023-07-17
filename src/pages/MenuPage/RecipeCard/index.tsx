import {FC} from 'react';
import {Link} from "react-router-dom";
import s from "./ProductCard.module.scss"

type Ingredient = {
    name: string;
};

type RecipeCardProps = {
    id: number;
    index: number;
    name: string;
    img: string
    description: string
    food_pairing: string[];
    ingredients: {
        malt: Ingredient[];
        hops: Ingredient[];
    };
    selected: boolean;
    onRightClick: (id: number, event: any) => void;
};

const RecipeCard: FC<RecipeCardProps> = ({id, name, img, description, food_pairing,
                                             ingredients, index, selected,
                                         onRightClick}) =>
    <div
        className={`${s.card} ${index % 2 !== 1 ? s.card__gray : ''}`}
        key={id}
        onContextMenu={(e) => onRightClick(id, e)}
    >
        <div className={s.card__imgWrapper}>
            <img className={s.card__img} src={img} alt="bearImage"/>
        </div>
        <div className={s.card__info}>
            <Link to={`recipe/${id}`}>
                <h3 className={s.card__info_title}>{name}</h3>
            </Link>
            <p className={s.card__info_description}>{description}</p>
            <div className={s.ingredients}>
                <h4 className={s.ingredients__title}>Ingredients</h4>
                <div className={s.ingredients__container}>
                    <span className={s.ingredients__name}>Malt:</span>
                    <div className={s.spanWrapper}>
                        {ingredients.malt.map((m, index) =>
                            <span className={s.ingredients__ingredient} key={index}>{m.name}</span>
                        )}
                    </div>
                </div>
                <div className={s.ingredients__container}>
                    <span className={s.ingredients__name}>Hops:</span>
                    <div className={s.spanWrapper}>
                        {ingredients.hops.map((m, index) =>
                            <span className={s.ingredients__ingredient} key={index}>{m.name}</span>
                        )}
                    </div>
                </div>
            </div>
            <span className={s.card__foodPairing}>Food pairing</span>
            <div className={s.card__foodPairing_array}>
                <div className={s.spanWrapper}>
                    {food_pairing.map((f, index) =>
                        <span className={s.card__foodPairing_food} key={index}>{f}</span>
                    )}
                </div>
            </div>
        </div>
        {selected && <span className={s.selected}>selected</span>}
    </div>

export default RecipeCard;

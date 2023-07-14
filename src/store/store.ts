import create from 'zustand';

type Ingredient = {
    name: string;
};

interface Recipe {
    id: number;
    name: string;
    image_url: string
    description: string
    food_pairing: string[];
    ingredients: {
        malt: Ingredient[];
        hops: Ingredient[];
    };
}

interface Store {
    recipes: Recipe[];
    page: number;
    selectedRecipes: number[];
    setSelectedRecipes: (selectedRecipes: number[]) => void;
    removeSelectedRecipes: () => void;
}

export const useBearStore = create<Store>((set) => ({
    recipes: [],
    page: 1,
    selectedRecipes: [],
    setSelectedRecipes: (selectedRecipes) =>
        set(() => ({ selectedRecipes: [...selectedRecipes] })),
    removeSelectedRecipes: () => set(() => ({ selectedRecipes: [] }))
}));

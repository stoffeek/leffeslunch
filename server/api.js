const API_URL = 'http://localhost:5001/api'

export const fetchProdcuts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products: ', error);
        throw error;
    }
}

export const fetchIngredients = async () => {
    try {
        const response = await fetch(`${API_URL}/ingredients`);
        if (!response.ok) {
            throw new Error('Failed to fetch ingredients: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dishes: ', error);
        throw error;
    }
}

export const fetchRecipe= async () => {
    try {
        const response = await fetch(`${API_URL}/recipe`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipe: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipe: ', error);
        throw error;
    }
}

export const fetchSales= async () => {
    try {
        const response = await fetch(`${API_URL}/sales`);
        if (!response.ok) {
            throw new Error('Failed to fetch sales: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sales: ', error);
        throw error;
    }
}
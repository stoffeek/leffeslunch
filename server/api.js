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
        console.error('Error fetching dishes: ', error);
        throw error;
    }
}
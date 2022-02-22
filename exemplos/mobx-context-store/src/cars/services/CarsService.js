export const getCars = async () => {
    const response = await fetch('https://62154237c9c6ebd3ce23714e.mockapi.io/api/v1/cars');
    return await response.json();
}
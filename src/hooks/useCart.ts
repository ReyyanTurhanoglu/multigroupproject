import { useCartInternal } from '../context/CartContext';


export const useCart = () => {
    return useCartInternal();
};
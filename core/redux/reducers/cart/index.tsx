import ProductType from "@/models/product";

const initialState = {
    cart: [] as CartType[]
};

type CartType = {
    product: ProductType;
    count: number;
};

const cartReducer = (state = initialState, action: { type: string; payload?: CartType }) => {
    switch (action.type) {
        case 'CART_ONE_ADD': {
            const existingProductIndex = state.cart.findIndex(
                (item) => item.product.id === action?.payload?.product.id
            );

            if (existingProductIndex !== -1) {
                const updatedCart = state.cart.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, count: item.count + 1 }
                        : item
                );

                return {
                    ...state,
                    cart: updatedCart
                };
            }
            return {
                ...state,
                cart: [...state.cart, { product: action?.payload?.product, count: 1 }]
            };
        }
        case 'CART_ONE_REMOVE': { 
            return { 
                ...state, 
                cart: state.cart.filter((item) => item.product.id !== action?.payload?.product.id)
            }
        }  
        case 'CART_DESCREASE_COUNT': {
            const existingProductIndex = state.cart.findIndex(
                (item) => item.product.id === action?.payload?.product.id
            );

            if (existingProductIndex !== -1) {
                const updatedCart = state.cart.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, count: item.count - 1 }
                        : item
                );

                const filteredCart = updatedCart.filter((item) => item.count > 0);

                return {
                    ...state,
                    cart: filteredCart
                };
            }
            return state;
        }
    
        default:
            return state;
    }
};
export default cartReducer;
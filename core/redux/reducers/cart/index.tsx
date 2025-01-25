import ProductType from "@/models/product";

const initialState = {
    cart: [] as CartType[]
};

type CartType = ProductType & {
    itemCount: number;
};

const cartReducer = (state = initialState, action: { type: string; payload?: CartType | CartType[] }) => {
    switch (action.type) {
        case 'CART_GET_ALL': {
            return {
                ...state,
                cart: action?.payload || []
            }
        }
        case 'CART_ONE_ADD': {
            const findedItem = state.cart.find(item => item._id === (action.payload as CartType)?._id);
            if (findedItem) {
                const updatedCart = state.cart.map((item) =>
                    item._id === findedItem?._id ? { ...item, ...action.payload } : item
                );
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                };
            }
        }
        default:
            return state;
    }
};
export default cartReducer;
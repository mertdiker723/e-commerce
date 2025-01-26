import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import ProductType from '@/models/product';
import axios from 'axios';

type RootState = {
    cartReducer: {
        cart: (ProductType & { itemCount: number })[];
    };
};
const ShoppingCartItem = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state: RootState) => state.cartReducer);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const updateCount = (product: ProductType & { itemCount: number }, riseCounting: boolean) => {
        setIsLoading(true);
        axios.put("/api/cart", {
            product,
            riseCounting
        }).then((res) => {
            const { data } = res || {};
            const { cart } = data || {};
            const { product, itemCount } = cart || {};
            setIsLoading(false);
            if (itemCount === 0) {
                dispatch({
                    type: 'CART_REMOVE_ITEM', payload: {
                        ...product,
                    }
                });
                return;
            }
            dispatch({
                type: 'CART_UPDATE_COUNT', payload: {
                    ...product, itemCount,
                }
            });          
        }).catch((error) => {
            setErrorMessage(error.message);
            setIsLoading(false);
        });
    };

    const removeCartItem = (product: ProductType & { itemCount: number }) => {
        setIsLoading(true);
        axios.delete("/api/cart", {
            data: { product }
        }).then((res) => {
            const { data } = res || {};
            const { cart } = data || {};
            const { product } = cart || {};
            dispatch({
                type: 'CART_REMOVE_ITEM', payload: {
                    ...product,
                }
            });

            setIsLoading(false);
        }).catch((error) => {
            setErrorMessage(error.message);
            setIsLoading(false);
        });
    }

    return (
        <>
            {
                cart.length > 0 ? cart.map((item) => {
                    const { _id, price, productName, productDetail, itemCount } = item || {};
                    return (
                        <div key={_id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => updateCount(item, false)}
                                            id="decrement-button"
                                            disabled={isLoading}
                                            data-input-counter-decrement="counter-input"
                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                        >
                                            <Image
                                                src="/assets/icons/minus.svg"
                                                width={10}
                                                height={10}
                                                alt="picture"
                                            />
                                        </button>
                                        <input
                                            type="text"
                                            id="counter-input"
                                            data-input-counter
                                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                            placeholder=""
                                            value={itemCount}
                                            required
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={() => updateCount(item, true)}
                                            id="increment-button"
                                            data-input-counter-increment="counter-input"
                                            disabled={isLoading}
                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                        >
                                            <Image
                                                src="/assets/icons/plus.svg"
                                                width={10}
                                                height={10}
                                                alt="picture"
                                            />
                                        </button>
                                    </div>
                                    <div className="text-end md:order-4 md:w-32">
                                        <p className="text-base font-bold text-gray-900 dark:text-white">{itemCount * price}₺</p>
                                    </div>
                                </div>

                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                    <div className="text-base font-medium text-gray-900 hover:underline dark:text-white">{productName}</div>
                                    <div className="">{productDetail}</div>
                                    <div className="flex items-center gap-4">

                                        <button
                                            onClick={() => removeCartItem(item)}
                                            type="button"
                                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }) : <div className="text-center">There is no item in the cart.</div>
            }
            {
                errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            }
        </>
    )
}

export default ShoppingCartItem
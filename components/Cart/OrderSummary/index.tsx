import React from 'react'
import { useSelector } from 'react-redux';

import ProductType from '@/models/product';

type RootState = {
    cartReducer: {
        cart: { product: ProductType, count: number }[];
    };
};

const OrderSummary = () => {
    const { cart } = useSelector((state: RootState) => state.cartReducer);

    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.product.price * item.count
    }, 0);

    return (
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">{totalPrice}₺</dd>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
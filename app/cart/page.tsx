"use client"

import OrderSummary from "@/components/Cart/OrderSummary";
// Components
import ShoppingCartItem from "@/components/Cart/ShoppingCartItem";


const Cart = () => {
    return (
        <div className="bg-white antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            <ShoppingCartItem />
                        </div>
                    </div>
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}

export default Cart
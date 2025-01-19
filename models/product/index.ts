import BrandType from "../brand";
import CategoryType from "../category";

type ProductType = {
    _id: string;
    productName: string;
    productDetail: string;
    date: string;
    price: number;
    category: CategoryType | null;
    brand: BrandType | null;
}


export default ProductType;
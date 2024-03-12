import BrandType from "../brand";
import CategoryType from "../category";

type ProductType = {
    id: string;
    productName: string;
    productDetail: string;
    price: number;
    category: CategoryType | null;
    brand: BrandType | null;
}


export default ProductType;
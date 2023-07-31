import { fileReader, fileWriter } from '../helpers/DataSource.helper';
import { IProduct } from '../models/product.interface';

export class ProductService {
  createProduct(product: IProduct): IProduct {
    try {
      const newProduct: IProduct = {
        ...product,
      };
      const products: IProduct[] = fileReader('./src/mocks/products.json');
      products.push(newProduct);
      fileWriter('./src/mocks/products.json', products);
      return newProduct;
    } catch (err) {
      throw err;
    }
  }

  getAllProducts(): IProduct[] {
    return fileReader('./src/mocks/products.json');
  }

  getProductById(id: string): IProduct | undefined {
    const products: IProduct[] = fileReader('./src/mocks/products.json');
    return products.find((product) => product.id === id);
  }

  deleteProductById(id: string): IProduct {
    const products: IProduct[] = fileReader('./src/mocks/products.json');
    const product = products.filter((product, i) => product.id === id);
    const updatedProducts = products.filter((product, i) => product.id !== id);
    fileWriter('./src/mocks/products.json', updatedProducts);
    return product[0];
  }
}

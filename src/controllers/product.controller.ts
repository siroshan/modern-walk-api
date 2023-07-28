import { IApiResponse } from '../common/Response.interface';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product.interface';
import { v4 as uuidv4 } from 'uuid';

export default class ProductController {
  productService;

  constructor() {
    this.productService = new ProductService();
  }

  public createProduct(product: Omit<IProduct, 'id'>): IApiResponse<IProduct> {
    const newProduct = this.productService.createProduct({
      ...product,
      id: uuidv4(),
    });
    const response = {
      data: newProduct,
      status: 200,
      message: 'Request Successful',
    };
    return response;
  }

  public getAllProducts(): IApiResponse<IProduct[]> {
    const products = this.productService.getAllProducts();
    if (products.length === 0) {
      return {
        status: 404,
        message: 'No products found',
      };
    }

    return {
      data: products,
      status: 200,
      message: 'Request Successful',
    };
  }

  public getProductById(id: string): IApiResponse<IProduct> {
    const product = this.productService.getProductById(id);
    let response: IApiResponse<IProduct>;
    if (product) {
      response = {
        data: product,
        status: 200,
        message: 'Request Successfull',
      };
    } else {
      response = {
        status: 404,
        message: 'Not found',
      };
    }

    return response;
  }

  public deleteProductById(id: string): IApiResponse<IProduct> {
    const product = this.productService.getProductById(id);
    let response: IApiResponse<IProduct>;
    if (product) {
      this.productService.deleteProductById(id);
      response = {
        data: product,
        status: 200,
        message: 'Request Successfull',
      };
    } else {
      response = {
        status: 404,
        message: 'Not found',
      };
    }

    return response;
  }
}

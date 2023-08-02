import { Get, Route, Post, Path, Body, Delete } from 'tsoa';
import { IApiResponse } from '../common/Response.interface';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product.interface';
import { v4 as uuidv4 } from 'uuid';

@Route('/api/v1/products')
export default class ProductController {
  productService;

  constructor() {
    this.productService = new ProductService();
  }
  @Post('/')
  public createProduct(
    @Body() product: Omit<IProduct, 'id'>
  ): IApiResponse<IProduct> {
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

  @Get('/')
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

  @Get('{id}')
  public getProductById(@Path() id: string): IApiResponse<IProduct> {
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

  @Delete('{id}')
  public deleteProductById(@Path() id: string): IApiResponse<IProduct> {
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

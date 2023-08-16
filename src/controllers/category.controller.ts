import { Get, Route, Post, Path, Body, Delete } from 'tsoa';
import { IApiResponse } from '../common/response.interface';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../models/category.interface';
import { v4 as uuidv4 } from 'uuid';

@Route('/api/v1/categories')
export default class CategoryController {
  categoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  @Post('/')
  public createCategory(
    @Body() category: Omit<ICategory, 'id'>
  ): IApiResponse<ICategory> {
    const newCategory = this.categoryService.createCategory({
      ...category,
      id: uuidv4(),
    });
    const response = {
      data: newCategory,
      status: 200,
      message: 'Request Successful',
    };
    return response;
  }

  @Get('/')
  public getAllCategorys(): IApiResponse<ICategory[]> {
    const categorys = this.categoryService.getAllCategorys();
    if (categorys.length === 0) {
      return {
        status: 404,
        message: 'No categorys found',
      };
    }

    return {
      data: categorys,
      status: 200,
      message: 'Request Successful',
    };
  }

  @Get('{id}')
  public getCategoryById(@Path() id: string): IApiResponse<ICategory> {
    const category = this.categoryService.getCategoryById(id);
    let response: IApiResponse<ICategory>;
    if (category) {
      response = {
        data: category,
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
  public deleteCategoryById(@Path() id: string): IApiResponse<ICategory> {
    const category = this.categoryService.getCategoryById(id);
    let response: IApiResponse<ICategory>;
    if (category) {
      this.categoryService.deleteCategoryById(id);
      response = {
        data: category,
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

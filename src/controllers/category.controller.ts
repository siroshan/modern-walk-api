import { IApiResponse } from '../common/Response.interface';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../models/category.interface';
import { v4 as uuidv4 } from 'uuid';

export default class CategoryController {
  categoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public createCategory(
    category: Omit<ICategory, 'id'>
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

  public getCategoryById(id: string): IApiResponse<ICategory> {
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

  public deleteCategoryById(id: string): IApiResponse<ICategory> {
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

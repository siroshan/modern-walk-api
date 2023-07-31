import { fileReader, fileWriter } from '../helpers/DataSource.helper';
import { ICategory } from '../models/category.interface';

export class CategoryService {
  createCategory(category: ICategory): ICategory {
    try {
      const newCategory: ICategory = {
        ...category,
      };
      const categorys: ICategory[] = fileReader('./src/mocks/categorys.json');
      categorys.push(newCategory);
      fileWriter('./src/mocks/categorys.json', categorys);
      return newCategory;
    } catch (err) {
      throw err;
    }
  }

  getAllCategorys(): ICategory[] {
    return fileReader('./src/mocks/categorys.json');
  }

  getCategoryById(id: string): ICategory | undefined {
    const categorys: ICategory[] = fileReader('./src/mocks/categorys.json');
    return categorys.find((category) => category.id === id);
  }

  deleteCategoryById(id: string): ICategory {
    const categorys: ICategory[] = fileReader('./src/mocks/categorys.json');
    const category = categorys.filter((category, i) => category.id === id);
    const updatedCategorys = categorys.filter((category, i) => category.id !== id);
    fileWriter('./src/mocks/categorys.json', updatedCategorys);
    return category[0];
  }
}

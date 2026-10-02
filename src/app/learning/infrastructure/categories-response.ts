import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface CategoriesResponse extends BaseResponse {
  categories: CategoryResource[];
}

export interface CategoryResource extends BaseResource {
  id: number;
  name: string;

}

import {environment} from '../../environments/environment';

export class CommonEndPoints {
  private baseUrl = environment.base_url;

  public readonly news = this.baseUrl + 'api/news';
}

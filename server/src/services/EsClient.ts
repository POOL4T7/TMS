import { Client } from '@elastic/elasticsearch';
import { IndicesCreateResponse } from '@elastic/elasticsearch/lib/api/types';

class ElasticsearchService {
  private static instance: ElasticsearchService;
  private readonly es_client: Client;

  private constructor() {
    // Initialize Elasticsearch client
    this.es_client = new Client({
      node: process.env.ES_URL,
      auth: {
        username: process.env.ES_USERNAME!,
        password: process.env.ES_PASSWORD!,
      },
    });
    console.log('ElasticsearchService called: ');
  }

  public static getInstance(): ElasticsearchService {
    if (!ElasticsearchService.instance) {
      ElasticsearchService.instance = new ElasticsearchService();
    }
    return ElasticsearchService.instance;
  }

  public getClient(): Client | null {
    try {
      this.es_client
        .ping()
        .then(() => console.log('elastic search'))
        .catch((e) => console.log('error', e));

      return this.es_client;
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  }

  public addToES(index: string, id: string, body: any): void {
    try {
      this.es_client.index({
        index: index,
        id: id,
        body: body,
      });
      this.es_client.indices.refresh();
    } catch (e: any) {
      throw Error(`ES error while adding data of ${index} in es: ${e.message}`);
    }
  }

  public updateToES(index: string, id: string, body: any): void {
    try {
      this.es_client.update({
        index: index,
        id: id,
        body: body,
      });
      this.es_client.indices.refresh();
    } catch (e: any) {
      throw Error(
        `ES error while updating data of ${index} in es: ${e.message}`
      );
    }
  }

  public async createIndex(
    index: string,
    setting: any,
    mapping: any
  ): Promise<IndicesCreateResponse> {
    try {
      const res = await this.es_client.indices.create({
        index: index,
        body: {
          settings: setting,
          mappings: mapping,
        },
      });
      return res;
    } catch (e: any) {
      throw Error(
        `ES error while updating data of ${index} in es: ${e.message}`
      );
    }
  }
}

// Export singleton instance
export default ElasticsearchService.getInstance();
import { Client } from '@elastic/elasticsearch';

class ElasticsearchService {
  private static instance: ElasticsearchService;
  private readonly client: Client;

  private constructor() {
    // Initialize Elasticsearch client
    this.client = new Client({
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
      this.client
        .ping()
        .then(() => console.log('elastic search'))
        .catch((e) => console.log('error', e));

      return this.client;
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  }
}

// Export singleton instance
export const elasticsearchService = ElasticsearchService.getInstance();

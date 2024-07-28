import { Client } from '@elastic/elasticsearch';
import {
  BulkResponse,
  IndicesCreateResponse,
} from '@elastic/elasticsearch/lib/api/types';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

class ElasticsearchService {
  private static instance: ElasticsearchService;
  private readonly es_client: Client;

  private constructor() {
    // Initialize Elasticsearch client
    this.es_client = new Client({
      node: process.env.ES_URL || 'https://localhost:9200',
      auth: {
        username: process.env.ES_USERNAME! || 'elastic',
        password: process.env.ES_PASSWORD! || 'elastic-tms',
      },
      nodes: ['https://localhost:9200'],
      tls: {
        rejectUnauthorized: false,
      },
    });
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
        .then(() => console.log('elasticsearch connected'))
        .catch((e) => console.log('error', e));

      return this.es_client;
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  }

  public async addToES(index: string, id: string, body: any): Promise<void> {
    try {
      await this.es_client.index({
        index: index,
        id: id,
        body: body,
      });
      this.es_client.indices.refresh();
    } catch (e: any) {
      throw Error(`ES error while adding data of ${index} in es: ${e.message}`);
    }
  }
  public async bulkUpload(
    index: string,
    operations: any
  ): Promise<BulkResponse> {
    try {
      const bulkResponse = await this.es_client.bulk({
        refresh: true,
        operations,
      });
      if (bulkResponse.errors) {
        const erroredDocuments: {
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: any;
          error: any;
          operation: any;
          document: any;
        }[] = [];
        bulkResponse.items.forEach((action, i) => {
          type Operation = 'create' | 'index' | 'update' | 'delete';

          const validOperations: Operation[] = [
            'create',
            'index',
            'update',
            'delete',
          ];

          const operation: string = Object.keys(action)[0];
          console.log(operation, i);

          if (validOperations.includes(operation as Operation)) {
            const res = action[operation as Operation];

            if (res?.error) {
              erroredDocuments.push({
                status: res.status,
                error: res.error,
                operation: operations[i * 2],
                document: operations[i * 2 + 1],
              });
            }
          } else {
            console.error(`Invalid operation: ${operation}`);
          }
        });
        console.log(JSON.stringify(erroredDocuments, null, 2));
      }
      return bulkResponse;
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

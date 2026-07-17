import axios from 'axios';
import { logger } from '../utils/logger';

interface AirtimeService {
  provider: string;
  amount: number;
  phone: string;
}

export class VTUService {
  private baseURL = process.env.VTU_PROVIDER_BASE_URL || '';
  private apiKey = process.env.VTU_PROVIDER_API_KEY || '';

  async buyAirtime(data: AirtimeService) {
    try {
      const response = await axios.post(
        `${this.baseURL}/airtime/buy`,
        {
          network: data.provider,
          amount: data.amount,
          phone: data.phone,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      logger.error('Airtime purchase failed:', error);
      throw error;
    }
  }

  async buyData(network: string, plan: string, phone: string) {
    try {
      const response = await axios.post(
        `${this.baseURL}/data/buy`,
        {
          network,
          plan,
          phone,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      logger.error('Data purchase failed:', error);
      throw error;
    }
  }

  async payBill(billType: string, reference: string, amount: number) {
    try {
      const response = await axios.post(
        `${this.baseURL}/bills/pay`,
        {
          type: billType,
          reference,
          amount,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      logger.error('Bill payment failed:', error);
      throw error;
    }
  }
}

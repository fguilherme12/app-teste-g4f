import axios from 'axios';
import type { ViaCepResponse } from '@/types/cep';

export class CepService {
  private static readonly BASE_URL = 'https://viacep.com.br/ws';

  public static async searchCep(cep: string): Promise<ViaCepResponse | null> {
    try {
      const response = await axios.get<ViaCepResponse>(
        `${this.BASE_URL}/${cep}/json/`
      );

      if (response.data.erro) {
        return null;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('CEP inválido');
        }
        if (error.code === 'ERR_NETWORK') {
          throw new Error('Erro de conexão. Verifique sua internet.');
        }
        throw new Error('Erro ao buscar CEP. Tente novamente.');
      }
      throw new Error('Erro inesperado. Tente novamente.');
    }
  }
}


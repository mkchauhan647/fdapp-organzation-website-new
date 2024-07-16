import axios, { AxiosInstance } from "axios";

interface DataServiceOptions {
  token?: string;
}

// Config axios
const api: AxiosInstance = axios.create({
  baseURL:`${process.env.NEXT_PUBLIC_VOTING_API_URI}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 20000,
});

// Class containing REST methods
class DataService {
  constructor(private options: DataServiceOptions = {}) {
    if (options.token) {
      this.setToken(options.token);
    }
  }

  setToken(token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  setContentType(type : string){
    api.defaults.headers.common["Content-Type"] = type
  }

  setApiKey(apiKey: string) {
    api.defaults.headers.common["x-api-key"] = `Bearer ${apiKey}`;
  }

  clearToken() {
    delete api.defaults.headers.common["Authorization"];
  }

  clearApiKey() {
    delete api.defaults.headers.common["x-api-key"];
  }

  async getData(endpoint: string, token?: string) {
    try {
      if (token) {
        this.setToken(token);
      }
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postData(endpoint: string, data: any, token?: string) {
    try {
      if (token) {
        this.setToken(token);
      }
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async putData(endpoint: string, data: any, token?: string) {
    try {
      if (token) {
        this.setToken(token);
      }
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async patchData(endpoint: string, data: any, token?: string) {
    try {
      if (token) {
        this.setToken(token);
      }
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteData(endpoint: string, token?: string) {
    try {
      if (token) {
        this.setToken(token);
      }
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}


export const dataService = new DataService();
dataService.setContentType('application/json')
export default DataService;

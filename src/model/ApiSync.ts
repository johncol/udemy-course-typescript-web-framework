import axios, { AxiosResponse } from 'axios';

interface MayHaveId {
  id?: number;
}

export class ApiSync<T extends MayHaveId> {
  constructor(private url: string) {}

  fetch = (id: number): Promise<T> => {
    return axios.get(`${this.url}/${id}`).then(this.getPayload);
  };

  save = (data: T): Promise<T> => {
    const alreadyExists: boolean = !!data.id;

    if (alreadyExists) {
      return axios.put(`${this.url}/${data.id}`, data).then(this.getPayload);
    }

    return axios.post(`${this.url}`, data).then(this.getPayload);
  };

  private getPayload = (response: AxiosResponse<T>): T => {
    return response.data;
  };
}

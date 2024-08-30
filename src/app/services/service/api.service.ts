import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'https://jsonplaceholder.typicode.com/users/1'; // URL base de JSONPlaceholder

  constructor() { }

  // Método para hacer una solicitud GET
  async getData(endpoint: string = ''): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseURL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud GET', error);
      throw error;
    }
  }

  // Método para hacer una solicitud POST
  async postData(endpoint: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(`${this.baseURL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud POST', error);
      throw error;
    }
  }

  // Método para hacer una solicitud PUT
  async putData(endpoint: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse = await axios.put(`${this.baseURL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud PUT', error);
      throw error;
    }
  }

  // Método para hacer una solicitud DELETE
  async deleteData(endpoint: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.delete(`${this.baseURL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud DELETE', error);
      throw error;
    }
  }
}
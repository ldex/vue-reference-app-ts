import type { Product } from '@/types'

const baseURL = import.meta.env.VITE_API_SERVER_URL;
const resourceName = "products";

export default {
  getProducts(): Promise<Product[]> {
    const sortParams = `?$orderby=ModifiedDate%20desc`;
    const url = `${baseURL}/${resourceName}${sortParams}`;

    const options: RequestInit = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    return fetch(url, options)
            .then(response => response.json())
            .then(data => new Promise(resolve => setTimeout(() => resolve(data), 200)))
            .catch(error => {
                console.error('API Error while loading products, ' + error);
                return Promise.reject(error);
            })
  },

  getProduct(id: number): Promise<Product> {
    const url = `${baseURL}/${resourceName}/${id}`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error("API Error while loading product, " + error);
        return Promise.reject(error);
      });
  },

  insertProduct(product: Product): Promise<Product> {
    const url = `${baseURL}/${resourceName}`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("API Error while creating new product, " + error);
        return Promise.reject(error);
      });
  },

  deleteProduct(product: Product): Promise<void> {
    const url = `${baseURL}/${resourceName}/${product.id}`;
    const options: RequestInit = {
      method: "DELETE",
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("API Error while deleting product, " + error);
        return Promise.reject(error);
      });
  },
};
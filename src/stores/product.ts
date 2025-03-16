import { defineStore } from "pinia"
import ProductService from "@/services/ProductService"
import type { Product } from '@/types'

interface ProductState {
  errorMessage: string | null;
  isLoading: boolean;
  products: Product[];
  product: Product | Record<string, never>;
}

export const useProductStore = defineStore("product", {
  state: (): ProductState => ({
    errorMessage: null,
    isLoading: false,
    products: [],
    product: {}
  }),
  getters: {
    getProductById: (state) => (id: number): Product | undefined => {
      return state.products.find((product) => product.id === id);
    }
  },
  actions: {
    fetchProducts() {
      this.isLoading = true;
      ProductService.getProducts()
        .then((data) => {
          this.products = data;
        })
        .catch(error => {
            this.errorMessage = 'There was an error getting products from server, ' + error;
        })
        .finally(() => (this.isLoading = false))
    },
    addProduct(newProduct: Product) {
      return ProductService.insertProduct(newProduct).then(() => {
        this.products.push(newProduct)
      });
    },
    fetchProduct(id: number) {
      let p = this.getProductById(id);
      if (p == null) {
        this.isLoading = true;
        ProductService.getProduct(id).then((data) => {
          this.product = data;
        })
        .catch(error => {
            this.errorMessage = 'There was an error getting the product from server, ' + error;
        })
        .finally(() => (this.isLoading = false))
      } else {
        this.product = p;
      }
    },
    deleteProduct(product: Product) {
      return ProductService.deleteProduct(product).then(() => {
        this.products = this.products.filter((p) => p.id != product.id);
      });
    },
  },
});
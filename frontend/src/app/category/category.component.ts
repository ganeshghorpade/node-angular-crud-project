import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: any = [];
  categoryName: string = "";

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    axios.get("http://localhost:5000/api/categories")
      .then(res => {
        this.categories = res.data;
      })
      .catch(error => console.error("Error loading categories", error));
  }

  addCategory() {
    if (!this.categoryName.trim()) return;
    axios.post("http://localhost:5000/api/categories", { name: this.categoryName })
      .then(() => {
        this.categoryName = "";
        this.loadCategories();
      })
      .catch(error => console.error("Error adding category", error));
  }

  deleteCategory(id: number) {
    axios.delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => {
        this.loadCategories();
      })
      .catch(error => console.error("Error deleting category", error));
  }
}

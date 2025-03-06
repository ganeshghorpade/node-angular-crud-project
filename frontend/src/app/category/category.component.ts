import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  imports: [CommonModule, FormsModule]
})
export class CategoryComponent implements OnInit {
  categories: any = [];
  categoryName: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>("http://localhost:5000/api/categories")
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
        error: (error) => {
          console.error("Error loading categories", error);
        }
      });
  }

  addCategory() {
    if (!this.categoryName.trim()) return;
    this.http.post("http://localhost:5000/api/categories", { name: this.categoryName })
      
      .subscribe({
        next: () => {
          this.categoryName = "";
          this.loadCategories();
        },
        error: (error) => {
          console.error("Error adding category", error);
        }
      });
  }

  deleteCategory(id: number) {
    this.http.delete(`http://localhost:5000/api/categories/${id}`)
      .subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (error) => {
          console.error("Error deleting category", error);
        }
      });
  }
}

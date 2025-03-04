import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-addproduct',
  standalone: true, 
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  imports: [CommonModule, ReactiveFormsModule] 
})
export class AddproductComponent {
  productForm: FormGroup;
  categories: any[] = []; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.fetchCategories(); 
  }

  fetchCategories() {
    this.http.get<any[]>('http://localhost:5000/api/categories') 
      .subscribe(response => {
        this.categories = response; 
      }, error => {
        console.error('Error fetching categories:', error);
      });
  }


  onSubmit() {
    if (this.productForm.valid) {
      this.http.post('http://localhost:5000/api/products', this.productForm.value)
        .subscribe({
          next: (response) => {
            console.log('Product added successfully:', response);
            alert('Product added successfully');
            this.productForm.reset();
          },
          error: (err) => {
            console.error('Error adding product:', err);
            alert('Failed to add product');
          }
        });
    }
  }
}

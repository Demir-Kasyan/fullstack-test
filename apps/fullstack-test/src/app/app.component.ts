import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'demir-kasian-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private api: string = '';
  displayedColumns = ['id', 'firstName', 'lastName', 'dateOfBirth','gender','state','country','city','address','pincode','remove','update'];
  dataSource: MatTableDataSource<any>;
  user: any = {
    id: -1,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private httpClient: HttpClient) {
    const users: any[] = [];
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  submit(): void{
    if(this.user.id == -1){
      this.httpClient.post(this.api, this.user);
    }
    else{
      this.httpClient.put(this.api + '/' + this.user.id, this.user)
    }
    this.reset();
  }
  reset(): void{
    this.user = {
      id: -1,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      state: '',
      city: '',
      address: '',
      pincode: '',
    };
  }
  update(id: number): void{
    this.user = this.httpClient.get(this.api+'/'+id);
  }
  remove(id: number): void{
    this.httpClient.delete(this.api+'/'+id);
  }
}
import { Component, OnInit } from '@angular/core';
import { Driver } from './model/driver';
import { DriversService } from './services/drivers.service';
import { PaginationRequest } from '../../shared/pagination/model/pagination.request';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {


  constructor(
    private driversService: DriversService
  ) { }

  ngOnInit(): void {
    const paginationRequest: PaginationRequest = {
      page: 1,
      limit: 10
    };
    this.driversService.getAllPaginated<Driver>(
      paginationRequest
    ).subscribe(data => {
      console.log(data);
    });
  }


}

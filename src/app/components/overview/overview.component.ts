import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})

export class OverviewComponent implements OnInit {
  public token!: string;

  ngOnInit(): void {
    this.token = localStorage.getItem('x-token') ?? '';
  }
}


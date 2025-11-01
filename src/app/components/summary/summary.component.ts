import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  summary: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSummary().subscribe(data => {
      this.summary = data;
    });
  }
}

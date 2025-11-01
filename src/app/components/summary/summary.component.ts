import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-summary',
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

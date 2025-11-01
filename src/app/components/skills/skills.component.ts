import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }

  getLevelClass(level: string): string {
    const levelMap: { [key: string]: string } = {
      'Basic': 'basic',
      'Intermediate': 'intermediate',
      'Advanced': 'advanced'
    };
    return levelMap[level] || 'basic';
  }
}

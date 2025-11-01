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

  // Kategorisasi skills
  skillCategories = {
    frontend: ['Angular Framework', 'Bootstrap Framework', 'Tailwind Framework', 'JQuery AJAX'],
    backend: ['Golang', 'Yii2 Framework', 'Laravel Framework', 'PHP Native'],
    tools: ['Figma Graphic Design', 'SQL Database', 'Google Cloud Engine']
  };

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

  getSkillsByCategory(category: string): any[] {
    const categorySkills = this.skillCategories[category as keyof typeof this.skillCategories] || [];
    return this.skills.filter(skill => categorySkills.includes(skill.name));
  }
}

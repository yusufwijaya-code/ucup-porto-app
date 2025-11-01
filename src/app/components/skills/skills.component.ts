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

  getSkillCategories(): string[] {
    const categories = new Set(this.skills.map(skill => skill.category));
    return Array.from(categories);
  }

  getSkillsByCategory(category: string): any[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getCategoryDisplayName(category: string): string {
    const displayNames: { [key: string]: string } = {
      'frontend': 'Frontend Development',
      'backend': 'Backend Development',
      'tools': 'Tools & Others'
    };
    return displayNames[category] || category;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'frontend': '🎨',
      'backend': '⚙️',
      'tools': '🛠️'
    };
    return icons[category] || '💼';
  }

  getTotalSkills(): number {
    return this.skills.length;
  }

  getAdvancedSkillsCount(): number {
    return this.skills.filter(skill => skill.level === 'Advanced').length;
  }

  getCategoriesCount(): number {
    return this.getSkillCategories().length;
  }

  getToolsCount(): number {
    return this.skills.filter(skill => skill.category === 'tools').length;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  getTotalProjects(): number {
    return this.projects.length;
  }

  getTechnologiesCount(): number {
    const allTech = this.projects.flatMap(project => project.technologies);
    return new Set(allTech).size;
  }

  getClientsCount(): number {
    const clients = new Set(this.projects.map(project => project.client));
    return clients.size;
  }

  openProject(link: string): void {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }
}

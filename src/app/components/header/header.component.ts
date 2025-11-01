import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  personalInfo: any;
  photoError: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPersonalInfo().subscribe(data => {
      this.personalInfo = data;
    });
  }

  getProfilePhoto(): string {
    return !this.photoError && this.personalInfo?.photo
      ? this.personalInfo.photo
      : this.getDummyPhoto();
  }

  getDummyPhoto(): string {
    const name = this.personalInfo?.name || 'Yusuf Wijaya';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=280&bold=true`;
  }

  handleImageError(event: any): void {
    this.photoError = true;
    event.target.src = this.getDummyPhoto();
  }
}

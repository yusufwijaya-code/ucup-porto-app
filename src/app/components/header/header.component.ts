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
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=280&bold=true&length=2`;
  }

  handleImageError(event: any): void {
    console.log('Photo not found, using dummy photo');
    this.photoError = true;
    event.target.src = this.getDummyPhoto();
  }

  getContacts(): any[] {
    if (!this.personalInfo) return [];

    return [
      {
        icon: 'phone-icon',
        label: 'Phone',
        value: this.personalInfo.phone
      },
      {
        icon: 'email-icon',
        label: 'Email',
        value: this.personalInfo.email
      },
      {
        icon: 'website-icon',
        label: 'Website',
        value: this.personalInfo.website
      }
    ];
  }
}

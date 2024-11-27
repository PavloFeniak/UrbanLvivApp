import {Component, Input, OnInit} from '@angular/core';
import {MyReport} from '../../models/report.model';
import {ReportAdminModel} from '../../models/report.admin.model';
import {NgIf, NgStyle} from '@angular/common';
import {AdminService} from '../../services/admin.service';
import {IRouter} from 'express';
import {Router} from '@angular/router';

@Component({
    selector: 'app-report-summary',
  standalone: true,

  imports: [
        NgStyle,
        NgIf
    ],
    templateUrl: './report-summary.component.html',
    styleUrl: './report-summary.component.scss'
})
export class ReportSummaryComponent implements OnInit{
  constructor(private adminService: AdminService, private router: Router) {
  }
  @Input() report!: ReportAdminModel;

  isShow: boolean = false;
  isShowStatusMenu: boolean = false;
  isShowPriorityMenu: boolean = false;
  areButtonsEnabled: boolean = false;

  private tagTexts = [
    "Problem is not selected", "Roads", "Garbage", "Electricity", "Watter Supply",
    "Sewage", "Parks", "Street Lightning", "Noise", "Traffic", "Environment",
    "Public Transport", "Infrastructure", "Health", "Animal Control", "Fire Hazard",
    "Other", "Unknown"
  ];
  private statusTexts = [
    "New",            // The report has just been created and is awaiting further actions
    "InReview",       // The report is being reviewed by the authorities or AI
    "Approved",       // The report has been approved for action
    "InProgress",     // Actions to resolve the issue are in progress
    "Completed",      // The issue has been resolved
    "Rejected"
  ]
  getStringProblemType(id: number): string{
    return this.tagTexts[id];
  }
  getStringProblemStatus(id: number): string{
    return this.statusTexts[id];
  }
  changePriority(priority: string): void {
    this.report.priority = priority;  // Оновлюємо пріоритет у моделі звіту
    this.isShowPriorityMenu = false;  // Закриваємо меню після вибору
  }

  // Method to get button label based on priority
  getButtonLabel(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'високий': return 'High';
      case 'середній': return 'Medium';
      case 'низький': return 'Low';
      default: return 'Unknown';
    }
  }

  // Method to get button background color based on priority
  getButtonBackgroundColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'високий': return '#FCEAEE';
      case 'середній': return '#FEF4E8';
      case 'низький': return '#E6FAF8';
      default: return 'gray';
    }
  }

  // Method to get button text color based on priority
  getButtonTextColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'високий': return '#EB5C77';
      case 'низький': return '#39D6CC';
      case 'середній': return '#F6B566';
      default: return 'black';
    }
  }


  changeStatus(priority: number): void {
    this.report.processingStatus = priority;
    this.isShowStatusMenu = false;
  }
  getButtonStatusLabel(priority: number, report1: ReportAdminModel): string {
    switch (priority) {
      case 0: return 'New';
      case 1: return 'In Review';
      case 2: return 'Approved';
      case 3: return 'In Progress';
      case 4: return 'Completed';
      case 5: return 'Rejected';
      default: return 'Unknown';
    }
  }

  // Method to get button background color based on priority
  getButtonStatusBackgroundColor(priority: number): string {
    switch (priority) {
      case 0: return '#f1fcea';
      case 1: return '#FEF4E8';
      case 2: return '#E6FAF8';
      case 3: return '#f0eafc';
      case 4: return '#e8fee9';
      case 5: return '#FCEAEE';
      default: return 'gray';
    }
  }

  // Method to get button text color based on priority
  getButtonStatusTextColor(priority: number): string {
    switch (priority) {
      case 0: return '#90eb5c';
      case 1: return '#F6B566';
      case 2: return '#39D6CC';
      case 3: return '#9c5ceb';
      case 4: return '#39d653';
      case 5: return '#EB5C77';
      default: return 'black';
    }
  }

  showMenu(){
    this.isShow = !this.isShow;
  }
  showStatusMenu(){
    this.isShowStatusMenu = !this.isShowStatusMenu;
  }
  showPriorityMenu(){
    this.isShowPriorityMenu = !this.isShowPriorityMenu;
  }
  enableButtons(){
    this.areButtonsEnabled = true;
    this.isShow = false;
  }
  submitReportChanges(){
    this.adminService.updateReportByAdmin(this.report.id, this.report.processingStatus, this.report.priority);
    this.areButtonsEnabled = false;
    this.isShow = false;
  }
  openReportDetails(id: number) {
    this.router.navigate(['/report-details', id]);
  }
  ngOnInit(): void {
  }

}

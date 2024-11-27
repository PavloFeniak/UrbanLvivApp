import {Component, Input} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {MyReport} from '../../models/report.model';
import {NgIf, SlicePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-report-details',
  standalone: true,

  imports: [
        SlicePipe,
        NgIf
    ],
    templateUrl: './report-details.component.html',
    styleUrl: './report-details.component.scss'
})
export class ReportDetailsComponent {
  reportId!: number;
  report!: MyReport;


  previousButton!: string;
  previousSliderBtn!: string;
  slideIndex!: number;
  isShow: boolean =false;
  isShowInfo: boolean = false;
  isShowAIResponse: boolean = false

  private tagTexts = [
    "Problem is not selected", "Roads", "Garbage", "Electricity", "Watter Supply",
    "Sewage", "Parks", "Street Lightning", "Noise", "Traffic", "Environment",
    "Public Transport", "Infrastructure", "Health", "Animal Control", "Fire Hazard",
    "Other", "Unknown"
  ];

  constructor(private reportService: ReportService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.slideIndex = 1;
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.reportId = idParam ? Number(idParam) : 0;
      console.log('Received Report ID:', this.reportId);
    });
    this.loadReportDetails();
    this.showDivs(this.slideIndex);

  }

  loadReportDetails() {
    console.log(`Report ID: ${this.reportId}`);
    this.reportService.getReportById(this.reportId).subscribe((report: MyReport) => {
        this.report = report;
        this.reportService.compressImage(this.report.imageUrl, 200, 100, 0.1).then(compressed => {
          this.report.imageUrl = compressed;
        });
      }, (error) => {
        console.error('Error loading report details:', error);
      });
  }
  getStringProblemType(id: number): string{
    return this.tagTexts[id];
  }
  plusDivs(n: number) {
    const temp = this.slideIndex += n
    this.showDivs(temp);
  }

  showDivs(n: number) {
    let i: number;
    const x = document.getElementsByClassName("banner") as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex - 1].style.display = "block";
    const img = document.getElementById((this.slideIndex + 9).toString());
    const prev = document.getElementById(this.previousButton);

    const sliderBtn = document.getElementById((this.slideIndex + 12).toString())
    const prevBtn = document.getElementById(this.previousSliderBtn);
    if (img != null && img != prev && sliderBtn != null && sliderBtn != prevBtn) {
      img.style.border = "1px solid grey";
      sliderBtn.style.background = "#a4e2ca"
      if (prev != null && prevBtn != null) {
        prev.style.border = "none";
        prevBtn.style.background = "#e0e0e0"
      }
      this.previousButton = (this.slideIndex + 9).toString();
      this.previousSliderBtn = (this.slideIndex + 12).toString()
    }
  }

  showFullDescription(){
    this.isShow = !this.isShow
  }
  showFullInfo(){
    this.isShowInfo = !this.isShowInfo
  }
  showAIResponse(){
    this.isShowAIResponse = !this.isShowAIResponse
  }

}

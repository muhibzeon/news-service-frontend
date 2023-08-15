import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../shared/common.service';
import {CommonEndPoints} from '../shared/CommonEndPoints';
import {DialogService} from '../shared/_modal/dialog.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  news_id: any;
  news: any;

  constructor(private http: HttpClient,
              private modalService: NgbModal,
              private commonService: CommonService,
              private commonEndpoint: CommonEndPoints,
              private dialogService: DialogService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.news_id = localStorage.getItem('news_id');
    this.getNewsById(this.news_id);
  }

  getNewsById(id) {
    this.spinner.show();
    this.commonService.get(this.commonEndpoint.news, id).subscribe((response: any) => {
        this.news = response.data;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      error => {
        this.dialogService.open('Cannot Retrieve News. Try Again!', environment.error_message, 'danger', environment.error);
        this.spinner.hide();
      });
  }

}

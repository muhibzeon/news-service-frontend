import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../shared/common.service';
import {CommonEndPoints} from '../shared/CommonEndPoints';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgForm} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../shared/_modal/dialog.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-home-content.component.html',
  styleUrls: ['./manage-home-content.component.css']
})
export class ManageHomeContentComponent implements OnInit {
  @ViewChild('eventForm') eventForm: NgForm;
  @ViewChild('eventFormUpdate') eventFormUpdate: NgForm;
  closeResult = '';

  news: any = {};
  newsList: any;
  modalRef: NgbModalRef;
  role: any;

  constructor(private http: HttpClient,
              private modalService: NgbModal,
              private commonService: CommonService,
              private commonEndpoint: CommonEndPoints,
              private dialogService: DialogService,
              private spinner: NgxSpinnerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getNews();
    this.role = localStorage.getItem('user_role');
  }

  redirectToReadNewsPage(id) {
    localStorage.setItem('news_id', id);
    this.router.navigate(['/read-news']);
  }

  onSubmit(): void {
    this.spinner.show();

    const formData = new FormData();
    formData.append('title', this.news.name);
    formData.append('text', this.news.description);
    formData.append('validFrom', this.news.from);
    formData.append('validTo', this.news.to);
    formData.append('status', this.news.status);
    formData.append('picture', this.news.image);

    console.log(formData);

    this.commonService.post(this.commonEndpoint.news + '/create', formData).subscribe(response => {
      this.dialogService.open('News created successfully!', environment.info_message, 'success', environment.info);
      console.log(response);
      this.spinner.hide();
      this.news.name = '';
      this.news.description = '';
      this.news.from = '';
      this.news.to = '';
      this.news.status = '';
      this.news.image = '';

      this.modalRef.close();
      this.getNews();
    }, (error) => {
      this.spinner.hide();
      this.dialogService.open('News Creation Failed!', environment.error_message, 'danger', environment.error);
      console.log(error);
    });
  }

  onUpdate(): void {
    this.spinner.show();

    const formData = new FormData();
    formData.append('title', this.news.name);
    formData.append('text', this.news.description);
    formData.append('validFrom', this.news.from);
    formData.append('validTo', this.news.to);
    formData.append('status', this.news.status);
    if (this.news.image !== null) {
      formData.append('picture', this.news.image);
    }

    console.log(formData);

    this.commonService.put(formData, this.commonEndpoint.news + '/update', this.news.newsID).subscribe(response => {
      this.dialogService.open('News Updated successfully!', environment.info_message, 'success', environment.info);
      console.log(response);
      this.spinner.hide();
      this.news.name = '';
      this.news.description = '';
      this.news.from = '';
      this.news.to = '';
      this.news.status = '';
      this.news.image = '';

      this.modalRef.close();
      this.getNews();
    }, (error) => {
      this.spinner.hide();
      this.dialogService.open('News Update Failed!', environment.error_message, 'danger', environment.error);
      console.log(error);
    });
  }

  getNewsById(id) {
    this.spinner.show();
    this.commonService.get(this.commonEndpoint.news, id).subscribe((response: any) => {
        this.news.name = response.data.title;
        this.news.newsID = response.data.newsID;
        this.news.description = response.data.text;
        this.news.from = response.data.validFrom;
        this.news.to = response.data.validTo;
        this.news.status = response.data.published;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      error => {
        this.dialogService.open('Cannot Retrieve News. Try Again!', environment.error_message, 'danger', environment.error);
        this.spinner.hide();
      });
  }

  getNews() {
    this.spinner.show();
    this.commonService.get(this.commonEndpoint.news, '').subscribe((response: any) => {
        this.spinner.hide();
        this.newsList = response;
      },
      error => {
        this.dialogService.open('Cannot Retrieve News. Try Again!', environment.error_message, 'danger', environment.error);
        this.spinner.hide();
      });
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.news.image = file;
  }

  publish(newsID: any) {
    this.spinner.show();
    this.commonService.put('', this.commonEndpoint.news + '/publish', newsID).subscribe((response: any) => {
        this.spinner.hide();
        this.newsList = response;
        this.dialogService.open('Published Successfully!', environment.info, 'success', environment.info_message);
        this.getNews();
      },
      error => {
        this.dialogService.open('Cannot Publish News. Try Again!', environment.error_message, 'danger', environment.error);
        this.spinner.hide();
      });
  }

  delete(newsID: any) {
    this.spinner.show();
    this.commonService.delete(newsID, this.commonEndpoint.news + '/delete').subscribe((response: any) => {
        this.spinner.hide();
        this.newsList = response;
        this.dialogService.open('Deleted Successfully!', environment.info, 'success', environment.info_message);
        this.getNews();
      },
      error => {
        this.dialogService.open('Cannot Delete News. Try Again!', environment.error_message, 'danger', environment.error);
        this.spinner.hide();
      });
  }
}

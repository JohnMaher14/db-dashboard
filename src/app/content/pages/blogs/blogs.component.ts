import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Title } from "@angular/platform-browser";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {


  success: string = '';
  error: string = '';
  delete: string = '';
  blogs: any[] =[];
  modalRef!:BsModalRef;
  seeMore = false;
  ckeditorContent:any;
  ckeditorContentText:any;
  pageName: string ='Blogs';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  page!:number;
  modalEdit : any;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  serviceImage ='https://digitalbondmena.com/blogs/'
  constructor(
    private _HomeService:HomeService,
    private _BsModalService:BsModalService,
    private _Title:Title
  ) { }

  ngOnInit(): void {
    this.showBlogs()
    this._Title.setTitle(`Digital Bond | Blogs`)

  }
  openModal(template: any) {
    this.modalRef = this._BsModalService.show(template
      ,{
        class: 'modal-dialog-centered modal-xl'
      }
  )}
  createBlog:FormGroup = new FormGroup({
    en_title: new FormControl('', Validators.required),
    en_text: new FormControl('', Validators.required),
    ar_text: new FormControl('', Validators.required),
    ar_title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  })
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createBlog.patchValue({
      image: file
    })
    this.createBlog.get('image')?.updateValueAndValidity()
  }
  onDelete(id:number){
    if(confirm(`Are you sure to delete blog with id ${id}`)) {
      this.loadingAction= true
      this._HomeService.deleteBlog(id ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.loadingAction= false

          this.showBlogs();
        }
      }
      )
    }
  }
  onCreate(
  ){
    this.loadingAction = true;
    this._HomeService.createBlog(
      this.createBlog.value.en_title,
      this.createBlog.value.ar_title,
      this.createBlog.value.ar_text,
      this.createBlog.value.en_text,
      this.createBlog.value.image
    ).subscribe(
      (response) =>{
        console.log(response);
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showBlogs();
          this.modalRef.hide();
          this.loadingAction = false;

          this.createBlog.reset();
        }else{

          console.log(response);
        }
      }
    )
  }

  onEdit(
    idEdit:number , updateModal:any
  ){

    this.loadingAction = true;
    this.modalRef = this._BsModalService.show(updateModal
      ,{
        class: 'modal-dialog-centered modal-xl'
      })
    this._HomeService.getBlogs().subscribe(
      (response) => {
        console.log(response.rows);
        const filteredArray = response.rows.filter(
          (response:any) => {
            return response.id == idEdit
          }
        )
        this.modalEdit = filteredArray[0]
        console.log(filteredArray);
        this.loadingAction = false
      }
    )
  }
  onUpdate(id:number){
    this.loadingAction = true;
    this._HomeService.updateBlog(
      id,
      this.createBlog.value.en_title,
      this.createBlog.value.ar_title,
      this.createBlog.value.ar_text,
      this.createBlog.value.en_text,
      this.createBlog.value.image
    ).subscribe(
      (response) =>{
        console.log(response);
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showBlogs();
          this.modalRef.hide();
          this.loadingAction = false;

          this.createBlog.reset();
        }else{

          console.log(response);
        }
      }, error => {
        if(error.status == 422){
          this._HomeService.updateBlogNull(
            id,
            this.createBlog.value.en_title,
            this.createBlog.value.ar_title,
            this.createBlog.value.ar_text,
            this.createBlog.value.en_text,
          ).subscribe(
            (response) => {
              if(response.success){
                this.success = response.success
                this.error = ''
                this.delete = ''
                this.showBlogs();
                this.modalRef.hide();
                this.loadingAction = false;

                this.createBlog.reset();
              }
            }
          )
        }
      }
    )
  }
  showBlogs(){
    this.loading = true
    this._HomeService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.rows
        this.loading = false
      }
    )
  }

}

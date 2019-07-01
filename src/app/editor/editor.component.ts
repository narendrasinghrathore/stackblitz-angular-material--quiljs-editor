import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  text: string;

  showNote = true;

  editorForm: FormGroup;

  editorStyles = {
    height: '300px',
  };

  qlClassToReplaceWith = [
    { class: 'ql-align-right', style: 'text-align:right' }
  ];

  editorConfig: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      [{ font: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      // [{ Small: '14px', Normal: false, Large: '16px', Huge: '18px' }],
      ['clean']
    ],


  };

  styles = `<style>
  p{margin:10px auto;}
  .ql-size-small{
    font-size:12px;
  }
  .ql-size-large{
    font-size:24px;
  }
  .ql-size-huge{
    font-size:36px;
  }
  .ql-align-justify{
    text-align:justify;
  }
  .ql-align-center{
    text-align:center;
  }
  .ql-align-right{
    text-align:right;
  }
  </style>`;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      editor: []
    });
  }



  onSubmit() {
    this.showNote = true;
    let val: string = this.editorForm.get('editor').value;
    if (val) {
      val = val.replace(/<p><br><\/p>/gi, '<br/>');
    }

    val = this.styles + val;

    console.log(val);

    setTimeout(() => {

      this.showNote = false;

    }, 1200);
  }

  /**
   * Get editor form control value from reactive form model
   * and return html string to display on html
   */
  get parsedHtml() {
    const s: string = this.editorForm.get('editor').value;
    if (s) {
      return this.sanitizer.bypassSecurityTrustHtml(this.styles + s);
    }
    return '';
  }

}

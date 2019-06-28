import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Quill from 'quill';
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

  showNote: boolean = false;

  editorForm: FormGroup;

  editorStyles = {
    height: '300px',
  };

  qlClassToReplaceWith = [
    {class:'ql-align-right', style:'text-align:right'}
  ];

  editorConfig: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }],
      [{ 'font': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['clean']
    ]

  };

  foods: Food[] = [

    { value: 'small', viewValue: 'Small' },
    { value: 'large', viewValue: 'Large' },
    { value: 'huge', viewValue: 'Huge' }
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      'editor': []
    });

    var SizeStyle = Quill.import('attributors/style/size');
    Quill.register(SizeStyle, true);

    // this.editorConfig.toolbar = "#toolbar";

  }


  onSubmit() {
    this.showNote = true;
    let val: string = this.editorForm.get('editor').value;
    if (val) {
      val = val.replace(/<p><br><\/p>/g, '<br/>')
    }

    val = this.setCenter(val);
    console.log(val);

    setTimeout(() => {

      this.showNote = false;

    }, 1200);
  }

  setCenter(text: string) {
    return text.replace(/class="ql-align-center"/g, 'style="text-align: center;"')
  }


  onContent(e) {
    console.log(e)
  }

  get parsedHtml() {
    const s: string = this.editorForm.get('editor').value;
    if (s) {
      return s.replace(/<p><br><\/p>/g, '<br/>');
    }
    return '';

  }

}

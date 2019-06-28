import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditorComponent implements OnInit {
  text: string;

  showNote: boolean = false;

  editorForm: FormGroup;

  editorStyles = {
    height: '300px',
  };

  editorConfig: any= {
    // toolbar: [
    //   ['bold', 'italic', 'underline', 'strike'],
    //   ['blockquote', 'code-block'],
    //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //   [{ 'align': [] }],
    //   [{ 'font': [] }],
    //   [{ 'script': 'sub' }, { 'script': 'super' }],
    //   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //   [{ 'size': ['small', false, 'large', 'huge'] }],
    //   ['clean']
    // ]

  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      'editor': []
    });
    this.editorConfig.toolbar = '#toolbar';
  }


  onSubmit() {
    this.showNote = true;
    console.log(this.editorForm.get('editor').value);

    setTimeout(() => {

      this.showNote = false;

    }, 1200);
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

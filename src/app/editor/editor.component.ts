import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Quill from 'quill';
import { of, } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
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

  showNote = false;

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

  foods: Food[] = [

    { value: 'small', viewValue: 'Small' },
    { value: 'large', viewValue: 'Large' },
    { value: 'huge', viewValue: 'Huge' }
  ];
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      editor: []
    });

    // const SizeStyle = Quill.import('attributors/style/size');
    // SizeStyle.whitelist = Array.from({ length: 6 }, (v, index) => index).map(
    //   (v: any) => v + 2 + 'px'
    // );
    // Quill.register(SizeStyle, true);

    // this.editorConfig.toolbar = "#toolbar";

  }


  onSubmit() {
    this.showNote = true;
    let val: string = this.editorForm.get('editor').value;
    if (val) {
      val = val.replace(/<p><br><\/p>/g, '<br/>');
    }

    val = this.setCenter(val);
    console.log(val);

    setTimeout(() => {

      this.showNote = false;

    }, 1200);
  }

  styleTagPresent(s: string) {
    return s.search(/style/g);
  }

  /**
   * Check if class="ql-align-center" present in string
   * and add "text-align:center" to style attribute
   * @param text: string
   */
  setCenter(text: string) {
    return text.replace(/class="ql-align-center"/g, 'style="text-align: center;"');
  }

  /**
   * console if style is present or not in browser console.
   */

  isStylePresent() {

    console.log();
  }

  addFood() {
    this.foods.push({
      value: 'somevalue',
      viewValue: 'Food'
    });
  }


  onSizeChange(e) {
    console.log(e);
  }

  /**
   * Get editor form control value from reactive form model
   * and return html string to display on html
   */
  get parsedHtml() {
    const s: string = this.editorForm.get('editor').value;
    if (s) {
      return this.sanitizer.bypassSecurityTrustHtml(s.replace(/<p><br><\/p>/g, '<br/>')
        .replace(/class="ql-size-huge"/g, 'style="font-size:36px"'));
    }
    return '';
  }

}

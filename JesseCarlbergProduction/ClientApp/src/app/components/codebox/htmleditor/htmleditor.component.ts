import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import * as beautify from '../../../../../node_modules/js-beautify/js/lib/beautify';
import md from 'markdown-it';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonacoEditorConstructionOptions, MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-htmleditor',
  templateUrl: './htmleditor.component.html',
  styleUrls: ['./htmleditor.component.scss']
})
export class HtmleditorComponent implements OnInit, AfterViewInit {
  public theme = 'vs-dark';
  public themes = ['vs', 'vs-dark', 'hc-black'];
  public readOnlys = [true, false];
  public options: MonacoEditorConstructionOptions = { theme: 'vs-dark', readOnly: false };
  public htmlCode = '';
  public editorTypeSelection = 'HTML';
  private htmlbeautifier;
  public editorOptions: any = {
    language: 'html',
    roundedSelection: true,
    automaticLayout: true,
    autoIndent: true,
  };
  private txtQueryChanged: Subject<string> = new Subject<string>();
  public code = '';
  constructor(
    private fb: FormBuilder,
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    private monacoLoaderService: MonacoEditorLoaderService
  ) {

    this.txtQueryChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((model) => {
        this.code = model;
      });
  }

  ngOnInit(): void {
    this.htmlbeautifier = md();
  }

  ngAfterViewInit(): void {}

  clearCode() {
    this.code = '';
  }

  copyText(event) {
    this.clipboardService.copy(this.code);
  }

  editorInit(editor) {
    // monaco.editor.setTheme('vs');
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3,
    });

    editor.layout();
  }

  onChange(event) {
    this.txtQueryChanged.next(event);
  }

  monacoOnInit(editor) {
    const line = editor.getPosition();
    editor.layout();
  }

  openSnackBar(displayText, action) {
    this.snackBar.open(displayText, action, {
      duration: 1500,
    });
  }

  validate(event) {
    // let lineMatches;
    if (this.code) {
      try {
        // htmllint.parse(this.code);
        this.openSnackBar('Valid html', null);
        this.code = beautify.js_beautify(this.code, {
          indent_with_tabs: true,
        });
      } catch (e) {
        // retrieve line number from error string
        // lineMatches = e.message.match(/line ([0-9]*)/);
        this.openSnackBar('Invalid html', 'Error');
      }
    } else {
      this.openSnackBar('No html', 'Error');
    }
  }
}

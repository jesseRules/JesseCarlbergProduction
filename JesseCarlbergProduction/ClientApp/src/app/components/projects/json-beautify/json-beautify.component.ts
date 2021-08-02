import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import * as jsonlint from '../../../../../node_modules/jsonlint-mod';
import * as beautify from '../../../../../node_modules/js-beautify/js/lib/beautify';
import md from 'markdown-it';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-json-beautify',
  templateUrl: './json-beautify.component.html',
  styleUrls: ['./json-beautify.component.scss'],
})
export class JsonBeautifyComponent implements OnInit, AfterViewInit {
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    language: "json",
    automaticLayout: true,
    roundedSelection: true,
    autoIndent: "full"
  };
  public jsonCode = '';
  private jsonbeautifier;
  private txtQueryChanged: Subject<string> = new Subject<string>();
  public code = '';
  constructor(
    private fb: FormBuilder,
    private clipboardService: ClipboardService,
    private monacoLoaderService: MonacoEditorLoaderService,
    private snackBar: MatSnackBar
  ) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter((isLoaded) => isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs', // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: 'comment',
              foreground: 'ffa500',
              fontStyle: 'italic underline',
            },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' }, // will inherit fontStyle from `comment` above
          ],
          colors: {},
        });
      });

    this.txtQueryChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((model) => {
        this.code = model;
      });
  }

  ngOnInit(): void {
    this.jsonbeautifier = md();
  }

  ngAfterViewInit(): void {
  //  this.monacoComponent.editor.layout();
  }

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
        jsonlint.parse(this.code);
        this.openSnackBar('Valid JSON', null);
        this.code = beautify.js_beautify(this.code, {
          indent_with_tabs: true,
        });
      } catch (e) {
        // retrieve line number from error string
        // lineMatches = e.message.match(/line ([0-9]*)/);
        this.openSnackBar('Invalid JSON', 'Error');
      }
    } else {
      this.openSnackBar('No JSON', 'Error');
    }
  }
}

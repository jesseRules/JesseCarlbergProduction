import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  OnDestroy,
  AfterContentInit,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { BlogItem } from '../../services/models/blogFeed';
import { DatePipe } from '@angular/common';
import { BlogService } from 'src/app/services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import md from 'markdown-it';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class BlogEditorComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @ViewChild('blogeditor', { static: false }) editor: any;
  public theme = 'vs-dark';
  public themes = ['vs', 'vs-dark', 'hc-black'];
  public readOnlys = [true, false];
  public options: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    readOnly: false,
  };
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public screenHeight = 600;
  public screenWidth = 400;
  public loading = false;
  public cols: number;
  public rowheight = 600;
  public markdownCode;
  public editorOptions: any = {
    language: 'html',
    roundedSelection: true,
    automaticLayout: true,
    autoIndent: true,
    wordWrap: true,
  };
  public gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1,
  };
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public blogForm;
  public markdownTemplate = '';
  public blogItem: BlogItem = new BlogItem();
  public content = '';
  public contentAsString = '';
  public htmlCode = '';
  private markdown;
  public errors;
  private txtQueryChanged: Subject<string> = new Subject<string>();
  public code = '';
  public editorType = 'Markdown';
  public editorSelectionList = [{ name: 'Markdown' }, { name: 'Text' }];
  public tagList: string[] = [];
  public tags: Tag[] = [];
  // Subscription
  public blogSubscription: Subscription;
  public routeSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private blogService: BlogService,
    private breakpointObserver: BreakpointObserver,
    private monacoLoaderService: MonacoEditorLoaderService
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

    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      tags: [],
    });

    this.txtQueryChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((model) => {
        this.code = model;
        this.markdownCode = this.code.replace(/"/g, '\\"');
        this.content = this.markdown.render(this.code);
        if (this.content) {
          this.contentAsString = this.content.toString().replace(/"/g, '\\"');
        }

        this.htmlCode = this.content;
      });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
            this.rowheight = this.screenHeight;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.rowheight = this.screenHeight;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.rowheight = this.screenHeight;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
            this.rowheight = this.screenHeight;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
            this.rowheight = this.screenHeight;
          }
        }
      });
  }

  ngOnInit(): void {
    this.markdown = md();
    this.loading = true;
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      if (this.route.snapshot.params.id) {
        this.getItem(this.route.snapshot.params.id);
      } else {
        this.getTemplate();
      }
    });
  }

  getTemplate(): void {
    this.blogSubscription = this.blogService.getMarkdownTemplate().subscribe(
      (data) => {
        this.markdownTemplate = data;
        this.code = this.markdownTemplate;
        this.content = this.markdown.render(this.code);
        this.htmlCode = this.content;
        this.loading = false;
      },
      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {}
    );
  }

  ngAfterContentInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
    if (this.editor) {
      if (this.editor.editor) {
        this.editor.editor.dispose();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight - 300;
    this.screenWidth = window.innerWidth;
    if (this.editor) {
      if (this.editor.editor) {
        this.editor.editor.layout();
      }
    }
    this.rowheight = this.screenHeight;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editorSelection(item): void {
    this.editorType = item.name;
    if (item.name == 'Text') {
      // this.monacoComponent.editor.dispose();
    }
    if (item.name == 'Markdown') {
    }
  }

  getItem(id: string) {
    this.loading = true;
    this.blogSubscription = this.blogService.getBlogItem(id).subscribe(
      (data) => {
        this.blogItem = data;
        this.loading = false;
      },
      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {
        this.blogForm = this.fb.group({
          title: [this.blogItem.title, Validators.required],
          description: this.blogItem.description,
          tags: [],
        });

        this.tagList = [];
        this.blogItem.categories.forEach((t) => {});

        console.log(this.tagList);
      }
    );
  }

  editorInit(editor: any) {
    this.editor.editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3,
    });
  }

  onChange(event) {
    this.txtQueryChanged.next(event);
  }

  addBulletedList(): void {
    // This doesnt work yet
    const selected = this.editor.editor
      .getModel()
      .getValueInRange(this.editor.editor.getSelection());

    if (selected) {
      var updatedSelected = ' - ' + selected;
      if (selected.indexOf(' - ') >= 0) {
        updatedSelected = selected.replaceAll(' - ', '');
      }
      if (selected.indexOf('\n') > 0 && selected.indexOf(' - ') < 0) {
        const lines: string[] = selected.split('\n');
        updatedSelected = '';
        lines.forEach((l) => {
          if (l.indexOf('\n')) {
            updatedSelected += l;
          } else {
            updatedSelected += ' - ' + l;
          }
        });
      }

      this.editor.model.pushEditOperations(
        [],
        [
          {
            range: this.editor.editor.getSelection(),
            text: updatedSelected,
          },
        ]
      );
    } else {
      var result = ' - List item';
      var p = this.editor.editor.getPosition();
      this.editor.editor.executeEdits('', [
        {
          range: new monaco.Range(
            p.lineNumber,
            p.column,
            p.lineNumber,
            p.column
          ),
          text: result,
        },
      ]);
    }
  }

  formatBold(): void {
    const selected = this.editor.editor
      .getModel()
      .getValueInRange(this.editor.editor.getSelection());
    if (selected) {
      var updatedSelected = '**' + selected + '**';

      if (selected.indexOf('***') < 0 && selected.indexOf('**') >= 0) {
        updatedSelected = selected.replaceAll('**', '');
      } else if (selected.indexOf('***') >= 0) {
        updatedSelected = selected.replaceAll('***', '*');
      }
      this.editor.model.pushEditOperations(
        [],
        [
          {
            range: this.editor.editor.getSelection(),
            text: updatedSelected,
          },
        ]
      );
    } else {
      var result = '**strong text**';
      var p = this.editor.editor.getPosition();
      this.editor.editor.executeEdits('', [
        {
          range: new monaco.Range(
            p.lineNumber,
            p.column,
            p.lineNumber,
            p.column
          ),
          text: result,
        },
      ]);
    }
  }

  formatItalics(): void {
    const selected = this.editor.editor
      .getModel()
      .getValueInRange(this.editor.editor.getSelection());
    if (selected) {
      var updatedSelected = '*' + selected + '*';

      if (selected.indexOf('**') < 0 && selected.indexOf('*') >= 0) {
        updatedSelected = selected.replaceAll('*', '');
      } else if (selected.indexOf('***') >= 0) {
        updatedSelected = selected.replaceAll('***', '**');
      }
      this.editor.model.pushEditOperations(
        [],
        [
          {
            range: this.editor.editor.getSelection(),
            text: updatedSelected,
          },
        ]
      );
    } else {
      var result = '*emphasized text*';
      var p = this.editor.editor.getPosition();
      this.editor.editor.executeEdits('', [
        {
          range: new monaco.Range(
            p.lineNumber,
            p.column,
            p.lineNumber,
            p.column
          ),
          text: result,
        },
      ]);
    }
  }

  formatStrikethrough(): void {
    const selected = this.editor.editor
      .getModel()
      .getValueInRange(this.editor.editor.getSelection());
    if (selected) {
      var updatedSelected = '~~' + selected + '~~';

      if (selected.indexOf('~~') >= 0) {
        updatedSelected = selected.replaceAll('~~', '');
      }
      this.editor.model.pushEditOperations(
        [],
        [
          {
            range: this.editor.editor.getSelection(),
            text: updatedSelected,
          },
        ]
      );
    } else {
      var result = '~~strikethrough text~~';
      var p = this.editor.editor.getPosition();
      this.editor.editor.executeEdits('', [
        {
          range: new monaco.Range(
            p.lineNumber,
            p.column,
            p.lineNumber,
            p.column
          ),
          text: result,
        },
      ]);
    }
  }

  formatTitle(): void {
    const selected = this.editor.editor
      .getModel()
      .getValueInRange(this.editor.editor.getSelection());
    if (selected) {
      var updatedSelected = '## ' + selected;

      if (
        selected.indexOf('### ') < 0 &&
        selected.indexOf('## ') < 0 &&
        selected.indexOf('# ') >= 0
      ) {
        updatedSelected = selected.replaceAll('# ', '');
      } else if (selected.indexOf('### ') >= 0) {
        updatedSelected = selected.replaceAll('### ', '## ');
      } else if (selected.indexOf('## ') >= 0) {
        updatedSelected = selected.replaceAll('## ', '# ');
      }
      this.editor.model.pushEditOperations(
        [],
        [
          {
            range: this.editor.editor.getSelection(),
            text: updatedSelected,
          },
        ]
      );
    } else {
      var result = '## Heading';
      var p = this.editor.editor.getPosition();
      this.editor.editor.executeEdits('', [
        {
          range: new monaco.Range(
            p.lineNumber,
            p.column,
            p.lineNumber,
            p.column
          ),
          text: result,
        },
      ]);
    }
  }

  saveForm(): void {
    console.log(this.tags);
    let blogP: BlogItem = new BlogItem();
    blogP.content = this.content;
    blogP.content_html = this.htmlCode;
    blogP.title = this.blogForm.value.title;
    blogP.description = this.blogForm.value.description;
    blogP.content_markdown = this.code;
    let tagLis = new Array();
    this.tags.forEach((tag) => {
      tagLis.push(tag.name);
    });
    blogP.categories = tagLis;
    console.log(blogP);
    debugger;

    return;
    if (this.blogItem.Id) {
      this.blogService.updateBlogItem(this.blogItem).subscribe(
        (data) => {
          this.blogItem = data;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.loading = false;
        },
        () => {}
      );
    } else {
      this.blogService.createPost(this.blogItem).subscribe(
        (data) => {
          this.blogItem = data;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.loading = false;
        },
        () => {}
      );
    }
  }
}

import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  note;
  notes: any[] = [
    {
      id: 1,
      preview: 'this is the first',
      note: '<p>this is the first</p>',
    },
    {
      id: 2,
      preview: 'this is the second',
      note: '<p>this is the second</p>',
    },
    {
      id: 3,
      preview: 'this is the three',
      note: '<p>this is the three</p>',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  addNote() {
    let data = this.htmlStrip(this.note);
    this.notes.unshift({
      id: this.generateID(),
      preview: data.substring(0, 30),
      note: this.note,
    });
  }

  generateID() {
    return Math.floor(Math.random() * 1000);
  }

  htmlStrip(str) {
    str = str.replaceAll('</p>', '.\n');
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  selectNote(noteId) {
    let not = this.notes.filter((n) => n.id === noteId);
    this.note = not[0].note;
  }

  deleteNote(noteId) {
    this.notes = this.notes.filter((n) => n.id !== noteId);
  }
}

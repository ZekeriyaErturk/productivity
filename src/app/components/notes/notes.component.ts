import { AngularFireModule } from '@angular/fire';
import { Note } from './../../models/Note';
import { AuthService } from './../../services/auth.service';
import { NotService } from './../../services/not.service';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  noteIcerik: string;
  note;
  notes;
  user: any;
  constructor(public noteServis: NotService, public authServis: AuthService) {}

  ngOnInit(): void {
    this.authServis.GetUser().subscribe((res) => {
      this.user = { id: res?.uid || null, name: res?.displayName || null };
      if (this.user.id !== null) {
        this.noteServis.noteByUid(this.user.id).subscribe((res) => {
          this.notes = res;
        });
      } else {
        this.notes = [];
      }
    });
  }

  addNote() {
    const baslik = this.htmlStrip(this.noteIcerik).split('\n')[0];
    if (!this.note) {
      this.noteServis.addNote({
        notBaslik: baslik,
        notDate: new Date().toString(),
        notIcerik: this.noteIcerik,
        notUser: this.user.name,
        notUid: this.user.id,
      });
    } else {
      this.noteServis.updateNote({
        id: this.note.id,
        notBaslik: baslik,
        notDate: new Date().toString(),
        notIcerik: this.noteIcerik,
        notUser: this.user.name,
        notUid: this.user.id,
      });
    }

    this.note = null;
    this.noteIcerik = '';
  }

  htmlStrip(str) {
    str = str.replace(/(<(\/[^>]+)>)/gi, '\n');
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  selectNote(noteId) {
    this.note = this.notes.filter((n) => n.id === noteId)[0];
    this.noteIcerik = this.note.notIcerik;
  }

  deleteNote(note) {
    this.noteServis.deleteTodo(note);
  }
}

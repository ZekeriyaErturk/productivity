import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';

const modules = [
  MenubarModule,
  TabMenuModule,
  SkeletonModule,
  SidebarModule,
  ButtonModule,
  CardModule,
  EditorModule,
  FormsModule,
  DragDropModule,
  InputTextModule,
  InputTextareaModule,
  FullCalendarModule,
  ConfirmDialogModule,
  MessagesModule,
  ToastModule,
  DialogModule,
  ToolbarModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: [modules],
})
export class PrimengModule {}

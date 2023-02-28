import { NgModule } from "@angular/core";
import { DashboardLayoutComponent } from "@layouts/dashboard-layout/dashboard-layout.component";
import { MaterialModule } from "@modules/shared/material/material.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { NgxFileDragDropModule } from "ngx-file-drag-drop";
import { TextEditorComponent } from "@components/shared/text-editor/text-editor.component";
import { CommentCardComponent } from "@components/shared/comment-card/comment-card.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    NgxFileDragDropModule,
  ],
  declarations: [
    DashboardLayoutComponent,
    TextEditorComponent,
    CommentCardComponent,
  ],
  exports: [
    DashboardLayoutComponent,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    NgxFileDragDropModule,
    TextEditorComponent,
    CommentCardComponent,
  ],
})
export class DashboardModule {}

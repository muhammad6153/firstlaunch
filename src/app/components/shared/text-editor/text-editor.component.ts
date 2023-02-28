import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FileValidators } from "ngx-file-drag-drop";
import { Subscription } from "rxjs";

export type NewCommentEvent = {
  comment: { comment: string; attachments: File[] };
  finalize: () => void;
};

@Component({
  selector: "app-text-editor",
  templateUrl: "./text-editor.component.html",
  styleUrls: ["./text-editor.component.scss"],
})
export class TextEditorComponent {
  public dragDropAreaVisible: boolean;
  public newComment: string;
  public newCommentAttachments: File[];
  public loadingNewComment: boolean;
  public fileControl: FormControl;
  public fileControlSubscription: Subscription;

  @Output()
  public newCommentEvent = new EventEmitter<NewCommentEvent>();

  constructor() {
    this.dragDropAreaVisible = false;
    this.newComment = "";
    this.newCommentAttachments = [];
    this.loadingNewComment = false;
    this.fileControl = new FormControl(
      [],
      [
        FileValidators.uniqueFileNames,
        FileValidators.maxFileSize(10e6),
        FileValidators.maxFileCount(6),
        FileValidators.fileType(
          /application\/msword|application\/vnd\.ms-excel|application\/vnd\.ms-powerpoint|text\/plain|application\/pdf|image\/(.*)|video\/(.*)|audio\/(.*)/
        ),
      ]
    );
    this.fileControlSubscription = Subscription.EMPTY;
  }

  public addAttachments(): void {
    if (this.fileControl.valid) {
      this.newCommentAttachments = this.fileControl.value;
      this.dragDropAreaVisible = false;
    }
  }

  public removeAttachment(file: File): void {
    if (Array.isArray(this.fileControl.value)) {
      this.fileControl.value.splice(this.fileControl.value.indexOf(file), 1);
      this.fileControl.patchValue(this.fileControl.value);
    }
  }

  public addComment(): void {
    this.loadingNewComment = true;
    this.newCommentEvent.emit({
      comment: {
        comment: this.newComment,
        attachments: this.newCommentAttachments,
      },
      finalize: () => {
        this.newComment = "";
        this.fileControl.patchValue([]);
        this.loadingNewComment = false;
      },
    });
  }
}

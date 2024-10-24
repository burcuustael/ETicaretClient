import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DialogService } from '../dialog.service';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  constructor(
    private httpClient: HttpClientService,
    private alertify: AlertifyService,
    private customToastr: CustomToastrService,
    private dialogService: DialogService
  ) {}

  public files: NgxFileDropEntry[] = [];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    //
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,

      afterClosed: () => {
        this.httpClient
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              const message: string = 'Dosyalar basariyla yuklendi.';

              this.alertify.message(message, {
                dismisOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight,
              });
            },
            (errer: HttpErrorResponse) => {
              this.alertify.message('Yukleme basarisiz oldu', {
                dismisOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight,
              });
            }
          );
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}

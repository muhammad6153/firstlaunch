import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: null,
})
export class AdminUtilsService {
  private readonly document: Document;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.document = document;
  }

  private static convertToCSV<TData>(
    data: Array<TData>,
    headerList: Array<keyof TData>
  ): string {
    let str = headerList.join(",");
    str += "\n";
    data.forEach((item) => {
      headerList.map((header, idx) => {
        str += item[header];
        if (idx < headerList.length - 1) {
          str += ",";
        }
      });
      str += `${str}\n`;
    });
    return str;
  }

  public downloadFile<TData>(
    data: Array<TData>,
    headerList: Array<keyof TData>,
    filename: string
  ): void {
    const csvData = AdminUtilsService.convertToCSV(data, headerList);
    const blob = new Blob(["\ufeff" + csvData], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.csv`;
    downloadLink.style.display = "none";
    this.document.body.appendChild(downloadLink);
    downloadLink.click();
    this.document.body.removeChild(downloadLink);
  }
}

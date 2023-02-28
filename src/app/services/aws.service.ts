import { Injectable } from "@angular/core";
import { environment } from "@/environments/environment";
import * as S3 from "aws-sdk/clients/s3";
import type { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AwsService {
  private readonly bucket: S3;

  constructor() {
    this.bucket = new S3({
      accessKeyId: environment.awsAccessKeyId,
      secretAccessKey: environment.awsSecretAccessKey,
      region: environment.awsRegion,
    });
  }

  public uploadFile(file: File, key: string): Observable<string> {
    return new Observable((subscriber) => {
      const params = {
        Bucket: environment.awsBucket,
        Key: key,
        Body: file,
        ACL: "public-read",
        ContentType: file.type,
      };
      this.bucket.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
          subscriber.error(err);
        } else {
          subscriber.next(data.Key);
        }
        subscriber.complete();
      });
    });
  }
}

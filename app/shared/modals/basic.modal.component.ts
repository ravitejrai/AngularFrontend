import { Component } from '@angular/core';
import { DialogRef } from 'ngx-modialog';

@Component({
    selector: 'alertModal',
    template: `
        <div style="text-align:center">
            <div style="margin-bottom:20px">
                <br><p style="white-space: pre-line;">{{message}}</p><br>
            </div>
            <div style="bottom:20px;">
                <a class="black button" href="javascript:void(0)" (click)="cancel()">Close</a>
            </div>
        </div>`
})

export class AlertModal {
    modelData;
    message = "";

    constructor(public dialogRef: DialogRef<any>) {
      this.modelData = dialogRef.context;
      if(this.modelData) {
        if(this.modelData.message) {
          this.message = this.modelData.message;
        }
      }
    }

    cancel = () => {
        if (this.modelData.next) {
            this.modelData.next();
        }

        if (this.modelData.close) {
            this.modelData.close();
        }
        this.dialogRef.close();
    }
}

@Component({
    selector: 'confirmModal',
    template: `
        <div style="text-align:center">
            <div style="margin-bottom:40px">
                <br><p style="white-space: pre-line;">{{message}}</p><br>
                <p>Are you sure you want to continue?</p>
            </div>
            <div style="bottom:20px;">
                <a class="black button" href="javascript:void(0)" (click)="cancel()">Cancel</a>
                <a class="green button" href="javascript:void(0)" (click)="delete()">Continue</a>
            </div>
        </div>`
})

export class ConfirmModal {
    modelData;
    message = "Are you sure you want to continue?";

    constructor(public dialogRef: DialogRef<any>) {
      this.modelData = dialogRef.context;
      if(this.modelData) {
        if(this.modelData.message) {
          this.message = this.modelData.message;
        }
      }
    }

    delete = () => {
        if (this.modelData.next) {
            this.modelData.next();
        }
        this.dialogRef.close();
    }

    cancel = () => {
        if (this.modelData.cancel) {
            this.modelData.cancel();
        }
        this.dialogRef.close();
    }
}


@Component({
    selector: 'SearchModal',
    template: `
    <div class="main-content rich-card">
    <header>
      <h1 style="padding-top:5px;">Error Details</h1>
    </header>
    <div class="wrap debugger">
      <div style="min-height: 60px;">
        <a class="black button" href="javascript:void(0)" (click)="cancel()">BACK TO LIST</a>
      </div>
      <div class="row" style="min-height:100px;">
            <div class="filters">
                <p class="label">NAME</p>
                <input type="text" [(ngModel)]= "modelData.CustomerName" />
            </div>
             <div class="filters">
                <p class="label">Age</p>
                <input type="text" [(ngModel)]= "modelData.age" />
            </div>
             <div class="filters">
                <p class="label">Species</p>
                <input type="text" [(ngModel)]= "modelData.species" />
            </div>
      </div>
      <div class="errormsg">
        <p class="label">Error Message</p>
        <p class="msg1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s</p>
      </div>
      <div class="errormsg">
        <p class="label">Resolution/Fix</p>
        <p class="msg1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s</p>
      </div>
    </div><!-- ./wrap -->
  </div>`
})


export class SearchModal {
    modelData;
    message = "";

    constructor(public dialogRef: DialogRef<any>) {
      this.modelData = dialogRef.context;
      if(this.modelData) {
        if(this.modelData.message) {
          this.message = this.modelData.message;
        }
      }
    }

    cancel = () => {

        if (this.modelData.close) {
            this.modelData.close();
        }
        this.dialogRef.close();
    }
}

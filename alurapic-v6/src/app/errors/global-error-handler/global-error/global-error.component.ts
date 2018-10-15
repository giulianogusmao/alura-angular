import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: './global-error.component.html'
})
export class GlobalErrorComponent implements OnInit {

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}

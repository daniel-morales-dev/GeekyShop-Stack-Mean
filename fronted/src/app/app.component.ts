import { Component } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Subject } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public static updateUserStatus: Subject<boolean> = new Subject();
  user: any;
  constructor(public authService: AuthService) {
    AppComponent.updateUserStatus.subscribe(res => {
      this.user = this.authService.getUser();
    })
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }
}

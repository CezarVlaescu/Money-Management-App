import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonComponent } from "../../shared/components/button-component/button-component.component";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    imports: [SharedModule, ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class LoginPageComponent {

}

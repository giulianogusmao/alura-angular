import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module'; // importa o módulo que será carregado primeiro

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
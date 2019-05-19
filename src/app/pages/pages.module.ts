import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsOneComponent } from './graphics-one/graphics-one.component';
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';


// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/graficoDona/GraficoDonaComponent';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphicsOneComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraphicsOneComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {}

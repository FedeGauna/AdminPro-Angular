import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsOneComponent } from './graphics-one/graphics-one.component';
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { NgChartsModule } from 'ng2-charts';

// Temporal
import { NumericUpDownComponent } from '../components/numericUpDown/numericUpDown.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { DoughnutChartComponent } from '../components/doughnutChart/doughnutChart.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphicsOneComponent,
        NumericUpDownComponent,
        DoughnutChartComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent
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
        NgChartsModule,
        CommonModule
    ]
})

export class PagesModule {}

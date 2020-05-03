import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestTrackByComponent } from './trick/test-track-by/test-track-by.component';
import {HttpClientModule} from '@angular/common/http';
import { RxjsTutorialComponent } from './rxjs-tutorial/rxjs-tutorial.component';
import { CreateOperatorsComponent } from './rxjs-tutorial/create-operators/create-operators.component';
import { FilteringOperatorsComponent } from './rxjs-tutorial/filtering-operators/filtering-operators.component';
import { TransformationOperatorsComponent } from './rxjs-tutorial/transformation-operators/transformation-operators.component';
import { CompbinationOperatorsComponent } from './rxjs-tutorial/compbination-operators/compbination-operators.component';
import {ScssTutorialComponent} from '@app/scss-tutorial/scss-tutorial.component';
import { UtilityOperatorsComponent } from './rxjs-tutorial/utility-operators/utility-operators.component';
import { SubjectComponent } from './rxjs-tutorial/subject/subject.component';

@NgModule({
  declarations: [
    AppComponent,
    TestTrackByComponent,
    ScssTutorialComponent,
    RxjsTutorialComponent,
    CreateOperatorsComponent,
    FilteringOperatorsComponent,
    TransformationOperatorsComponent,
    CompbinationOperatorsComponent,
    UtilityOperatorsComponent,
    SubjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

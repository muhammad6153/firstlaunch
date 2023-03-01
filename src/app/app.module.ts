import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "@/app/app-routing.module";
import { MaterialModule } from "@modules/shared/material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { ServicesPageComponent } from "@pages/landing/services-page/services-page.component";
import { PricingPageComponent } from "@pages/landing/pricing-page/pricing-page.component";
import { PortfolioPageComponent } from "@pages/landing/portfolio-page/portfolio-page.component";
import { AboutPageComponent } from "@pages/landing/about-page/about-page.component";
import { HomePageComponent } from "@pages/landing/home-page/home-page.component";
import { ContactPageComponent } from "@pages/landing/contact-page/contact-page.component";
import { PrivacyPageComponent } from "@pages/landing/privacy-page/privacy-page.component";
import { TermsPageComponent } from "@pages/landing/terms-page/terms-page.component";
import { ServicePageComponent } from "@pages/landing/service-page/service-page.component";
import { PageNotFoundComponent } from "@pages/page-not-found/page-not-found.component";
import { ServiceOrderPageComponent } from "@pages/landing/service-order-page/service-order-page.component";
import { AppComponent } from "@/app/app.component";
import { LandingLayoutComponent } from "@layouts/landing-layout/landing-layout.component";
import { NavbarComponent } from "@components/shared/navbar/navbar.component";
import { FooterComponent } from "@components/shared/footer/footer.component";
import { TalentTrackCardsComponent } from "@components/landing/talent-track-cards/talent-track-cards.component";
import { ServicesService } from "@/app/services/services.service";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { RefundPolicyPageComponent } from "@pages/landing/refund-policy-page/refund-policy-page.component";
import { CoordinatorsFormPageComponent } from "@pages/landing/coordinators-form-page/coordinators-form-page.component";
import { PartnershipFormPageComponent } from "@pages/landing/partnership-form-page/partnership-form-page.component";
import { CollaboratorsFormPageComponent } from "@pages/landing/collaborators-form-page/collaborators-form-page.component";
import { TeamPageComponent } from "@pages/landing/team-page/team-page.component";
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from "ngx-google-analytics";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { ServicesCardComponent } from './components/landing/services-card/services-card.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ServicesPageComponent,
    PricingPageComponent,
    PortfolioPageComponent,
    AboutPageComponent,
    HomePageComponent,
    ContactPageComponent,
    PageNotFoundComponent,
    LandingLayoutComponent,
    PrivacyPageComponent,
    TermsPageComponent,
    TalentTrackCardsComponent,
    ServicePageComponent,
    ServiceOrderPageComponent,
    RefundPolicyPageComponent,
    CoordinatorsFormPageComponent,
    PartnershipFormPageComponent,
    CollaboratorsFormPageComponent,
    TeamPageComponent,
    ServicesCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxGoogleAnalyticsModule.forRoot("G-TZTQJRKXG5"),
    NgxGoogleAnalyticsRouterModule.forRoot({ exclude: [/^\/admin\/.*/] }),
    SlickCarouselModule,
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}

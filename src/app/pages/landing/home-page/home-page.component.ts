import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  LangChangeEvent,
  TranslateService as NgxTranslateService,
} from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly translateService: NgxTranslateService;
  private langSubscription: Subscription;

  public team = [
    {
      name: "TEAM_SECTION.NAMES.ABDULLAH_ALNASHRI",
      title: "TEAM_SECTION.TITLES.COMPOSER",
      img: "assets/images/team/Abdullah%20Alnashri/1.png",
    },
    {
      name: "TEAM_SECTION.NAMES.ADEL_ZAKI",
      title: "TEAM_SECTION.TITLES.DIRECTOR",
      img: "assets/images/team/Adel%20Zaki/2.png",
    },
    {
      name: "TEAM_SECTION.NAMES.AHMAD_QANDIL",
      title: "TEAM_SECTION.TITLES.ASSISTANT_DIRECTOR",
      img: "assets/images/team/Ahmad%20Qandil/3.png",
    },
    {
      name: "TEAM_SECTION.NAMES.ELAF_SAAB",
      title: "TEAM_SECTION.TITLES.PHOTOGRAPHER_VIDEO",
      img: "assets/images/team/Elaf%20Saab/5.png",
    },
    {
      name: "TEAM_SECTION.NAMES.FATMAH_ALAMOUDI",
      title: "TEAM_SECTION.TITLES.MAKE_UP_ARTIST",
      img: "assets/images/team/Fatmah%20Alamoudi/6.png",
    },
    {
      name: "TEAM_SECTION.NAMES.HASSAN_BASRAWI",
      title: "TEAM_SECTION.TITLES.MODEL",
      img: "assets/images/team/Hassan%20Basrawi/7.png",
    },
    {
      name: "TEAM_SECTION.NAMES.HAYFA_HUSSAIN",
      title: "TEAM_SECTION.TITLES.PHOTOGRAPHER_VIDEO",
      img: "assets/images/team/Hayfa%20Hussain/8.png",
    },
    {
      name: "TEAM_SECTION.NAMES.MAJED_ALDOSSARI",
      title: "TEAM_SECTION.TITLES.MUSICIAN",
      img: "assets/images/team/Majed%20Aldossari/10.png",
    },
    {
      name: "TEAM_SECTION.NAMES.MARAM",
      title: "TEAM_SECTION.TITLES.MODEL",
      img: "assets/images/team/Maram/11.png",
    },
    {
      name: "TEAM_SECTION.NAMES.MARWAN_ALSHEHRI",
      title: "TEAM_SECTION.TITLES.SINGER",
      img: "assets/images/team/Marwan%20Alshehri/13.png",
    },
    {
      name: "TEAM_SECTION.NAMES.NESREEN",
      title: "TEAM_SECTION.TITLES.MAKE_UP_ARTIST",
      img: "assets/images/team/Nesreen/14.png",
    },
    {
      name: "TEAM_SECTION.NAMES.OSAMA_BUGIS",
      title: "TEAM_SECTION.TITLES.SINGER",
      img: "assets/images/team/Osama%20Bugis/15.png",
    },
    {
      name: "TEAM_SECTION.NAMES.RAFAL_QASSEM",
      title: "TEAM_SECTION.TITLES.PHOTOGRAPHER",
      img: "assets/images/team/Rafal%20Qassem/16.png",
    },
    {
      name: "TEAM_SECTION.NAMES.RAWAN_ABDULLAH",
      title: "TEAM_SECTION.TITLES.MODEL",
      img: "assets/images/team/Rawan%20Abdullah/17.png",
    },
    {
      name: "TEAM_SECTION.NAMES.RAWAN_HUSSAIN",
      title: "TEAM_SECTION.TITLES.PHOTOGRAPHER_VIDEO",
      img: "assets/images/team/Rawan%20Hussain/18.png",
    },
    {
      name: "TEAM_SECTION.NAMES.SALEH_KASHOGJI",
      title: "TEAM_SECTION.TITLES.MUSICIAN_GUITARIST",
      img: "assets/images/team/Saleh%20Kashogji/19.png",
    },
    {
      name: "TEAM_SECTION.NAMES.SHAHAD_BAJAAFAR",
      title: "TEAM_SECTION.TITLES.MUSICIAN_PIANIST",
      img: "assets/images/team/Shahad%20Bajaafar/20.png",
    },
    {
      name: "TEAM_SECTION.NAMES.TURKAN_ALAYOUBI",
      title: "TEAM_SECTION.TITLES.ACTOR_DANCE_INSTRUCTOR",
      img: "assets/images/team/Turkan%20Alayoubi/21.png",
    },
  ];

  public videos = [
    {
      thumb: "assets/videos/first-launch-video-for-customers.png",
      src: "assets/videos/first-launch-video-for-customers.mp4",
    },
    {
      thumb: "assets/videos/first-launch-video-for-collaborators.png",
      src: "assets/videos/first-launch-video-for-collaborators.mp4",
    },
  ];

  public bannervideos = [
    // {
    //   src: "assets/videos/banner/banner-4.mp4",
    //   title_prefix: "HOME_PAGE.HEADING_SECTION.TITLE_PREFIX",
    //   title: "HOME_PAGE.HEADING_SECTION.TITLE",
    //   title_suffix: "HOME_PAGE.HEADING_SECTION.TITLE_SUFFIX",
    //   cta: "HOME_PAGE.HEADING_SECTION.CALL_TO_ACTION_LINK",
    //   link: "/services",
    // },
    {
      src: "assets/videos/banner/banner-1.mp4",
      title_prefix: "HOME_PAGE.HEADING_SECTION.TITLE_PREFIX",
      title: "HOME_PAGE.HEADING_SECTION.TITLE",
      title_suffix: "HOME_PAGE.HEADING_SECTION.TITLE_SUFFIX",
      cta: "HOME_PAGE.HEADING_SECTION.CALL_TO_ACTION_LINK",
      link: "/services",
    },
    {
      src: "assets/videos/banner/banner-2.mp4",
      title_prefix: "HOME_PAGE.HEADING_SECTION.TITLE_PREFIX",
      title: "HOME_PAGE.HEADING_SECTION.TITLE",
      title_suffix: "HOME_PAGE.HEADING_SECTION.TITLE_SUFFIX",
      cta: "HOME_PAGE.HEADING_SECTION.CALL_TO_ACTION_LINK",
      link: "/services",
    },
    {
      src: "assets/videos/banner/banner-3.mp4",
      title_prefix: "HOME_PAGE.HEADING_SECTION.TITLE_PREFIX",
      title: "HOME_PAGE.HEADING_SECTION.TITLE",
      title_suffix: "HOME_PAGE.HEADING_SECTION.TITLE_SUFFIX",
      cta: "HOME_PAGE.HEADING_SECTION.CALL_TO_ACTION_LINK",
      link: "/services",
    },
  ];


  public rtl = false;

  public _slideConfig = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(
    @Inject(DOCUMENT) document: Document,
    public dialog: MatDialog,
    translateService: NgxTranslateService
  ) {
    document.title = "First Launch";
    this.translateService = translateService;
    this.langSubscription = Subscription.EMPTY;
  }

  public get videoSlideConfig() {
    return {
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      rtl: this.rtl
    };
  }

  public get slideConfig() {
    return { ...this._slideConfig, rtl: this.rtl };
  }

  public ngOnInit(): void {
    this.langSubscription = this.translateService.onLangChange.subscribe(
      ({ lang }: LangChangeEvent) => {
        this.rtl = lang === "ar";
      }
    );
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }

  public openDialog({ src }: { src: string }): void {
    this.dialog.open(DialogElementsExampleDialog, { data: src });
  }
}

@Component({
  selector: "dialog-elements-example-dialog",
  template: `
    <video class="d-block w-100 h-100" controls autoplay>
      <source [src]="src" type="video/mp4" />
    </video>
  `,
})
export class DialogElementsExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public src: string) {}
}

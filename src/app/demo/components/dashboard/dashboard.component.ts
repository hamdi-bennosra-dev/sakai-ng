import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BrandService } from '../../service/brand.service';
import { Brand } from 'src/app/layout/models/brand';
import { StorageService } from '../../service/storage.service';
import { VideoService } from 'src/app/layout/service/data.service';
import { VideoMetadata } from 'src/app/layout/models/video-metadata';
import { PhotoService } from '../../service/photo.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    brands: Brand[] = [];
    videos: VideoMetadata[] = [];

    img: any[] | undefined;

    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.img && 0 <= newValue && newValue <= this.img.length - 1) {
            this._activeIndex = newValue;
        }
    }

    _activeIndex: number = 2;

    constructor(private productService: ProductService,
                public layoutService: LayoutService,
                private brandService: BrandService,
                private storageService: StorageService,
                private videoService: VideoService,
                private photoService: PhotoService

    ) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.loadBrands();
        this.loadAllVideos();
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    next() {
        this.activeIndex++;
    }

    prev() {
        this.activeIndex--;
    }

    loadBrands(): void {
        this.brandService.getAllBrands().subscribe((data) => {
            this.brands = data;
            this.brands.forEach((b: Brand) => {
                this.storageService.downloadFile('brands', b.id).subscribe({
                    next: (blob: Blob) => {
                        const url = window.URL.createObjectURL(blob);
                        b.img = url; // Set the image URL to display
                    },
                    error: () => (b.img = null),
                });
            });
        });
    }

    loadAllVideos(): void {
        this.videoService.getAllVideos().subscribe({
          next: (data) => {
            this.videos = data;
      
            // Pour chaque vidéo, charger l'aperçu sous forme d'image Blob
            this.videos.forEach(video => {
              this.videoService.getPreviewImage(video.id).subscribe({
                next: (blob) => {
                  video.previewUrl = URL.createObjectURL(blob); // Convertir le Blob en URL d'image
                },
                error: (err) => {
                  console.error(`Error loading preview for video ${video.id}:`, err);
                }
              });
            });
          },
          error: (err) => {
            console.error('Error loading videos:', err);
          }
        });
      }
      
    
      // Méthode pour générer l'URL de prévisualisation à partir de l'ID vidéo
      getPreviewUrl(id: number): string {
        return `http://localhost:8080/v1/video/preview/${id}`;
      }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

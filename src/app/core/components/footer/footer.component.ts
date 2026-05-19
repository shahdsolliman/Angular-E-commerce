import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  route: string;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly sections: FooterSection[] = [
    {
      heading: 'Collection',
      links: [
        { label: 'Bestsellers',    route: '/products?sort=popular'    },
        { label: 'All Artifacts',  route: '/products'                 },
        { label: 'Recently Added', route: '/products?sort=newest'     },
        { label: 'Limited Drops',  route: '/products'                 },
      ],
    },
    {
      heading: 'Help',
      links: [
        { label: 'FAQ',             route: '/faq'            },
        { label: 'Shipping Policy', route: '/shipping'       },
        { label: 'Returns',         route: '/returns'        },
        { label: 'Contact Us',      route: '/contact'        },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About SnapShop', route: '/about'      },
        { label: 'Careers',       route: '/careers'    },
        { label: 'Press',         route: '/press'      },
        { label: 'Sustainability',route: '/sustainability' },
      ],
    },
  ];
}

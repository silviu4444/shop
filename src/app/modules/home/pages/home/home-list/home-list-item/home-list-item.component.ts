import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HomeService } from '../../home.service';
import { Laptop } from '../../models/laptop.model';
import { MobilePhone } from '../../models/phone.model';

@Component({
  selector: 'app-home-list-item',
  templateUrl: './home-list-item.component.html',
  styleUrls: ['./home-list-item.component.scss']
})
export class HomeItemComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input() item: MobilePhone | Laptop;
  title: Observable<string> = this.homeService.itemTitle.pipe(take(1));

  ngOnInit() {
    this.homeService.getTitle(this.item);
  }

  showDetails() {
    this.router.navigate(['item/'], {
      relativeTo: this.route,
      queryParams: { id: this.item.id }
    });
  }
}

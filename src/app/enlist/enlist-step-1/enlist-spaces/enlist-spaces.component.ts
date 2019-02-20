import { Component, OnInit } from '@angular/core';
import { Space } from './space.model';
import { AmenitiesService } from '../enlist-amenities/amenities.service';

@Component({
  selector: 'app-enlist-spaces',
  templateUrl: './enlist-spaces.component.html',
  styleUrls: ['./enlist-spaces.component.scss']
})
export class EnlistSpacesComponent implements OnInit {
  private _spaces: Space[];

  constructor(private amenitiesService: AmenitiesService) { }

  ngOnInit() {
      this._spaces = this.amenitiesService.spaces;
  }

  get spaces(): Space[] {
	  return this._spaces;
  }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RegistryService} from '../../services/registry.service';
import 'rxjs/add/operator/mergeMap';
import * as moment from 'moment';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {

  repo: string;
  name: string;
  tag: string;

  size = 0;
  data: any;
  histories: any[];

  constructor(private route: ActivatedRoute,
              private registry: RegistryService) {
  }

  get lastPushed() {
    if (this.data) {
      return moment(this.data.created).fromNow();
    }
    return '';
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.repo = params['repo'];
        this.name = params['name'];
        this.tag = params['tag'];

        this.registry.getTag(this.repo, this.name, this.tag)
          .subscribe(res => {
            this.histories = res.history;
            this.data = this.histories[0];

            for (let i = 0; i < res.fsLayers.length; i++) {
              this.loadSize(i, res.fsLayers[i]);
            }
          });
      });
  }

  private loadSize(index: number, layer: any) {
    this.registry.getTagSize(this.repo, this.name, layer.blobSum).subscribe(size => {
      this.histories[index].size = size;
      this.size += size;
    });
  }
}

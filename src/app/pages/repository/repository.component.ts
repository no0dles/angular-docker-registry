import {Component, OnInit} from '@angular/core';
import {RegistryService} from '../../services/registry.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  repo: string;
  name: string;

  loading = true;
  tags: string[];

  constructor(private route: ActivatedRoute,
              private registry: RegistryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.repo = params['repo'];
      this.name = params['name'];
      this.loadTags();
    });
  }

  loadTags() {
    this.registry.getTags(this.repo, this.name).subscribe(tags => {
      this.tags = tags;
      this.loading = false;
    });
  }

  delete(event: MouseEvent, tag: string) {
    event.stopPropagation();
    this.registry.deleteTag(this.repo, this.name, tag).subscribe(() => {
      this.loadTags();
    });
  }
}

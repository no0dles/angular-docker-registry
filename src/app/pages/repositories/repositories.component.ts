import {Component, OnInit} from '@angular/core';
import {RegistryService} from '../../services/registry.service';
import {Observable} from 'rxjs/Observable';
import {RepositoryModel} from '../../models/repository.model';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  loading = true;
  repos: RepositoryModel[];

  constructor(private registry: RegistryService) {
  }

  ngOnInit() {
    this.registry.getRepositories().subscribe(repos => {
      this.repos = repos;
      this.loading = false;
    });
  }
}

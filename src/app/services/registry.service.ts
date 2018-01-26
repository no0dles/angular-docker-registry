import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RepositoryModel} from '../models/repository.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from './auth.service';
import 'rxjs/add/observable/of';

@Injectable()
export class RegistryService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }


  login(registry: string, username: string, password: string) {
    const options = {
      headers: {
        'Authorization': this.auth.getBasicAuthBearer({ username, password }),
      },
    };
    return this.http.get<any>(`${registry}/v2/`, options)
      .map(res => {
        return true;
      })
      .catch(() => {
        return Observable.of(false);
      });
  }

  getRepositories(): Observable<RepositoryModel[]> {
    const options = {
      headers: {
        'Authorization': this.auth.getBasicAuthBearer(),
      },
    };
    return this.http.get<any>(`${this.auth.registryUrl}/v2/_catalog`, options)
      .map(res => res.repositories.map(repo => {
        const parts = repo.split('/');
        return {repo: parts[0], name: parts[1]};
      }));
  }

  getTags(repo: string, name: string): Observable<string[]> {
    const options = {
      headers: {
        'Authorization': this.auth.getBasicAuthBearer(),
      },
    };
    return this.http.get<any>(`${this.auth.registryUrl}/v2/${repo}/${name}/tags/list`, options)
      .map(res => {
        return res.tags || [];
      });
  }

  getTag(repo: string, name: string, tag: string) {
    const options = {
      headers: {
        'Authorization': this.auth.getBasicAuthBearer(),
      },
    };
    return this.http.get<any>(`${this.auth.registryUrl}/v2/${repo}/${name}/manifests/${tag}`, options)
      .map(res => {
        res.history = res.history.map(history => JSON.parse(history.v1Compatibility));
        return res;
      });
  }

  getTagDigest(repo: string, name: string, tag: string) {
    const options = {
      observe: 'response' as 'response',
      responseType: 'json' as 'json',
      headers: {
        'Accept': 'application/vnd.docker.distribution.manifest.v2+json',
        'Authorization': this.auth.getBasicAuthBearer(),
      },
    };
    return this.http.head(`${this.auth.registryUrl}/v2/${repo}/${name}/manifests/${tag}`, options)
      .map(res => res.headers.get('Docker-Content-Digest'));
  }

  getTagSize(repo: string, name: string, digest: string) {
    const options = {
      observe: 'response' as 'response',
      headers: {
        'Authorization': this.auth.getBasicAuthBearer(),
      },
    };
    return this.http.head<any>(`${this.auth.registryUrl}/v2/${repo}/${name}/blobs/${digest}`, options)
      .map(res => {
        return parseInt(res.headers.get('Content-Length'), 0);
      });
  }

  deleteTag(repo: string, name: string, tag: string) {
    const options: any = {
      observe: 'response' as 'response',
      headers: {
        'Authorization': this.auth.getBasicAuthBearer(),
      },
    };
    return this.getTagDigest(repo, name, tag)
      .mergeMap(digest => {
        return this.http.delete(`${this.auth.registryUrl}/v2/${repo}/${name}/manifests/${digest}`, options);
      });
  }
}

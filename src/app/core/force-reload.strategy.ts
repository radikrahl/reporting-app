import { Injectable } from "@angular/core";
import { DetachedRouteHandle, ActivatedRouteSnapshot } from "@angular/router";
import {
  NSRouteReuseStrategy,
  NSLocationStrategy,
} from "@nativescript/angular";

@Injectable()
export class ForceReloadRouteReuseStrategy extends NSRouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  constructor(location: NSLocationStrategy) {
    super(location);
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    let shouldDetach = super.shouldDetach(route);

    if (shouldDetach && route.data.noReuse) {
      shouldDetach = true;
    }

    return shouldDetach;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    let shouldAttach = super.shouldAttach(route);
    return shouldAttach;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    let shouldReuse = super.shouldReuseRoute(future, curr);

    if (shouldReuse && curr.data.noReuse) {
      shouldReuse = false;
    }
    return shouldReuse;
  }
}

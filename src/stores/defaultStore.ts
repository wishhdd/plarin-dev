import { observable, makeObservable } from 'mobx';

class DefaultStore {
  link: string = 'https://docs.google.com/document/d/14_55LI1XVgVLXfKQLc6Ihd8URR019B8IeFmSvApWjPQ/edit?usp=sharing';

  constructor() {
    makeObservable<this>(this, {
      link: observable,
    });
  }
}

export default new DefaultStore();

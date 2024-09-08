
export class BaseComponent {
  protected page;
  protected parent;
  
  constructor(page, parent=page.locator('body')) {
    this.page = page;
    this.parent = parent;
  }

}

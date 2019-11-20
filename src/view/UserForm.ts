export class UserForm {
  constructor(private parent: Element) {}

  template = (): string => {
    return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Save</button>
      </div>
    `;
  };

  render = (): void => {
    const template: HTMLTemplateElement = document.createElement('template');
    template.innerHTML = this.template();
    this.parent.append(template.content);
  };
}

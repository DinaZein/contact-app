import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent {

  @Input() contact!: Contact;
  @Output() delete = new EventEmitter<number>();
@Output() edit = new EventEmitter<Contact>();
  onDelete() {
    this.delete.emit(this.contact.id);
  }
  onEdit() {
  this.edit.emit(this.contact);
}
}
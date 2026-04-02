import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { MatDialog } from '@angular/material/dialog';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    standalone: false
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  newContact: Contact = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };

  searchTerm: string = '';

  constructor(  private contactService: ContactService,
  private dialog: MatDialog) {}

  ngOnInit() {
    this.loadContacts();
  }

loadContacts() {
  this.contacts = [...this.contactService.getContacts()];
  this.filteredContacts = this.contacts;
}

  addContact() {
    this.contactService.addContact(this.newContact);
    this.newContact = { id: 0, name: '', email: '', phone: '' };
    this.loadContacts();
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id);
    this.loadContacts();
  }

  // search() {
  //   if (!this.searchTerm) {
  //     this.filteredContacts = this.contacts;
  //   } else {
  //     this.filteredContacts = this.contactService.searchContact(this.searchTerm);
  //   }
  // }
  editContact(contact: Contact) {
  const dialogRef = this.dialog.open(EditContactDialogComponent, {
    width: '400px',
    data: { ...contact }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.contactService.updateContact(result);
      this.loadContacts();
    }
  });
}

}
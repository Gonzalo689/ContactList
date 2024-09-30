import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../Service/contact.service';
import { RouterModule } from '@angular/router';
import { Contact } from '../model/contact.interface';

@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export  class ContactlistComponent implements OnInit {
    
  private contactService = inject(ContactService);
  contacts: Contact[] = [];
  

  ngOnInit(): void {
    this.contactService.findAll().subscribe(data => {
       this.contacts = data;
       console.log(data);
    });
  }

  delete(id: number) {
    this.contactService.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }
    

}

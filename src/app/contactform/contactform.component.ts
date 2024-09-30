import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../Service/contact.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../model/contact.interface';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.css'
})
export  class ContactformComponent implements OnInit {
    
    private fb = inject(FormBuilder)
    private contactService = inject(ContactService)
    private router = inject(Router)
    private route = inject(ActivatedRoute)

    form?: FormGroup;
    contact?: Contact;
    

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
      if (id) {
        this.contactService.findByID(Number(id)).subscribe(contact => {
          console.log(contact);
          this.contact = contact

          this.form = this.fb.group({
            name: [contact.name, [Validators.required, Validators.minLength(3)]],
            email: [contact.email, [Validators.required,Validators.email]]
          })
        })
      }else{
        this.form = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required,Validators.email] ]
        })
      }
    }

   

    save() {
      // Verificar si el formulario es válido
      if (this.form?.invalid) { 
        this.form.markAllAsTouched();
        return;
      }
        const contactForm = this.form!.value;
        if (this.contact) {
            this.contactService.update(this.contact.id, contactForm).subscribe(() => {
            this.router.navigate(['/']);
          });
        }else{
            this.contactService.create(contactForm).subscribe(() => {
            this.router.navigate(['/']);
          });
        }
        
       
    }
  
    // Método para verificar si un campo es inválido
    

    

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotRoutingModule } from './chatbot-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotComponent } from './chatbot.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChatbotComponent],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ChatbotModule { }

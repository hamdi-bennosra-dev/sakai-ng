import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/layout/service/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  question: string = '';
  chatHistory: { question: string, response: string }[] = [];

  constructor(private chatbotService: ChatbotService) { }

  askQuestion() {
    const response = this.chatbotService.getResponse(this.question);
    this.chatHistory.push({ question: this.question, response });
    this.question = '';
  }
}

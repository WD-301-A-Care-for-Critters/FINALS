// faq.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  questions: string[] = [];
  questionReplies: { [key: string]: string } = {};
  newQuestion: string = '';
  questionReply: string = '';

  submitQuestion(): void {
    if (this.newQuestion.trim() !== '') {
      this.questions.push(this.newQuestion);
      this.newQuestion = ''; // Clear the input field after submission
    }
  }

  submitReply(question: string): void {
    if (this.questionReply.trim() !== '') {
      this.questionReplies[question] = this.questionReply;
      this.questionReply = ''; // Clear the reply textarea after submission
    }
  }

 
}

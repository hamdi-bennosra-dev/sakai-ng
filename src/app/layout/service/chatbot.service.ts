import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private fakeData: { question: string, response: string }[] = [
    { question: 'Bonjour', response: 'Bonjour, bienvenue au Bessyessa' },
    { question: 'Hello', response: 'Bonjour, bienvenue au Bessyessa' },
    { question: 'comment allez vous', response: 'Merci, bien et vous ?' },
    { question: 'pouvez vous m aidez', response: 'Oui, comment je peux vous aider ?' },
    { question: 'Comment puis-je réserver un studio?', response: 'Vous pouvez réserver un studio en vous connectant à votre compte, puis en sélectionnant l"onglet "Réservation". Choisissez la date et le créneau horaire souhaités, puis validez la réservation.' },
    { question: 'Quels types de matériel multimédia proposez-vous à la location ?', response: 'Nous proposons une large gamme de matériel multimédia, incluant des caméras, des microphones, des éclairages, et bien plus encore. Vous pouvez consulter la liste complète dans la section "Matériel à louer" de notre plateforme.' },
    { question: 'Comment puis-je annuler ma réservation ?', response: ' Pour annuler une réservation, allez dans "Mon compte", puis dans "Mes réservations". Sélectionnez la réservation que vous souhaitez annuler et cliquez sur "Annuler"' },
    { question: ' Est-ce que je peux changer l"heure de ma réservation après l"avoir faite ', response: '  Oui, vous pouvez modifier l"heure de votre réservation tant qu"elle est effectuée au moins 24 heures à l"avance. Rendez-vous dans "Mes réservations", sélectionnez celle que vous souhaitez modifier, et choisissez un nouveau créneau."' },
    { question: 'Quels sont vos tarifs pour la location de studios ?', response: ' Nos tarifs varient en fonction du type de studio et de la durée de location. Vous pouvez consulter nos tarifs dans la section "Tarifs" de notre site.' },
    { question: 'Puis-je regarder mes vidéos en streaming sur votre plateforme ?', response: ' Oui, notre plateforme prend en charge le streaming vidéo. Une fois votre vidéo téléchargée, vous pouvez la visionner directement dans la section "Mes vidéos" de votre compte' },
    { question: 'Comment puis-je télécharger une vidéo sur la plateforme ?', response: ' Pour télécharger une vidéo, connectez-vous à votre compte, allez dans "Mon espace", puis cliquez sur "Télécharger une vidéo". Sélectionnez votre fichier et suivez les instructions à l"écran' },
    { question: 'Comment puis-je contacter le service client si j"ai un problème ?', response: ' Vous pouvez contacter notre service client via l"onglet "Contactez-nous" sur notre site, ou en envoyant un email à support@notre-plateforme.com.' }

  ];

  constructor() { }

  getResponse(question: string): string {
    const found = this.fakeData.find(item => item.question.toLowerCase() === question.toLowerCase());
    return found ? found.response : 'Sorry, I don\'t know the answer to that question.';
  }
}
